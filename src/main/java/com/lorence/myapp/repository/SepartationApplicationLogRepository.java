package com.lorence.myapp.repository;

import com.lorence.myapp.domain.SepartationApplicationLog;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SepartationApplicationLog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SepartationApplicationLogRepository extends JpaRepository<SepartationApplicationLog, Long> {

}
