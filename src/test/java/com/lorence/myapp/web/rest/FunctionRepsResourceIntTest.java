package com.lorence.myapp.web.rest;

import com.lorence.myapp.QQuitApp;

import com.lorence.myapp.domain.FunctionReps;
import com.lorence.myapp.repository.FunctionRepsRepository;
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
import java.util.List;


import static com.lorence.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FunctionRepsResource REST controller.
 *
 * @see FunctionRepsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = QQuitApp.class)
public class FunctionRepsResourceIntTest {

    @Autowired
    private FunctionRepsRepository functionRepsRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFunctionRepsMockMvc;

    private FunctionReps functionReps;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FunctionRepsResource functionRepsResource = new FunctionRepsResource(functionRepsRepository);
        this.restFunctionRepsMockMvc = MockMvcBuilders.standaloneSetup(functionRepsResource)
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
    public static FunctionReps createEntity(EntityManager em) {
        FunctionReps functionReps = new FunctionReps();
        return functionReps;
    }

    @Before
    public void initTest() {
        functionReps = createEntity(em);
    }

    @Test
    @Transactional
    public void createFunctionReps() throws Exception {
        int databaseSizeBeforeCreate = functionRepsRepository.findAll().size();

        // Create the FunctionReps
        restFunctionRepsMockMvc.perform(post("/api/function-reps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(functionReps)))
            .andExpect(status().isCreated());

        // Validate the FunctionReps in the database
        List<FunctionReps> functionRepsList = functionRepsRepository.findAll();
        assertThat(functionRepsList).hasSize(databaseSizeBeforeCreate + 1);
        FunctionReps testFunctionReps = functionRepsList.get(functionRepsList.size() - 1);
    }

    @Test
    @Transactional
    public void createFunctionRepsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = functionRepsRepository.findAll().size();

        // Create the FunctionReps with an existing ID
        functionReps.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFunctionRepsMockMvc.perform(post("/api/function-reps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(functionReps)))
            .andExpect(status().isBadRequest());

        // Validate the FunctionReps in the database
        List<FunctionReps> functionRepsList = functionRepsRepository.findAll();
        assertThat(functionRepsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFunctionReps() throws Exception {
        // Initialize the database
        functionRepsRepository.saveAndFlush(functionReps);

        // Get all the functionRepsList
        restFunctionRepsMockMvc.perform(get("/api/function-reps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(functionReps.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getFunctionReps() throws Exception {
        // Initialize the database
        functionRepsRepository.saveAndFlush(functionReps);

        // Get the functionReps
        restFunctionRepsMockMvc.perform(get("/api/function-reps/{id}", functionReps.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(functionReps.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingFunctionReps() throws Exception {
        // Get the functionReps
        restFunctionRepsMockMvc.perform(get("/api/function-reps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFunctionReps() throws Exception {
        // Initialize the database
        functionRepsRepository.saveAndFlush(functionReps);

        int databaseSizeBeforeUpdate = functionRepsRepository.findAll().size();

        // Update the functionReps
        FunctionReps updatedFunctionReps = functionRepsRepository.findById(functionReps.getId()).get();
        // Disconnect from session so that the updates on updatedFunctionReps are not directly saved in db
        em.detach(updatedFunctionReps);

        restFunctionRepsMockMvc.perform(put("/api/function-reps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFunctionReps)))
            .andExpect(status().isOk());

        // Validate the FunctionReps in the database
        List<FunctionReps> functionRepsList = functionRepsRepository.findAll();
        assertThat(functionRepsList).hasSize(databaseSizeBeforeUpdate);
        FunctionReps testFunctionReps = functionRepsList.get(functionRepsList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingFunctionReps() throws Exception {
        int databaseSizeBeforeUpdate = functionRepsRepository.findAll().size();

        // Create the FunctionReps

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFunctionRepsMockMvc.perform(put("/api/function-reps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(functionReps)))
            .andExpect(status().isBadRequest());

        // Validate the FunctionReps in the database
        List<FunctionReps> functionRepsList = functionRepsRepository.findAll();
        assertThat(functionRepsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFunctionReps() throws Exception {
        // Initialize the database
        functionRepsRepository.saveAndFlush(functionReps);

        int databaseSizeBeforeDelete = functionRepsRepository.findAll().size();

        // Get the functionReps
        restFunctionRepsMockMvc.perform(delete("/api/function-reps/{id}", functionReps.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FunctionReps> functionRepsList = functionRepsRepository.findAll();
        assertThat(functionRepsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FunctionReps.class);
        FunctionReps functionReps1 = new FunctionReps();
        functionReps1.setId(1L);
        FunctionReps functionReps2 = new FunctionReps();
        functionReps2.setId(functionReps1.getId());
        assertThat(functionReps1).isEqualTo(functionReps2);
        functionReps2.setId(2L);
        assertThat(functionReps1).isNotEqualTo(functionReps2);
        functionReps1.setId(null);
        assertThat(functionReps1).isNotEqualTo(functionReps2);
    }
}
