package com.lorence.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lorence.myapp.domain.SeparationApplicationLog;
import com.lorence.myapp.service.SeparationApplicationLogService;
import com.lorence.myapp.web.rest.errors.BadRequestAlertException;
import com.lorence.myapp.web.rest.util.HeaderUtil;
import com.lorence.myapp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SeparationApplicationLog.
 */
@RestController
@RequestMapping("/api")
public class SeparationApplicationLogResource {

    private final Logger log = LoggerFactory.getLogger(SeparationApplicationLogResource.class);

    private static final String ENTITY_NAME = "separationApplicationLog";

    private final SeparationApplicationLogService separationApplicationLogService;

    public SeparationApplicationLogResource(SeparationApplicationLogService separationApplicationLogService) {
        this.separationApplicationLogService = separationApplicationLogService;
    }

    /**
     * POST  /separation-application-logs : Create a new separationApplicationLog.
     *
     * @param separationApplicationLog the separationApplicationLog to create
     * @return the ResponseEntity with status 201 (Created) and with body the new separationApplicationLog, or with status 400 (Bad Request) if the separationApplicationLog has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/separation-application-logs")
    @Timed
    public ResponseEntity<SeparationApplicationLog> createSeparationApplicationLog(@Valid @RequestBody SeparationApplicationLog separationApplicationLog) throws URISyntaxException {
        log.debug("REST request to save SeparationApplicationLog : {}", separationApplicationLog);
        if (separationApplicationLog.getId() != null) {
            throw new BadRequestAlertException("A new separationApplicationLog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SeparationApplicationLog result = separationApplicationLogService.save(separationApplicationLog);
        return ResponseEntity.created(new URI("/api/separation-application-logs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /separation-application-logs : Updates an existing separationApplicationLog.
     *
     * @param separationApplicationLog the separationApplicationLog to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated separationApplicationLog,
     * or with status 400 (Bad Request) if the separationApplicationLog is not valid,
     * or with status 500 (Internal Server Error) if the separationApplicationLog couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/separation-application-logs")
    @Timed
    public ResponseEntity<SeparationApplicationLog> updateSeparationApplicationLog(@Valid @RequestBody SeparationApplicationLog separationApplicationLog) throws URISyntaxException {
        log.debug("REST request to update SeparationApplicationLog : {}", separationApplicationLog);
        if (separationApplicationLog.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SeparationApplicationLog result = separationApplicationLogService.save(separationApplicationLog);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, separationApplicationLog.getId().toString()))
            .body(result);
    }

    /**
     * GET  /separation-application-logs : get all the separationApplicationLogs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of separationApplicationLogs in body
     */
    @GetMapping("/separation-application-logs")
    @Timed
    public ResponseEntity<List<SeparationApplicationLog>> getAllSeparationApplicationLogs(Pageable pageable) {
        log.debug("REST request to get a page of SeparationApplicationLogs");
        Page<SeparationApplicationLog> page = separationApplicationLogService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/separation-application-logs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /separation-application-logs/:id : get the "id" separationApplicationLog.
     *
     * @param id the id of the separationApplicationLog to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the separationApplicationLog, or with status 404 (Not Found)
     */
    @GetMapping("/separation-application-logs/{id}")
    @Timed
    public ResponseEntity<SeparationApplicationLog> getSeparationApplicationLog(@PathVariable Long id) {
        log.debug("REST request to get SeparationApplicationLog : {}", id);
        Optional<SeparationApplicationLog> separationApplicationLog = separationApplicationLogService.findOne(id);
        return ResponseUtil.wrapOrNotFound(separationApplicationLog);
    }

    /**
     * DELETE  /separation-application-logs/:id : delete the "id" separationApplicationLog.
     *
     * @param id the id of the separationApplicationLog to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/separation-application-logs/{id}")
    @Timed
    public ResponseEntity<Void> deleteSeparationApplicationLog(@PathVariable Long id) {
        log.debug("REST request to delete SeparationApplicationLog : {}", id);
        separationApplicationLogService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
