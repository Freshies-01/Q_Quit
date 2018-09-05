package com.lorence.myapp.web.rest;

import com.lorence.myapp.QQuitApp;

import com.lorence.myapp.domain.Action;
import com.lorence.myapp.domain.FunctionReps;
import com.lorence.myapp.repository.ActionRepository;
import com.lorence.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.lorence.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.lorence.myapp.domain.enumeration.ActionStatus;
/**
 * Test class for the ActionResource REST controller.
 *
 * @see ActionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = QQuitApp.class)
public class ActionResourceIntTest {

    private static final Boolean DEFAULT_IS_COMPLETED = false;
    private static final Boolean UPDATED_IS_COMPLETED = true;

    private static final String DEFAULT_TASK = "AAAAAAAAAA";
    private static final String UPDATED_TASK = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_COMPLETED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_COMPLETED = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_NUM_DISPUTES = 1;
    private static final Integer UPDATED_NUM_DISPUTES = 2;

    private static final ActionStatus DEFAULT_ACTION_STATUS = ActionStatus.DISPUTED;
    private static final ActionStatus UPDATED_ACTION_STATUS = ActionStatus.EDITED;

    @Autowired
    private ActionRepository actionRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restActionMockMvc;

    private Action action;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ActionResource actionResource = new ActionResource(actionRepository);
        this.restActionMockMvc = MockMvcBuilders.standaloneSetup(actionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Action createEntity(EntityManager em) {
        Action action = new Action()
            .isCompleted(DEFAULT_IS_COMPLETED)
            .task(DEFAULT_TASK)
            .dateCompleted(DEFAULT_DATE_COMPLETED)
            .numDisputes(DEFAULT_NUM_DISPUTES)
            .actionStatus(DEFAULT_ACTION_STATUS);
        // Add required entity
        FunctionReps functionReps = FunctionRepsResourceIntTest.createEntity(em);
        em.persist(functionReps);
        em.flush();
        action.setFunctionReps(functionReps);
        return action;
    }

    @Before
    public void initTest() {
        action = createEntity(em);
    }

    @Test
    @Transactional
    public void createAction() throws Exception {
        int databaseSizeBeforeCreate = actionRepository.findAll().size();

        // Create the Action
        restActionMockMvc.perform(post("/api/actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(action)))
            .andExpect(status().isCreated());

        // Validate the Action in the database
        List<Action> actionList = actionRepository.findAll();
        assertThat(actionList).hasSize(databaseSizeBeforeCreate + 1);
        Action testAction = actionList.get(actionList.size() - 1);
        assertThat(testAction.isIsCompleted()).isEqualTo(DEFAULT_IS_COMPLETED);
        assertThat(testAction.getTask()).isEqualTo(DEFAULT_TASK);
        assertThat(testAction.getDateCompleted()).isEqualTo(DEFAULT_DATE_COMPLETED);
        assertThat(testAction.getNumDisputes()).isEqualTo(DEFAULT_NUM_DISPUTES);
        assertThat(testAction.getActionStatus()).isEqualTo(DEFAULT_ACTION_STATUS);
    }

    @Test
    @Transactional
    public void createActionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = actionRepository.findAll().size();

        // Create the Action with an existing ID
        action.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restActionMockMvc.perform(post("/api/actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(action)))
            .andExpect(status().isBadRequest());

        // Validate the Action in the database
        List<Action> actionList = actionRepository.findAll();
        assertThat(actionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllActions() throws Exception {
        // Initialize the database
        actionRepository.saveAndFlush(action);

        // Get all the actionList
        restActionMockMvc.perform(get("/api/actions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(action.getId().intValue())))
            .andExpect(jsonPath("$.[*].isCompleted").value(hasItem(DEFAULT_IS_COMPLETED.booleanValue())))
            .andExpect(jsonPath("$.[*].task").value(hasItem(DEFAULT_TASK.toString())))
            .andExpect(jsonPath("$.[*].dateCompleted").value(hasItem(DEFAULT_DATE_COMPLETED.toString())))
            .andExpect(jsonPath("$.[*].numDisputes").value(hasItem(DEFAULT_NUM_DISPUTES)))
            .andExpect(jsonPath("$.[*].actionStatus").value(hasItem(DEFAULT_ACTION_STATUS.toString())));
    }
    

    @Test
    @Transactional
    public void getAction() throws Exception {
        // Initialize the database
        actionRepository.saveAndFlush(action);

        // Get the action
        restActionMockMvc.perform(get("/api/actions/{id}", action.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(action.getId().intValue()))
            .andExpect(jsonPath("$.isCompleted").value(DEFAULT_IS_COMPLETED.booleanValue()))
            .andExpect(jsonPath("$.task").value(DEFAULT_TASK.toString()))
            .andExpect(jsonPath("$.dateCompleted").value(DEFAULT_DATE_COMPLETED.toString()))
            .andExpect(jsonPath("$.numDisputes").value(DEFAULT_NUM_DISPUTES))
            .andExpect(jsonPath("$.actionStatus").value(DEFAULT_ACTION_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAction() throws Exception {
        // Get the action
        restActionMockMvc.perform(get("/api/actions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAction() throws Exception {
        // Initialize the database
        actionRepository.saveAndFlush(action);

        int databaseSizeBeforeUpdate = actionRepository.findAll().size();

        // Update the action
        Action updatedAction = actionRepository.findById(action.getId()).get();
        // Disconnect from session so that the updates on updatedAction are not directly saved in db
        em.detach(updatedAction);
        updatedAction
            .isCompleted(UPDATED_IS_COMPLETED)
            .task(UPDATED_TASK)
            .dateCompleted(UPDATED_DATE_COMPLETED)
            .numDisputes(UPDATED_NUM_DISPUTES)
            .actionStatus(UPDATED_ACTION_STATUS);

        restActionMockMvc.perform(put("/api/actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAction)))
            .andExpect(status().isOk());

        // Validate the Action in the database
        List<Action> actionList = actionRepository.findAll();
        assertThat(actionList).hasSize(databaseSizeBeforeUpdate);
        Action testAction = actionList.get(actionList.size() - 1);
        assertThat(testAction.isIsCompleted()).isEqualTo(UPDATED_IS_COMPLETED);
        assertThat(testAction.getTask()).isEqualTo(UPDATED_TASK);
        assertThat(testAction.getDateCompleted()).isEqualTo(UPDATED_DATE_COMPLETED);
        assertThat(testAction.getNumDisputes()).isEqualTo(UPDATED_NUM_DISPUTES);
        assertThat(testAction.getActionStatus()).isEqualTo(UPDATED_ACTION_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingAction() throws Exception {
        int databaseSizeBeforeUpdate = actionRepository.findAll().size();

        // Create the Action

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restActionMockMvc.perform(put("/api/actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(action)))
            .andExpect(status().isBadRequest());

        // Validate the Action in the database
        List<Action> actionList = actionRepository.findAll();
        assertThat(actionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAction() throws Exception {
        // Initialize the database
        actionRepository.saveAndFlush(action);

        int databaseSizeBeforeDelete = actionRepository.findAll().size();

        // Get the action
        restActionMockMvc.perform(delete("/api/actions/{id}", action.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Action> actionList = actionRepository.findAll();
        assertThat(actionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Action.class);
        Action action1 = new Action();
        action1.setId(1L);
        Action action2 = new Action();
        action2.setId(action1.getId());
        assertThat(action1).isEqualTo(action2);
        action2.setId(2L);
        assertThat(action1).isNotEqualTo(action2);
        action1.setId(null);
        assertThat(action1).isNotEqualTo(action2);
    }
}
