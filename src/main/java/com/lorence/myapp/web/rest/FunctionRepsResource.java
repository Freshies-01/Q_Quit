package com.lorence.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lorence.myapp.domain.FunctionReps;
import com.lorence.myapp.repository.FunctionRepsRepository;
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
 * REST controller for managing FunctionReps.
 */
@RestController
@RequestMapping("/api")
public class FunctionRepsResource {

    private final Logger log = LoggerFactory.getLogger(FunctionRepsResource.class);

    private static final String ENTITY_NAME = "functionReps";

    private final FunctionRepsRepository functionRepsRepository;

    public FunctionRepsResource(FunctionRepsRepository functionRepsRepository) {
        this.functionRepsRepository = functionRepsRepository;
    }

    /**
     * POST  /function-reps : Create a new functionReps.
     *
     * @param functionReps the functionReps to create
     * @return the ResponseEntity with status 201 (Created) and with body the new functionReps, or with status 400 (Bad Request) if the functionReps has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/function-reps")
    @Timed
    public ResponseEntity<FunctionReps> createFunctionReps(@RequestBody FunctionReps functionReps) throws URISyntaxException {
        log.debug("REST request to save FunctionReps : {}", functionReps);
        if (functionReps.getId() != null) {
            throw new BadRequestAlertException("A new functionReps cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FunctionReps result = functionRepsRepository.save(functionReps);
        return ResponseEntity.created(new URI("/api/function-reps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /function-reps : Updates an existing functionReps.
     *
     * @param functionReps the functionReps to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated functionReps,
     * or with status 400 (Bad Request) if the functionReps is not valid,
     * or with status 500 (Internal Server Error) if the functionReps couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/function-reps")
    @Timed
    public ResponseEntity<FunctionReps> updateFunctionReps(@RequestBody FunctionReps functionReps) throws URISyntaxException {
        log.debug("REST request to update FunctionReps : {}", functionReps);
        if (functionReps.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FunctionReps result = functionRepsRepository.save(functionReps);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, functionReps.getId().toString()))
            .body(result);
    }

    /**
     * GET  /function-reps : get all the functionReps.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of functionReps in body
     */
    @GetMapping("/function-reps")
    @Timed
    public List<FunctionReps> getAllFunctionReps() {
        log.debug("REST request to get all FunctionReps");
        return functionRepsRepository.findAll();
    }

    /**
     * GET  /function-reps/:id : get the "id" functionReps.
     *
     * @param id the id of the functionReps to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the functionReps, or with status 404 (Not Found)
     */
    @GetMapping("/function-reps/{id}")
    @Timed
    public ResponseEntity<FunctionReps> getFunctionReps(@PathVariable Long id) {
        log.debug("REST request to get FunctionReps : {}", id);
        Optional<FunctionReps> functionReps = functionRepsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(functionReps);
    }

    @GetMapping("/current-function-reps")
    @Timed
    public ResponseEntity<FunctionReps> getCurrentFunctionRep() {
        log.debug("REST request to get the current Function Rep");
        Optional<FunctionReps> functionReps = functionRepsRepository.findByCurrentUser();
        return ResponseUtil.wrapOrNotFound(functionReps);
    }

    /**
     * DELETE  /function-reps/:id : delete the "id" functionReps.
     *
     * @param id the id of the functionReps to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/function-reps/{id}")
    @Timed
    public ResponseEntity<Void> deleteFunctionReps(@PathVariable Long id) {
        log.debug("REST request to delete FunctionReps : {}", id);

        functionRepsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
