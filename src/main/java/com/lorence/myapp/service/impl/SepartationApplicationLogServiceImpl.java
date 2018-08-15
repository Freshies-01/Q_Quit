package com.lorence.myapp.service.impl;

import com.lorence.myapp.service.SepartationApplicationLogService;
import com.lorence.myapp.domain.SepartationApplicationLog;
import com.lorence.myapp.repository.SepartationApplicationLogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing SepartationApplicationLog.
 */
@Service
@Transactional
public class SepartationApplicationLogServiceImpl implements SepartationApplicationLogService {

    private final Logger log = LoggerFactory.getLogger(SepartationApplicationLogServiceImpl.class);

    private final SepartationApplicationLogRepository separtationApplicationLogRepository;

    public SepartationApplicationLogServiceImpl(SepartationApplicationLogRepository separtationApplicationLogRepository) {
        this.separtationApplicationLogRepository = separtationApplicationLogRepository;
    }

    /**
     * Save a separtationApplicationLog.
     *
     * @param separtationApplicationLog the entity to save
     * @return the persisted entity
     */
    @Override
    public SepartationApplicationLog save(SepartationApplicationLog separtationApplicationLog) {
        log.debug("Request to save SepartationApplicationLog : {}", separtationApplicationLog);        return separtationApplicationLogRepository.save(separtationApplicationLog);
    }

    /**
     * Get all the separtationApplicationLogs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SepartationApplicationLog> findAll(Pageable pageable) {
        log.debug("Request to get all SepartationApplicationLogs");
        return separtationApplicationLogRepository.findAll(pageable);
    }


    /**
     * Get one separtationApplicationLog by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SepartationApplicationLog> findOne(Long id) {
        log.debug("Request to get SepartationApplicationLog : {}", id);
        return separtationApplicationLogRepository.findById(id);
    }

    /**
     * Delete the separtationApplicationLog by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SepartationApplicationLog : {}", id);
        separtationApplicationLogRepository.deleteById(id);
    }
}
