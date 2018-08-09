package com.lorence.myapp.repository;

import com.lorence.myapp.domain.HrReps;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HrReps entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HrRepsRepository extends JpaRepository<HrReps, Long> {

}
