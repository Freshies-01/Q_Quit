package com.lorence.myapp.repository;
import java.util.List;

import com.lorence.myapp.domain.Action;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Action entity.
 */
@Repository
public interface ActionRepository extends JpaRepository<Action, Long> {

    @Query("SELECT action FROM Action action WHERE action.separationApplication.id = ?1")
    public List<Action> findAllBySeparationApplicationId(long id);
}
