package com.lorence.myapp.repository;

import com.lorence.myapp.domain.FunctionReps;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FunctionReps entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FunctionRepsRepository extends JpaRepository<FunctionReps, Long> {

}
