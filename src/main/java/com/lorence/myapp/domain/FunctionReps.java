package com.lorence.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A FunctionReps.
 */
@Entity
@Table(name = "function_reps")
public class FunctionReps implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Employee employee;

    @OneToMany(mappedBy = "fr")
    private Set<SeparationApplication> applications = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public FunctionReps employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Set<SeparationApplication> getApplications() {
        return applications;
    }

    public FunctionReps applications(Set<SeparationApplication> separationApplications) {
        this.applications = separationApplications;
        return this;
    }

    public FunctionReps addApplication(SeparationApplication separationApplication) {
        this.applications.add(separationApplication);
        separationApplication.setFr(this);
        return this;
    }

    public FunctionReps removeApplication(SeparationApplication separationApplication) {
        this.applications.remove(separationApplication);
        separationApplication.setFr(null);
        return this;
    }

    public void setApplications(Set<SeparationApplication> separationApplications) {
        this.applications = separationApplications;
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
        FunctionReps functionReps = (FunctionReps) o;
        if (functionReps.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), functionReps.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FunctionReps{" +
            "id=" + getId() +
            "}";
    }
}
