package com.lorence.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A HrReps.
 */
@Entity
@Table(name = "hr_reps")
public class HrReps implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Employee employee;

    @OneToMany(mappedBy = "hr")
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

    public HrReps employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Set<SeparationApplication> getApplications() {
        return applications;
    }

    public HrReps applications(Set<SeparationApplication> separationApplications) {
        this.applications = separationApplications;
        return this;
    }

    public HrReps addApplication(SeparationApplication separationApplication) {
        this.applications.add(separationApplication);
        separationApplication.setHr(this);
        return this;
    }

    public HrReps removeApplication(SeparationApplication separationApplication) {
        this.applications.remove(separationApplication);
        separationApplication.setHr(null);
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
        HrReps hrReps = (HrReps) o;
        if (hrReps.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hrReps.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HrReps{" +
            "id=" + getId() +
            "}";
    }
}
