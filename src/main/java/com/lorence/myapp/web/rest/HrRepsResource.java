package com.lorence.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lorence.myapp.domain.HrReps;
import com.lorence.myapp.repository.HrRepsRepository;
import com.lorence.myapp.web.rest.errors.BadRequestAlertException;
import com.lorence.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing HrReps.
 */
@RestController
@RequestMapping("/api")
public class HrRepsResource {

    private final Logger log = LoggerFactory.getLogger(HrRepsResource.class);

    private static final String ENTITY_NAME = "hrReps";

    private final HrRepsRepository hrRepsRepository;

    public HrRepsResource(HrRepsRepository hrRepsRepository) {
        this.hrRepsRepository = hrRepsRepository;
    }

    /**
     * POST  /hr-reps : Create a new hrReps.
     *
     * @param hrReps the hrReps to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hrReps, or with status 400 (Bad Request) if the hrReps has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hr-reps")
    @Timed
    public ResponseEntity<HrReps> createHrReps(@RequestBody HrReps hrReps) throws URISyntaxException {
        log.debug("REST request to save HrReps : {}", hrReps);
        if (hrReps.getId() != null) {
            throw new BadRequestAlertException("A new hrReps cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HrReps result = hrRepsRepository.save(hrReps);
        return ResponseEntity.created(new URI("/api/hr-reps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hr-reps : Updates an existing hrReps.
     *
     * @param hrReps the hrReps to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hrReps,
     * or with status 400 (Bad Request) if the hrReps is not valid,
     * or with status 500 (Internal Server Error) if the hrReps couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hr-reps")
    @Timed
    public ResponseEntity<HrReps> updateHrReps(@RequestBody HrReps hrReps) throws URISyntaxException {
        log.debug("REST request to update HrReps : {}", hrReps);
        if (hrReps.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HrReps result = hrRepsRepository.save(hrReps);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hrReps.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hr-reps : get all the hrReps.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hrReps in body
     */
    @GetMapping("/hr-reps")
    @Timed
    public List<HrReps> getAllHrReps() {
        log.debug("REST request to get all HrReps");
        return hrRepsRepository.findAll();
    }

    /**
     * GET  /hr-reps/:id : get the "id" hrReps.
     *
     * @param id the id of the hrReps to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hrReps, or with status 404 (Not Found)
     */
    @GetMapping("/hr-reps/{id}")
    @Timed
    public ResponseEntity<HrReps> getHrReps(@PathVariable Long id) {
        log.debug("REST request to get HrReps : {}", id);
        Optional<HrReps> hrReps = hrRepsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(hrReps);
    }

    /**
     * DELETE  /hr-reps/:id : delete the "id" hrReps.
     *
     * @param id the id of the hrReps to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hr-reps/{id}")
    @Timed
    public ResponseEntity<Void> deleteHrReps(@PathVariable Long id) {
        log.debug("REST request to delete HrReps : {}", id);

        hrRepsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
