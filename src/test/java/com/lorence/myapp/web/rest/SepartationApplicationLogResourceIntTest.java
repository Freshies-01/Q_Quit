package com.lorence.myapp.web.rest;

import com.lorence.myapp.QQuitApp;

import com.lorence.myapp.domain.SepartationApplicationLog;
import com.lorence.myapp.repository.SepartationApplicationLogRepository;
import com.lorence.myapp.service.SepartationApplicationLogService;
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
 * Test class for the SepartationApplicationLogResource REST controller.
 *
 * @see SepartationApplicationLogResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = QQuitApp.class)
public class SepartationApplicationLogResourceIntTest {

    private static final LocalDate DEFAULT_DATE_EDITED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_EDITED = LocalDate.now(ZoneId.systemDefault());

    private static final EditType DEFAULT_EDIT_TYPE = EditType.CREATE;
    private static final EditType UPDATED_EDIT_TYPE = EditType.UPDATE;

    private static final Integer DEFAULT_EDIT_ID = 1;
    private static final Integer UPDATED_EDIT_ID = 2;

    @Autowired
    private SepartationApplicationLogRepository separtationApplicationLogRepository;

    

    @Autowired
    private SepartationApplicationLogService separtationApplicationLogService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSepartationApplicationLogMockMvc;

    private SepartationApplicationLog separtationApplicationLog;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SepartationApplicationLogResource separtationApplicationLogResource = new SepartationApplicationLogResource(separtationApplicationLogService);
        this.restSepartationApplicationLogMockMvc = MockMvcBuilders.standaloneSetup(separtationApplicationLogResource)
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
    public static SepartationApplicationLog createEntity(EntityManager em) {
        SepartationApplicationLog separtationApplicationLog = new SepartationApplicationLog()
            .dateEdited(DEFAULT_DATE_EDITED)
            .editType(DEFAULT_EDIT_TYPE)
            .editId(DEFAULT_EDIT_ID);
        return separtationApplicationLog;
    }

    @Before
    public void initTest() {
        separtationApplicationLog = createEntity(em);
    }

    @Test
    @Transactional
    public void createSepartationApplicationLog() throws Exception {
        int databaseSizeBeforeCreate = separtationApplicationLogRepository.findAll().size();

        // Create the SepartationApplicationLog
        restSepartationApplicationLogMockMvc.perform(post("/api/separtation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separtationApplicationLog)))
            .andExpect(status().isCreated());

        // Validate the SepartationApplicationLog in the database
        List<SepartationApplicationLog> separtationApplicationLogList = separtationApplicationLogRepository.findAll();
        assertThat(separtationApplicationLogList).hasSize(databaseSizeBeforeCreate + 1);
        SepartationApplicationLog testSepartationApplicationLog = separtationApplicationLogList.get(separtationApplicationLogList.size() - 1);
        assertThat(testSepartationApplicationLog.getDateEdited()).isEqualTo(DEFAULT_DATE_EDITED);
        assertThat(testSepartationApplicationLog.getEditType()).isEqualTo(DEFAULT_EDIT_TYPE);
        assertThat(testSepartationApplicationLog.getEditId()).isEqualTo(DEFAULT_EDIT_ID);
    }

    @Test
    @Transactional
    public void createSepartationApplicationLogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = separtationApplicationLogRepository.findAll().size();

        // Create the SepartationApplicationLog with an existing ID
        separtationApplicationLog.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSepartationApplicationLogMockMvc.perform(post("/api/separtation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separtationApplicationLog)))
            .andExpect(status().isBadRequest());

        // Validate the SepartationApplicationLog in the database
        List<SepartationApplicationLog> separtationApplicationLogList = separtationApplicationLogRepository.findAll();
        assertThat(separtationApplicationLogList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateEditedIsRequired() throws Exception {
        int databaseSizeBeforeTest = separtationApplicationLogRepository.findAll().size();
        // set the field null
        separtationApplicationLog.setDateEdited(null);

        // Create the SepartationApplicationLog, which fails.

        restSepartationApplicationLogMockMvc.perform(post("/api/separtation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separtationApplicationLog)))
            .andExpect(status().isBadRequest());

        List<SepartationApplicationLog> separtationApplicationLogList = separtationApplicationLogRepository.findAll();
        assertThat(separtationApplicationLogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEditTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = separtationApplicationLogRepository.findAll().size();
        // set the field null
        separtationApplicationLog.setEditType(null);

        // Create the SepartationApplicationLog, which fails.

        restSepartationApplicationLogMockMvc.perform(post("/api/separtation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separtationApplicationLog)))
            .andExpect(status().isBadRequest());

        List<SepartationApplicationLog> separtationApplicationLogList = separtationApplicationLogRepository.findAll();
        assertThat(separtationApplicationLogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSepartationApplicationLogs() throws Exception {
        // Initialize the database
        separtationApplicationLogRepository.saveAndFlush(separtationApplicationLog);

        // Get all the separtationApplicationLogList
        restSepartationApplicationLogMockMvc.perform(get("/api/separtation-application-logs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(separtationApplicationLog.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateEdited").value(hasItem(DEFAULT_DATE_EDITED.toString())))
            .andExpect(jsonPath("$.[*].editType").value(hasItem(DEFAULT_EDIT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].editId").value(hasItem(DEFAULT_EDIT_ID)));
    }
    

    @Test
    @Transactional
    public void getSepartationApplicationLog() throws Exception {
        // Initialize the database
        separtationApplicationLogRepository.saveAndFlush(separtationApplicationLog);

        // Get the separtationApplicationLog
        restSepartationApplicationLogMockMvc.perform(get("/api/separtation-application-logs/{id}", separtationApplicationLog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(separtationApplicationLog.getId().intValue()))
            .andExpect(jsonPath("$.dateEdited").value(DEFAULT_DATE_EDITED.toString()))
            .andExpect(jsonPath("$.editType").value(DEFAULT_EDIT_TYPE.toString()))
            .andExpect(jsonPath("$.editId").value(DEFAULT_EDIT_ID));
    }
    @Test
    @Transactional
    public void getNonExistingSepartationApplicationLog() throws Exception {
        // Get the separtationApplicationLog
        restSepartationApplicationLogMockMvc.perform(get("/api/separtation-application-logs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSepartationApplicationLog() throws Exception {
        // Initialize the database
        separtationApplicationLogService.save(separtationApplicationLog);

        int databaseSizeBeforeUpdate = separtationApplicationLogRepository.findAll().size();

        // Update the separtationApplicationLog
        SepartationApplicationLog updatedSepartationApplicationLog = separtationApplicationLogRepository.findById(separtationApplicationLog.getId()).get();
        // Disconnect from session so that the updates on updatedSepartationApplicationLog are not directly saved in db
        em.detach(updatedSepartationApplicationLog);
        updatedSepartationApplicationLog
            .dateEdited(UPDATED_DATE_EDITED)
            .editType(UPDATED_EDIT_TYPE)
            .editId(UPDATED_EDIT_ID);

        restSepartationApplicationLogMockMvc.perform(put("/api/separtation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSepartationApplicationLog)))
            .andExpect(status().isOk());

        // Validate the SepartationApplicationLog in the database
        List<SepartationApplicationLog> separtationApplicationLogList = separtationApplicationLogRepository.findAll();
        assertThat(separtationApplicationLogList).hasSize(databaseSizeBeforeUpdate);
        SepartationApplicationLog testSepartationApplicationLog = separtationApplicationLogList.get(separtationApplicationLogList.size() - 1);
        assertThat(testSepartationApplicationLog.getDateEdited()).isEqualTo(UPDATED_DATE_EDITED);
        assertThat(testSepartationApplicationLog.getEditType()).isEqualTo(UPDATED_EDIT_TYPE);
        assertThat(testSepartationApplicationLog.getEditId()).isEqualTo(UPDATED_EDIT_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingSepartationApplicationLog() throws Exception {
        int databaseSizeBeforeUpdate = separtationApplicationLogRepository.findAll().size();

        // Create the SepartationApplicationLog

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSepartationApplicationLogMockMvc.perform(put("/api/separtation-application-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(separtationApplicationLog)))
            .andExpect(status().isBadRequest());

        // Validate the SepartationApplicationLog in the database
        List<SepartationApplicationLog> separtationApplicationLogList = separtationApplicationLogRepository.findAll();
        assertThat(separtationApplicationLogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSepartationApplicationLog() throws Exception {
        // Initialize the database
        separtationApplicationLogService.save(separtationApplicationLog);

        int databaseSizeBeforeDelete = separtationApplicationLogRepository.findAll().size();

        // Get the separtationApplicationLog
        restSepartationApplicationLogMockMvc.perform(delete("/api/separtation-application-logs/{id}", separtationApplicationLog.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SepartationApplicationLog> separtationApplicationLogList = separtationApplicationLogRepository.findAll();
        assertThat(separtationApplicationLogList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SepartationApplicationLog.class);
        SepartationApplicationLog separtationApplicationLog1 = new SepartationApplicationLog();
        separtationApplicationLog1.setId(1L);
        SepartationApplicationLog separtationApplicationLog2 = new SepartationApplicationLog();
        separtationApplicationLog2.setId(separtationApplicationLog1.getId());
        assertThat(separtationApplicationLog1).isEqualTo(separtationApplicationLog2);
        separtationApplicationLog2.setId(2L);
        assertThat(separtationApplicationLog1).isNotEqualTo(separtationApplicationLog2);
        separtationApplicationLog1.setId(null);
        assertThat(separtationApplicationLog1).isNotEqualTo(separtationApplicationLog2);
    }
}
