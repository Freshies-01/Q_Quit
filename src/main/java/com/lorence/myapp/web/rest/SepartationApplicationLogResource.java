package com.lorence.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lorence.myapp.domain.SepartationApplicationLog;
import com.lorence.myapp.service.SepartationApplicationLogService;
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
 * REST controller for managing SepartationApplicationLog.
 */
@RestController
@RequestMapping("/api")
public class SepartationApplicationLogResource {

    private final Logger log = LoggerFactory.getLogger(SepartationApplicationLogResource.class);

    private static final String ENTITY_NAME = "separtationApplicationLog";

    private final SepartationApplicationLogService separtationApplicationLogService;

    public SepartationApplicationLogResource(SepartationApplicationLogService separtationApplicationLogService) {
        this.separtationApplicationLogService = separtationApplicationLogService;
    }

    /**
     * POST  /separtation-application-logs : Create a new separtationApplicationLog.
     *
     * @param separtationApplicationLog the separtationApplicationLog to create
     * @return the ResponseEntity with status 201 (Created) and with body the new separtationApplicationLog, or with status 400 (Bad Request) if the separtationApplicationLog has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/separtation-application-logs")
    @Timed
    public ResponseEntity<SepartationApplicationLog> createSepartationApplicationLog(@Valid @RequestBody SepartationApplicationLog separtationApplicationLog) throws URISyntaxException {
        log.debug("REST request to save SepartationApplicationLog : {}", separtationApplicationLog);
        if (separtationApplicationLog.getId() != null) {
            throw new BadRequestAlertException("A new separtationApplicationLog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SepartationApplicationLog result = separtationApplicationLogService.save(separtationApplicationLog);
        return ResponseEntity.created(new URI("/api/separtation-application-logs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /separtation-application-logs : Updates an existing separtationApplicationLog.
     *
     * @param separtationApplicationLog the separtationApplicationLog to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated separtationApplicationLog,
     * or with status 400 (Bad Request) if the separtationApplicationLog is not valid,
     * or with status 500 (Internal Server Error) if the separtationApplicationLog couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/separtation-application-logs")
    @Timed
    public ResponseEntity<SepartationApplicationLog> updateSepartationApplicationLog(@Valid @RequestBody SepartationApplicationLog separtationApplicationLog) throws URISyntaxException {
        log.debug("REST request to update SepartationApplicationLog : {}", separtationApplicationLog);
        if (separtationApplicationLog.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SepartationApplicationLog result = separtationApplicationLogService.save(separtationApplicationLog);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, separtationApplicationLog.getId().toString()))
            .body(result);
    }

    /**
     * GET  /separtation-application-logs : get all the separtationApplicationLogs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of separtationApplicationLogs in body
     */
    @GetMapping("/separtation-application-logs")
    @Timed
    public ResponseEntity<List<SepartationApplicationLog>> getAllSepartationApplicationLogs(Pageable pageable) {
        log.debug("REST request to get a page of SepartationApplicationLogs");
        Page<SepartationApplicationLog> page = separtationApplicationLogService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/separtation-application-logs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /separtation-application-logs/:id : get the "id" separtationApplicationLog.
     *
     * @param id the id of the separtationApplicationLog to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the separtationApplicationLog, or with status 404 (Not Found)
     */
    @GetMapping("/separtation-application-logs/{id}")
    @Timed
    public ResponseEntity<SepartationApplicationLog> getSepartationApplicationLog(@PathVariable Long id) {
        log.debug("REST request to get SepartationApplicationLog : {}", id);
        Optional<SepartationApplicationLog> separtationApplicationLog = separtationApplicationLogService.findOne(id);
        return ResponseUtil.wrapOrNotFound(separtationApplicationLog);
    }

    /**
     * DELETE  /separtation-application-logs/:id : delete the "id" separtationApplicationLog.
     *
     * @param id the id of the separtationApplicationLog to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/separtation-application-logs/{id}")
    @Timed
    public ResponseEntity<Void> deleteSepartationApplicationLog(@PathVariable Long id) {
        log.debug("REST request to delete SepartationApplicationLog : {}", id);
        separtationApplicationLogService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
