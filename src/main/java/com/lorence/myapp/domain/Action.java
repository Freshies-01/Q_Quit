package com.lorence.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Action.
 */
@Entity
@Table(name = "action")
public class Action implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "is_completed")
    private Boolean isCompleted;

    @Column(name = "task")
    private String task;

    @Column(name = "date_completed")
    private LocalDate dateCompleted;

    @ManyToOne
    @JsonIgnoreProperties("")
    private SeparationApplication separationApplication;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private FunctionReps functionReps;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isIsCompleted() {
        return isCompleted;
    }

    public Action isCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
        return this;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public String getTask() {
        return task;
    }

    public Action task(String task) {
        this.task = task;
        return this;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public LocalDate getDateCompleted() {
        return dateCompleted;
    }

    public Action dateCompleted(LocalDate dateCompleted) {
        this.dateCompleted = dateCompleted;
        return this;
    }

    public void setDateCompleted(LocalDate dateCompleted) {
        this.dateCompleted = dateCompleted;
    }

    public SeparationApplication getSeparationApplication() {
        return separationApplication;
    }

    public Action separationApplication(SeparationApplication separationApplication) {
        this.separationApplication = separationApplication;
        return this;
    }

    public void setSeparationApplication(SeparationApplication separationApplication) {
        this.separationApplication = separationApplication;
    }

    public FunctionReps getFunctionReps() {
        return functionReps;
    }

    public Action functionReps(FunctionReps functionReps) {
        this.functionReps = functionReps;
        return this;
    }

    public void setFunctionReps(FunctionReps functionReps) {
        this.functionReps = functionReps;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Action action = (Action) o;
        if (action.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), action.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Action{" +
            "id=" + getId() +
            ", isCompleted='" + isIsCompleted() + "'" +
            ", task='" + getTask() + "'" +
            ", dateCompleted='" + getDateCompleted() + "'" +
            "}";
    }
}
