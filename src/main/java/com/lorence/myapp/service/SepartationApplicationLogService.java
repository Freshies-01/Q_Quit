package com.lorence.myapp.service;

import com.lorence.myapp.domain.SepartationApplicationLog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing SepartationApplicationLog.
 */
public interface SepartationApplicationLogService {

    /**
     * Save a separtationApplicationLog.
     *
     * @param separtationApplicationLog the entity to save
     * @return the persisted entity
     */
    SepartationApplicationLog save(SepartationApplicationLog separtationApplicationLog);

    /**
     * Get all the separtationApplicationLogs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SepartationApplicationLog> findAll(Pageable pageable);


    /**
     * Get the "id" separtationApplicationLog.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SepartationApplicationLog> findOne(Long id);

    /**
     * Delete the "id" separtationApplicationLog.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
