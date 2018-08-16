package com.lorence.myapp.service.impl;

import com.lorence.myapp.service.SeparationApplicationLogService;
import com.lorence.myapp.domain.SeparationApplicationLog;
import com.lorence.myapp.repository.SeparationApplicationLogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing SeparationApplicationLog.
 */
@Service
@Transactional
public class SeparationApplicationLogServiceImpl implements SeparationApplicationLogService {

    private final Logger log = LoggerFactory.getLogger(SeparationApplicationLogServiceImpl.class);

    private final SeparationApplicationLogRepository separationApplicationLogRepository;

    public SeparationApplicationLogServiceImpl(SeparationApplicationLogRepository separationApplicationLogRepository) {
        this.separationApplicationLogRepository = separationApplicationLogRepository;
    }

    /**
     * Save a separationApplicationLog.
     *
     * @param separationApplicationLog the entity to save
     * @return the persisted entity
     */
    @Override
    public SeparationApplicationLog save(SeparationApplicationLog separationApplicationLog) {
        log.debug("Request to save SeparationApplicationLog : {}", separationApplicationLog);        return separationApplicationLogRepository.save(separationApplicationLog);
    }

    /**
     * Get all the separationApplicationLogs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SeparationApplicationLog> findAll(Pageable pageable) {
        log.debug("Request to get all SeparationApplicationLogs");
        return separationApplicationLogRepository.findAll(pageable);
    }


    /**
     * Get one separationApplicationLog by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SeparationApplicationLog> findOne(Long id) {
        log.debug("Request to get SeparationApplicationLog : {}", id);
        return separationApplicationLogRepository.findById(id);
    }

    /**
     * Delete the separationApplicationLog by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SeparationApplicationLog : {}", id);
        separationApplicationLogRepository.deleteById(id);
    }
}
