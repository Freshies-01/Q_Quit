package com.lorence.myapp.repository;

import java.util.List;

import com.lorence.myapp.domain.SeparationApplicationLog;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;


/**
 * Spring Data  repository for the SeparationApplicationLog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SeparationApplicationLogRepository extends JpaRepository<SeparationApplicationLog, Long> {

    @Query("SELECT log FROM SeparationApplicationLog log WHERE log.separationApplication.id = ?1")
    List<SeparationApplicationLog> findAllLogsBySeparationApplicationId(@PathVariable Long saId);
}
