package com.lorence.myapp.repository;

import java.util.List;

import com.lorence.myapp.domain.SeparationApplication;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SeparationApplication entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SeparationApplicationRepository extends JpaRepository<SeparationApplication, Long> {

    @Query("SELECT app FROM SeparationApplication app WHERE app.status != 'CLOSED_BY_HR'")
    public List<SeparationApplication> findAllPendingApplications();

    @Query("SELECT app FROM SeparationApplication app WHERE app.status = 'CLOSED_BY_HR'")
    public List<SeparationApplication> findAllClosedApplications();

    @Query("FROM Employee emp JOIN HrReps hr "
           +"ON hr.employee.id = emp.id WHERE emp.id = ?1 AND hr.id = " 
           +"(SELECT sa.hr.id FROM SeparationApplication sa)")
    public List<SeparationApplication> findAllApplicationsByHr(long hrId);
}
