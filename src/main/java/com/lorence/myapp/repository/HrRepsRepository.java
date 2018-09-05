package com.lorence.myapp.repository;

import com.lorence.myapp.domain.HrReps;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HrReps entity.
 */
@Repository
public interface HrRepsRepository extends JpaRepository<HrReps, Long> {

    @Query("SELECT hr FROM HrReps hr WHERE hr.employee.user.id = ?1")
    HrReps findByUserId(long userId);

}
