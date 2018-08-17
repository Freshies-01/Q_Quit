package com.lorence.myapp.web.rest;

import com.lorence.myapp.QQuitApp;

import com.lorence.myapp.domain.SeparationApplication;
import com.lorence.myapp.repository.SeparationApplicationRepository;
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
/**
 * Test class for the SeparationApplicationResource REST controller.
 *
 * @see SeparationApplicationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = QQuitApp.class)
public class SeparationApplicationResourceIntTest {

    private static final Status DEFAULT_STATUS = Status.PENDING;
    private static final Status UPDATED_STATUS = Status.PENDING;

    private static final LocalDate DEFAULT_DATE_OF_LEAVE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_LEAVE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_SUMBITTED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_SUMBITTED = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_COMPLETED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_COMPLETED = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_APPROVED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_APPROVED = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SeparationApplicationRepository separationApplicationRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSeparationApplicationMockMvc;

    private SeparationApplication separationApplication;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SeparationApplicationResource separationApplicationResource = new SeparationApplicationResource(separationApplicationRepository);
        this.restSeparationApplicationMockMvc = MockMvcBuilders.standaloneSetup(separationApplicationResource)
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
    public static SeparationApplication createEntity(EntityManager em) {
        SeparationApplication separationApplication = new SeparationApplication()
            .status(DEFAULT_STATUS)
            .dateOfLeave(DEFAULT_DATE_OF_LEAVE)
            .dateSumbitted(DEFAULT_DATE_SUMBITTED)
            .dateCompleted(DEFAULT_DATE_COMPLETED)
            .dateApproved(DEFAULT_DATE_APPROVED);
        return separationApplication;
    }

    @Before
    public void initTest() {
        separationApplication = createEntity(em);
    }

    @Test
    @Transactional
    public void createSeparationApplication() throws Exception {
        int databaseSizeBeforeCreate = separationApplicationRepository.findAll().size();

        // Create the SeparationApplication
        restSeparationApplicationMockMvc.perform(post("/api/separation-applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separationApplication)))
            .andExpect(status().isCreated());

        // Validate the SeparationApplication in the database
        List<SeparationApplication> separationApplicationList = separationApplicationRepository.findAll();
        assertThat(separationApplicationList).hasSize(databaseSizeBeforeCreate + 1);
        SeparationApplication testSeparationApplication = separationApplicationList.get(separationApplicationList.size() - 1);
        assertThat(testSeparationApplication.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testSeparationApplication.getDateOfLeave()).isEqualTo(DEFAULT_DATE_OF_LEAVE);
        assertThat(testSeparationApplication.getDateSumbitted()).isEqualTo(DEFAULT_DATE_SUMBITTED);
        assertThat(testSeparationApplication.getDateCompleted()).isEqualTo(DEFAULT_DATE_COMPLETED);
        assertThat(testSeparationApplication.getDateApproved()).isEqualTo(DEFAULT_DATE_APPROVED);
    }

    @Test
    @Transactional
    public void createSeparationApplicationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = separationApplicationRepository.findAll().size();

        // Create the SeparationApplication with an existing ID
        separationApplication.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSeparationApplicationMockMvc.perform(post("/api/separation-applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separationApplication)))
            .andExpect(status().isBadRequest());

        // Validate the SeparationApplication in the database
        List<SeparationApplication> separationApplicationList = separationApplicationRepository.findAll();
        assertThat(separationApplicationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = separationApplicationRepository.findAll().size();
        // set the field null
        separationApplication.setStatus(null);

        // Create the SeparationApplication, which fails.

        restSeparationApplicationMockMvc.perform(post("/api/separation-applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separationApplication)))
            .andExpect(status().isBadRequest());

        List<SeparationApplication> separationApplicationList = separationApplicationRepository.findAll();
        assertThat(separationApplicationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateSumbittedIsRequired() throws Exception {
        int databaseSizeBeforeTest = separationApplicationRepository.findAll().size();
        // set the field null
        separationApplication.setDateSumbitted(null);

        // Create the SeparationApplication, which fails.

        restSeparationApplicationMockMvc.perform(post("/api/separation-applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separationApplication)))
            .andExpect(status().isBadRequest());

        List<SeparationApplication> separationApplicationList = separationApplicationRepository.findAll();
        assertThat(separationApplicationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSeparationApplications() throws Exception {
        // Initialize the database
        separationApplicationRepository.saveAndFlush(separationApplication);

        // Get all the separationApplicationList
        restSeparationApplicationMockMvc.perform(get("/api/separation-applications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(separationApplication.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].dateOfLeave").value(hasItem(DEFAULT_DATE_OF_LEAVE.toString())))
            .andExpect(jsonPath("$.[*].dateSumbitted").value(hasItem(DEFAULT_DATE_SUMBITTED.toString())))
            .andExpect(jsonPath("$.[*].dateCompleted").value(hasItem(DEFAULT_DATE_COMPLETED.toString())))
            .andExpect(jsonPath("$.[*].dateApproved").value(hasItem(DEFAULT_DATE_APPROVED.toString())));
    }
    

    @Test
    @Transactional
    public void getSeparationApplication() throws Exception {
        // Initialize the database
        separationApplicationRepository.saveAndFlush(separationApplication);

        // Get the separationApplication
        restSeparationApplicationMockMvc.perform(get("/api/separation-applications/{id}", separationApplication.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(separationApplication.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.dateOfLeave").value(DEFAULT_DATE_OF_LEAVE.toString()))
            .andExpect(jsonPath("$.dateSumbitted").value(DEFAULT_DATE_SUMBITTED.toString()))
            .andExpect(jsonPath("$.dateCompleted").value(DEFAULT_DATE_COMPLETED.toString()))
            .andExpect(jsonPath("$.dateApproved").value(DEFAULT_DATE_APPROVED.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSeparationApplication() throws Exception {
        // Get the separationApplication
        restSeparationApplicationMockMvc.perform(get("/api/separation-applications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSeparationApplication() throws Exception {
        // Initialize the database
        separationApplicationRepository.saveAndFlush(separationApplication);

        int databaseSizeBeforeUpdate = separationApplicationRepository.findAll().size();

        // Update the separationApplication
        SeparationApplication updatedSeparationApplication = separationApplicationRepository.findById(separationApplication.getId()).get();
        // Disconnect from session so that the updates on updatedSeparationApplication are not directly saved in db
        em.detach(updatedSeparationApplication);
        updatedSeparationApplication
            .status(UPDATED_STATUS)
            .dateOfLeave(UPDATED_DATE_OF_LEAVE)
            .dateSumbitted(UPDATED_DATE_SUMBITTED)
            .dateCompleted(UPDATED_DATE_COMPLETED)
            .dateApproved(UPDATED_DATE_APPROVED);

        restSeparationApplicationMockMvc.perform(put("/api/separation-applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSeparationApplication)))
            .andExpect(status().isOk());

        // Validate the SeparationApplication in the database
        List<SeparationApplication> separationApplicationList = separationApplicationRepository.findAll();
        assertThat(separationApplicationList).hasSize(databaseSizeBeforeUpdate);
        SeparationApplication testSeparationApplication = separationApplicationList.get(separationApplicationList.size() - 1);
        assertThat(testSeparationApplication.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testSeparationApplication.getDateOfLeave()).isEqualTo(UPDATED_DATE_OF_LEAVE);
        assertThat(testSeparationApplication.getDateSumbitted()).isEqualTo(UPDATED_DATE_SUMBITTED);
        assertThat(testSeparationApplication.getDateCompleted()).isEqualTo(UPDATED_DATE_COMPLETED);
        assertThat(testSeparationApplication.getDateApproved()).isEqualTo(UPDATED_DATE_APPROVED);
    }

    @Test
    @Transactional
    public void updateNonExistingSeparationApplication() throws Exception {
        int databaseSizeBeforeUpdate = separationApplicationRepository.findAll().size();

        // Create the SeparationApplication

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSeparationApplicationMockMvc.perform(put("/api/separation-applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separationApplication)))
            .andExpect(status().isBadRequest());

        // Validate the SeparationApplication in the database
        List<SeparationApplication> separationApplicationList = separationApplicationRepository.findAll();
        assertThat(separationApplicationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSeparationApplication() throws Exception {
        // Initialize the database
        separationApplicationRepository.saveAndFlush(separationApplication);

        int databaseSizeBeforeDelete = separationApplicationRepository.findAll().size();

        // Get the separationApplication
        restSeparationApplicationMockMvc.perform(delete("/api/separation-applications/{id}", separationApplication.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SeparationApplication> separationApplicationList = separationApplicationRepository.findAll();
        assertThat(separationApplicationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SeparationApplication.class);
        SeparationApplication separationApplication1 = new SeparationApplication();
        separationApplication1.setId(1L);
        SeparationApplication separationApplication2 = new SeparationApplication();
        separationApplication2.setId(separationApplication1.getId());
        assertThat(separationApplication1).isEqualTo(separationApplication2);
        separationApplication2.setId(2L);
        assertThat(separationApplication1).isNotEqualTo(separationApplication2);
        separationApplication1.setId(null);
        assertThat(separationApplication1).isNotEqualTo(separationApplication2);
    }
}
