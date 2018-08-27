package com.lorence.myapp.repository;

import java.util.List;
import java.util.Optional;

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

    @Query("SELECT app FROM SeparationApplication app WHERE app.employee.user.login = ?1 OR app.hr.employee.user.login = ?1 OR app.fr.employee.user.login = ?1")
    public List<SeparationApplication> findAllApplicationsByLogin(String login);
}
