package com.lorence.myapp.repository;

import com.lorence.myapp.domain.Employee;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Employee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT emp FROM Employee emp WHERE emp.user.id = ?1")
	Employee findByUserId(long userId);

}
