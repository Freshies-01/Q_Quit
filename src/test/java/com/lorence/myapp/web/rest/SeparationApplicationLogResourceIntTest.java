package com.lorence.myapp.web.rest;

import com.lorence.myapp.QQuitApp;

import com.lorence.myapp.domain.SeparationApplicationLog;
import com.lorence.myapp.domain.Employee;
import com.lorence.myapp.domain.SeparationApplication;
import com.lorence.myapp.repository.SeparationApplicationLogRepository;
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

import com.lorence.myapp.domain.enumeration.EditType;
/**
 * Test class for the SeparationApplicationLogResource REST controller.
 *
 * @see SeparationApplicationLogResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = QQuitApp.class)
public class SeparationApplicationLogResourceIntTest {

    private static final EditType DEFAULT_EDIT_TYPE = EditType.CREATE;
    private static final EditType UPDATED_EDIT_TYPE = EditType.UPDATE;

    private static final LocalDate DEFAULT_DATE_EDITED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_EDITED = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SeparationApplicationLogRepository separationApplicationLogRepository;


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
        final SeparationApplicationLogResource separationApplicationLogResource = new SeparationApplicationLogResource(separationApplicationLogRepository);
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
            .editType(DEFAULT_EDIT_TYPE)
            .dateEdited(DEFAULT_DATE_EDITED);
        // Add required entity
        Employee employee = EmployeeResourceIntTest.createEntity(em);
        em.persist(employee);
        em.flush();
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
        assertThat(testSeparationApplicationLog.getEditType()).isEqualTo(DEFAULT_EDIT_TYPE);
        assertThat(testSeparationApplicationLog.getDateEdited()).isEqualTo(DEFAULT_DATE_EDITED);
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
    public void getAllSeparationApplicationLogs() throws Exception {
        // Initialize the database
        separationApplicationLogRepository.saveAndFlush(separationApplicationLog);

        // Get all the separationApplicationLogList
        restSeparationApplicationLogMockMvc.perform(get("/api/separation-application-logs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(separationApplicationLog.getId().intValue())))
            .andExpect(jsonPath("$.[*].editType").value(hasItem(DEFAULT_EDIT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].dateEdited").value(hasItem(DEFAULT_DATE_EDITED.toString())));
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
            .andExpect(jsonPath("$.editType").value(DEFAULT_EDIT_TYPE.toString()))
            .andExpect(jsonPath("$.dateEdited").value(DEFAULT_DATE_EDITED.toString()));
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
        separationApplicationLogRepository.saveAndFlush(separationApplicationLog);

        int databaseSizeBeforeUpdate = separationApplicationLogRepository.findAll().size();

        // Update the separationApplicationLog
        SeparationApplicationLog updatedSeparationApplicationLog = separationApplicationLogRepository.findById(separationApplicationLog.getId()).get();
        // Disconnect from session so that the updates on updatedSeparationApplicationLog are not directly saved in db
        em.detach(updatedSeparationApplicationLog);
        updatedSeparationApplicationLog
            .editType(UPDATED_EDIT_TYPE)
            .dateEdited(UPDATED_DATE_EDITED);

        restSeparationApplicationLogMockMvc.perform(put("/api/separation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSeparationApplicationLog)))
            .andExpect(status().isOk());

        // Validate the SeparationApplicationLog in the database
        List<SeparationApplicationLog> separationApplicationLogList = separationApplicationLogRepository.findAll();
        assertThat(separationApplicationLogList).hasSize(databaseSizeBeforeUpdate);
        SeparationApplicationLog testSeparationApplicationLog = separationApplicationLogList.get(separationApplicationLogList.size() - 1);
        assertThat(testSeparationApplicationLog.getEditType()).isEqualTo(UPDATED_EDIT_TYPE);
        assertThat(testSeparationApplicationLog.getDateEdited()).isEqualTo(UPDATED_DATE_EDITED);
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
        separationApplicationLogRepository.saveAndFlush(separationApplicationLog);

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
