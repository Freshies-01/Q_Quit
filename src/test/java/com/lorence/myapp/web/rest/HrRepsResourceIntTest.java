package com.lorence.myapp.web.rest;

import com.lorence.myapp.QQuitApp;

import com.lorence.myapp.domain.HrReps;
import com.lorence.myapp.repository.HrRepsRepository;
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
 * Test class for the HrRepsResource REST controller.
 *
 * @see HrRepsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = QQuitApp.class)
public class HrRepsResourceIntTest {

    @Autowired
    private HrRepsRepository hrRepsRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHrRepsMockMvc;

    private HrReps hrReps;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HrRepsResource hrRepsResource = new HrRepsResource(hrRepsRepository);
        this.restHrRepsMockMvc = MockMvcBuilders.standaloneSetup(hrRepsResource)
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
    public static HrReps createEntity(EntityManager em) {
        HrReps hrReps = new HrReps();
        return hrReps;
    }

    @Before
    public void initTest() {
        hrReps = createEntity(em);
    }

    @Test
    @Transactional
    public void createHrReps() throws Exception {
        int databaseSizeBeforeCreate = hrRepsRepository.findAll().size();

        // Create the HrReps
        restHrRepsMockMvc.perform(post("/api/hr-reps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hrReps)))
            .andExpect(status().isCreated());

        // Validate the HrReps in the database
        List<HrReps> hrRepsList = hrRepsRepository.findAll();
        assertThat(hrRepsList).hasSize(databaseSizeBeforeCreate + 1);
        HrReps testHrReps = hrRepsList.get(hrRepsList.size() - 1);
    }

    @Test
    @Transactional
    public void createHrRepsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hrRepsRepository.findAll().size();

        // Create the HrReps with an existing ID
        hrReps.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHrRepsMockMvc.perform(post("/api/hr-reps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hrReps)))
            .andExpect(status().isBadRequest());

        // Validate the HrReps in the database
        List<HrReps> hrRepsList = hrRepsRepository.findAll();
        assertThat(hrRepsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHrReps() throws Exception {
        // Initialize the database
        hrRepsRepository.saveAndFlush(hrReps);

        // Get all the hrRepsList
        restHrRepsMockMvc.perform(get("/api/hr-reps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hrReps.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getHrReps() throws Exception {
        // Initialize the database
        hrRepsRepository.saveAndFlush(hrReps);

        // Get the hrReps
        restHrRepsMockMvc.perform(get("/api/hr-reps/{id}", hrReps.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hrReps.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingHrReps() throws Exception {
        // Get the hrReps
        restHrRepsMockMvc.perform(get("/api/hr-reps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHrReps() throws Exception {
        // Initialize the database
        hrRepsRepository.saveAndFlush(hrReps);

        int databaseSizeBeforeUpdate = hrRepsRepository.findAll().size();

        // Update the hrReps
        HrReps updatedHrReps = hrRepsRepository.findById(hrReps.getId()).get();
        // Disconnect from session so that the updates on updatedHrReps are not directly saved in db
        em.detach(updatedHrReps);

        restHrRepsMockMvc.perform(put("/api/hr-reps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHrReps)))
            .andExpect(status().isOk());

        // Validate the HrReps in the database
        List<HrReps> hrRepsList = hrRepsRepository.findAll();
        assertThat(hrRepsList).hasSize(databaseSizeBeforeUpdate);
        HrReps testHrReps = hrRepsList.get(hrRepsList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingHrReps() throws Exception {
        int databaseSizeBeforeUpdate = hrRepsRepository.findAll().size();

        // Create the HrReps

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHrRepsMockMvc.perform(put("/api/hr-reps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hrReps)))
            .andExpect(status().isBadRequest());

        // Validate the HrReps in the database
        List<HrReps> hrRepsList = hrRepsRepository.findAll();
        assertThat(hrRepsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHrReps() throws Exception {
        // Initialize the database
        hrRepsRepository.saveAndFlush(hrReps);

        int databaseSizeBeforeDelete = hrRepsRepository.findAll().size();

        // Get the hrReps
        restHrRepsMockMvc.perform(delete("/api/hr-reps/{id}", hrReps.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HrReps> hrRepsList = hrRepsRepository.findAll();
        assertThat(hrRepsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HrReps.class);
        HrReps hrReps1 = new HrReps();
        hrReps1.setId(1L);
        HrReps hrReps2 = new HrReps();
        hrReps2.setId(hrReps1.getId());
        assertThat(hrReps1).isEqualTo(hrReps2);
        hrReps2.setId(2L);
        assertThat(hrReps1).isNotEqualTo(hrReps2);
        hrReps1.setId(null);
        assertThat(hrReps1).isNotEqualTo(hrReps2);
    }
}
