package com.lorence.myapp.service;

import com.lorence.myapp.domain.SeparationApplicationLog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing SeparationApplicationLog.
 */
public interface SeparationApplicationLogService {

    /**
     * Save a SeparationApplicationLog.
     *
     * @param SeparationApplicationLog the entity to save
     * @return the persisted entity
     */
    SeparationApplicationLog save(SeparationApplicationLog separationApplicationLog);

    /**
     * Get all the SeparationApplicationLogs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SeparationApplicationLog> findAll(Pageable pageable);


    /**
     * Get the "id" SeparationApplicationLog.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SeparationApplicationLog> findOne(Long id);

    /**
     * Delete the "id" SeparationApplicationLog.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
