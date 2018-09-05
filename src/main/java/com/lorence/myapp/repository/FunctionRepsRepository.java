package com.lorence.myapp.repository;

import java.util.Optional;

import com.lorence.myapp.domain.FunctionReps;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FunctionReps entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FunctionRepsRepository extends JpaRepository<FunctionReps, Long> {

    @Query("SELECT fr FROM FunctionReps fr WHERE fr.employee.user.login = ?#{principal.username}")
    Optional<FunctionReps> findByCurrentUser();

    @Query("SELECT fr FROM FunctionReps fr WHERE fr.employee.user.id = ?1")
	FunctionReps findByUserId(long userId);
}
