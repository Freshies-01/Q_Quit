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

    @Query("SELECT app FROM SeparationApplication app WHERE app.hr.employee.user.login = ?#{principal.username} OR app.employee.user.login = ?#{principal.username} OR app.fr.employee.user.login = ?#{principal.username}")
    public List<SeparationApplication> findAllApplicationsByLogin();

    @Query("SELECT app FROM SeparationApplication app WHERE app.status != 'CLOSED_BY_HR' AND app.hr.employee.user.login = ?#{principal.username} OR app.status != 'CLOSED_BY_HR' AND app.employee.user.login = ?#{principal.username} OR app.status != 'CLOSED_BY_HR' AND app.fr.employee.user.login = ?#{principal.username}")
    public List<SeparationApplication> findAllPendingApplicationsByLogin();

    @Query("SELECT app FROM SeparationApplication app WHERE app.status = 'CLOSED_BY_HR' AND app.hr.employee.user.login = ?#{principal.username} OR app.status = 'CLOSED_BY_HR' AND app.employee.user.login = ?#{principal.username} OR app.status = 'CLOSED_BY_HR' AND app.fr.employee.user.login = ?#{principal.username}")
    public List<SeparationApplication> findAllClosedApplicationsByLogin();
}
