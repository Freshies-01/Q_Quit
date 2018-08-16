package com.lorence.myapp.web.rest;

import com.lorence.myapp.QQuitApp;

import com.lorence.myapp.domain.SeparationApplicationLog;
import com.lorence.myapp.domain.Employee;
import com.lorence.myapp.domain.HrReps;
import com.lorence.myapp.domain.FunctionReps;
import com.lorence.myapp.domain.Employee;
import com.lorence.myapp.domain.SeparationApplication;
import com.lorence.myapp.repository.SeparationApplicationLogRepository;
import com.lorence.myapp.service.SeparationApplicationLogService;
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

import com.lorence.myapp.domain.enumeration.Status;
import com.lorence.myapp.domain.enumeration.EditType;
/**
 * Test class for the SeparationApplicationLogResource REST controller.
 *
 * @see SeparationApplicationLogResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = QQuitApp.class)
public class SeparationApplicationLogResourceIntTest {

    private static final Status DEFAULT_STATUS = Status.COMPLETED;
    private static final Status UPDATED_STATUS = Status.PENDING;

    private static final LocalDate DEFAULT_DATE_APPROVED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_APPROVED = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_SUBMITTED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_SUBMITTED = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_COMPLETED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_COMPLETED = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_OF_LEAVE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_LEAVE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_ACTION_ADDED = false;
    private static final Boolean UPDATED_ACTION_ADDED = true;

    private static final LocalDate DEFAULT_DATE_EDITED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_EDITED = LocalDate.now(ZoneId.systemDefault());

    private static final EditType DEFAULT_EDIT_TYPE = EditType.CREATE;
    private static final EditType UPDATED_EDIT_TYPE = EditType.UPDATE;

    @Autowired
    private SeparationApplicationLogRepository separationApplicationLogRepository;

    

    @Autowired
    private SeparationApplicationLogService separationApplicationLogService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSeparationApplicationLogMockMvc;

    private SeparationApplicationLog separationApplicationLog;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SeparationApplicationLogResource separationApplicationLogResource = new SeparationApplicationLogResource(separationApplicationLogService);
        this.restSeparationApplicationLogMockMvc = MockMvcBuilders.standaloneSetup(separationApplicationLogResource)
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
    public static SeparationApplicationLog createEntity(EntityManager em) {
        SeparationApplicationLog separationApplicationLog = new SeparationApplicationLog()
            .status(DEFAULT_STATUS)
            .dateApproved(DEFAULT_DATE_APPROVED)
            .dateSubmitted(DEFAULT_DATE_SUBMITTED)
            .dateCompleted(DEFAULT_DATE_COMPLETED)
            .dateOfLeave(DEFAULT_DATE_OF_LEAVE)
            .actionAdded(DEFAULT_ACTION_ADDED)
            .dateEdited(DEFAULT_DATE_EDITED)
            .editType(DEFAULT_EDIT_TYPE);
        // Add required entity
        Employee employee = EmployeeResourceIntTest.createEntity(em);
        em.persist(employee);
        em.flush();
        separationApplicationLog.setEditor(employee);
        // Add required entity
        HrReps hrReps = HrRepsResourceIntTest.createEntity(em);
        em.persist(hrReps);
        em.flush();
        separationApplicationLog.setHrReps(hrReps);
        // Add required entity
        FunctionReps functionReps = FunctionRepsResourceIntTest.createEntity(em);
        em.persist(functionReps);
        em.flush();
        separationApplicationLog.setFunctionReps(functionReps);
        // Add required entity
        separationApplicationLog.setEmployee(employee);
        // Add required entity
        SeparationApplication separationApplication = SeparationApplicationResourceIntTest.createEntity(em);
        em.persist(separationApplication);
        em.flush();
        separationApplicationLog.setSeparationApplication(separationApplication);
        return separationApplicationLog;
    }

    @Before
    public void initTest() {
        separationApplicationLog = createEntity(em);
    }

    @Test
    @Transactional
    public void createSeparationApplicationLog() throws Exception {
        int databaseSizeBeforeCreate = separationApplicationLogRepository.findAll().size();

        // Create the SeparationApplicationLog
        restSeparationApplicationLogMockMvc.perform(post("/api/separation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separationApplicationLog)))
            .andExpect(status().isCreated());

        // Validate the SeparationApplicationLog in the database
        List<SeparationApplicationLog> separationApplicationLogList = separationApplicationLogRepository.findAll();
        assertThat(separationApplicationLogList).hasSize(databaseSizeBeforeCreate + 1);
        SeparationApplicationLog testSeparationApplicationLog = separationApplicationLogList.get(separationApplicationLogList.size() - 1);
        assertThat(testSeparationApplicationLog.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testSeparationApplicationLog.getDateApproved()).isEqualTo(DEFAULT_DATE_APPROVED);
        assertThat(testSeparationApplicationLog.getDateSubmitted()).isEqualTo(DEFAULT_DATE_SUBMITTED);
        assertThat(testSeparationApplicationLog.getDateCompleted()).isEqualTo(DEFAULT_DATE_COMPLETED);
        assertThat(testSeparationApplicationLog.getDateOfLeave()).isEqualTo(DEFAULT_DATE_OF_LEAVE);
        assertThat(testSeparationApplicationLog.isActionAdded()).isEqualTo(DEFAULT_ACTION_ADDED);
        assertThat(testSeparationApplicationLog.getDateEdited()).isEqualTo(DEFAULT_DATE_EDITED);
        assertThat(testSeparationApplicationLog.getEditType()).isEqualTo(DEFAULT_EDIT_TYPE);
    }

    @Test
    @Transactional
    public void createSeparationApplicationLogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = separationApplicationLogRepository.findAll().size();

        // Create the SeparationApplicationLog with an existing ID
        separationApplicationLog.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSeparationApplicationLogMockMvc.perform(post("/api/separation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separationApplicationLog)))
            .andExpect(status().isBadRequest());

        // Validate the SeparationApplicationLog in the database
        List<SeparationApplicationLog> separationApplicationLogList = separationApplicationLogRepository.findAll();
        assertThat(separationApplicationLogList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = separationApplicationLogRepository.findAll().size();
        // set the field null
        separationApplicationLog.setStatus(null);

        // Create the SeparationApplicationLog, which fails.

        restSeparationApplicationLogMockMvc.perform(post("/api/separation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separationApplicationLog)))
            .andExpect(status().isBadRequest());

        List<SeparationApplicationLog> separationApplicationLogList = separationApplicationLogRepository.findAll();
        assertThat(separationApplicationLogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateSubmittedIsRequired() throws Exception {
        int databaseSizeBeforeTest = separationApplicationLogRepository.findAll().size();
        // set the field null
        separationApplicationLog.setDateSubmitted(null);

        // Create the SeparationApplicationLog, which fails.

        restSeparationApplicationLogMockMvc.perform(post("/api/separation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separationApplicationLog)))
            .andExpect(status().isBadRequest());

        List<SeparationApplicationLog> separationApplicationLogList = separationApplicationLogRepository.findAll();
        assertThat(separationApplicationLogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActionAddedIsRequired() throws Exception {
        int databaseSizeBeforeTest = separationApplicationLogRepository.findAll().size();
        // set the field null
        separationApplicationLog.setActionAdded(null);

        // Create the SeparationApplicationLog, which fails.

        restSeparationApplicationLogMockMvc.perform(post("/api/separation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separationApplicationLog)))
            .andExpect(status().isBadRequest());

        List<SeparationApplicationLog> separationApplicationLogList = separationApplicationLogRepository.findAll();
        assertThat(separationApplicationLogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateEditedIsRequired() throws Exception {
        int databaseSizeBeforeTest = separationApplicationLogRepository.findAll().size();
        // set the field null
        separationApplicationLog.setDateEdited(null);

        // Create the SeparationApplicationLog, which fails.

        restSeparationApplicationLogMockMvc.perform(post("/api/separation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separationApplicationLog)))
            .andExpect(status().isBadRequest());

        List<SeparationApplicationLog> separationApplicationLogList = separationApplicationLogRepository.findAll();
        assertThat(separationApplicationLogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEditTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = separationApplicationLogRepository.findAll().size();
        // set the field null
        separationApplicationLog.setEditType(null);

        // Create the SeparationApplicationLog, which fails.

        restSeparationApplicationLogMockMvc.perform(post("/api/separation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separationApplicationLog)))
            .andExpect(status().isBadRequest());

        List<SeparationApplicationLog> separationApplicationLogList = separationApplicationLogRepository.findAll();
        assertThat(separationApplicationLogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSeparationApplicationLogs() throws Exception {
        // Initialize the database
        separationApplicationLogRepository.saveAndFlush(separationApplicationLog);

        // Get all the separationApplicationLogList
        restSeparationApplicationLogMockMvc.perform(get("/api/separation-application-logs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(separationApplicationLog.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].dateApproved").value(hasItem(DEFAULT_DATE_APPROVED.toString())))
            .andExpect(jsonPath("$.[*].dateSubmitted").value(hasItem(DEFAULT_DATE_SUBMITTED.toString())))
            .andExpect(jsonPath("$.[*].dateCompleted").value(hasItem(DEFAULT_DATE_COMPLETED.toString())))
            .andExpect(jsonPath("$.[*].dateOfLeave").value(hasItem(DEFAULT_DATE_OF_LEAVE.toString())))
            .andExpect(jsonPath("$.[*].actionAdded").value(hasItem(DEFAULT_ACTION_ADDED.booleanValue())))
            .andExpect(jsonPath("$.[*].dateEdited").value(hasItem(DEFAULT_DATE_EDITED.toString())))
            .andExpect(jsonPath("$.[*].editType").value(hasItem(DEFAULT_EDIT_TYPE.toString())));
    }
    

    @Test
    @Transactional
    public void getSeparationApplicationLog() throws Exception {
        // Initialize the database
        separationApplicationLogRepository.saveAndFlush(separationApplicationLog);

        // Get the separationApplicationLog
        restSeparationApplicationLogMockMvc.perform(get("/api/separation-application-logs/{id}", separationApplicationLog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(separationApplicationLog.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.dateApproved").value(DEFAULT_DATE_APPROVED.toString()))
            .andExpect(jsonPath("$.dateSubmitted").value(DEFAULT_DATE_SUBMITTED.toString()))
            .andExpect(jsonPath("$.dateCompleted").value(DEFAULT_DATE_COMPLETED.toString()))
            .andExpect(jsonPath("$.dateOfLeave").value(DEFAULT_DATE_OF_LEAVE.toString()))
            .andExpect(jsonPath("$.actionAdded").value(DEFAULT_ACTION_ADDED.booleanValue()))
            .andExpect(jsonPath("$.dateEdited").value(DEFAULT_DATE_EDITED.toString()))
            .andExpect(jsonPath("$.editType").value(DEFAULT_EDIT_TYPE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSeparationApplicationLog() throws Exception {
        // Get the separationApplicationLog
        restSeparationApplicationLogMockMvc.perform(get("/api/separation-application-logs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSeparationApplicationLog() throws Exception {
        // Initialize the database
        separationApplicationLogService.save(separationApplicationLog);

        int databaseSizeBeforeUpdate = separationApplicationLogRepository.findAll().size();

        // Update the separationApplicationLog
        SeparationApplicationLog updatedSeparationApplicationLog = separationApplicationLogRepository.findById(separationApplicationLog.getId()).get();
        // Disconnect from session so that the updates on updatedSeparationApplicationLog are not directly saved in db
        em.detach(updatedSeparationApplicationLog);
        updatedSeparationApplicationLog
            .status(UPDATED_STATUS)
            .dateApproved(UPDATED_DATE_APPROVED)
            .dateSubmitted(UPDATED_DATE_SUBMITTED)
            .dateCompleted(UPDATED_DATE_COMPLETED)
            .dateOfLeave(UPDATED_DATE_OF_LEAVE)
            .actionAdded(UPDATED_ACTION_ADDED)
            .dateEdited(UPDATED_DATE_EDITED)
            .editType(UPDATED_EDIT_TYPE);

        restSeparationApplicationLogMockMvc.perform(put("/api/separation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSeparationApplicationLog)))
            .andExpect(status().isOk());

        // Validate the SeparationApplicationLog in the database
        List<SeparationApplicationLog> separationApplicationLogList = separationApplicationLogRepository.findAll();
        assertThat(separationApplicationLogList).hasSize(databaseSizeBeforeUpdate);
        SeparationApplicationLog testSeparationApplicationLog = separationApplicationLogList.get(separationApplicationLogList.size() - 1);
        assertThat(testSeparationApplicationLog.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testSeparationApplicationLog.getDateApproved()).isEqualTo(UPDATED_DATE_APPROVED);
        assertThat(testSeparationApplicationLog.getDateSubmitted()).isEqualTo(UPDATED_DATE_SUBMITTED);
        assertThat(testSeparationApplicationLog.getDateCompleted()).isEqualTo(UPDATED_DATE_COMPLETED);
        assertThat(testSeparationApplicationLog.getDateOfLeave()).isEqualTo(UPDATED_DATE_OF_LEAVE);
        assertThat(testSeparationApplicationLog.isActionAdded()).isEqualTo(UPDATED_ACTION_ADDED);
        assertThat(testSeparationApplicationLog.getDateEdited()).isEqualTo(UPDATED_DATE_EDITED);
        assertThat(testSeparationApplicationLog.getEditType()).isEqualTo(UPDATED_EDIT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingSeparationApplicationLog() throws Exception {
        int databaseSizeBeforeUpdate = separationApplicationLogRepository.findAll().size();

        // Create the SeparationApplicationLog

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSeparationApplicationLogMockMvc.perform(put("/api/separation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separationApplicationLog)))
            .andExpect(status().isBadRequest());

        // Validate the SeparationApplicationLog in the database
        List<SeparationApplicationLog> separationApplicationLogList = separationApplicationLogRepository.findAll();
        assertThat(separationApplicationLogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSeparationApplicationLog() throws Exception {
        // Initialize the database
        separationApplicationLogService.save(separationApplicationLog);

        int databaseSizeBeforeDelete = separationApplicationLogRepository.findAll().size();

        // Get the separationApplicationLog
        restSeparationApplicationLogMockMvc.perform(delete("/api/separation-application-logs/{id}", separationApplicationLog.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SeparationApplicationLog> separationApplicationLogList = separationApplicationLogRepository.findAll();
        assertThat(separationApplicationLogList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SeparationApplicationLog.class);
        SeparationApplicationLog separationApplicationLog1 = new SeparationApplicationLog();
        separationApplicationLog1.setId(1L);
        SeparationApplicationLog separationApplicationLog2 = new SeparationApplicationLog();
        separationApplicationLog2.setId(separationApplicationLog1.getId());
        assertThat(separationApplicationLog1).isEqualTo(separationApplicationLog2);
        separationApplicationLog2.setId(2L);
        assertThat(separationApplicationLog1).isNotEqualTo(separationApplicationLog2);
        separationApplicationLog1.setId(null);
        assertThat(separationApplicationLog1).isNotEqualTo(separationApplicationLog2);
    }
}
