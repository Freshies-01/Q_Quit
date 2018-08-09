package com.lorence.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.lorence.myapp.domain.enumeration.Status;

/**
 * A SeparationApplication.
 */
@Entity
@Table(name = "separation_application")
public class SeparationApplication implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @Column(name = "date_of_leave")
    private LocalDate dateOfLeave;

    @NotNull
    @Column(name = "date_sumbitted", nullable = false)
    private LocalDate dateSumbitted;

    @Column(name = "date_completed")
    private LocalDate dateCompleted;

    @Column(name = "date_approved")
    private LocalDate dateApproved;

    @OneToOne
    @JoinColumn(unique = true)
    private Employee employee;

    @OneToMany(mappedBy = "separationApplication")
    private Set<Action> actions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("applications")
    private HrReps hr;

    @ManyToOne
    @JsonIgnoreProperties("applications")
    private FunctionReps fr;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public SeparationApplication status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDate getDateOfLeave() {
        return dateOfLeave;
    }

    public SeparationApplication dateOfLeave(LocalDate dateOfLeave) {
        this.dateOfLeave = dateOfLeave;
        return this;
    }

    public void setDateOfLeave(LocalDate dateOfLeave) {
        this.dateOfLeave = dateOfLeave;
    }

    public LocalDate getDateSumbitted() {
        return dateSumbitted;
    }

    public SeparationApplication dateSumbitted(LocalDate dateSumbitted) {
        this.dateSumbitted = dateSumbitted;
        return this;
    }

    public void setDateSumbitted(LocalDate dateSumbitted) {
        this.dateSumbitted = dateSumbitted;
    }

    public LocalDate getDateCompleted() {
        return dateCompleted;
    }

    public SeparationApplication dateCompleted(LocalDate dateCompleted) {
        this.dateCompleted = dateCompleted;
        return this;
    }

    public void setDateCompleted(LocalDate dateCompleted) {
        this.dateCompleted = dateCompleted;
    }

    public LocalDate getDateApproved() {
        return dateApproved;
    }

    public SeparationApplication dateApproved(LocalDate dateApproved) {
        this.dateApproved = dateApproved;
        return this;
    }

    public void setDateApproved(LocalDate dateApproved) {
        this.dateApproved = dateApproved;
    }

    public Employee getEmployee() {
        return employee;
    }

    public SeparationApplication employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Set<Action> getActions() {
        return actions;
    }

    public SeparationApplication actions(Set<Action> actions) {
        this.actions = actions;
        return this;
    }

    public SeparationApplication addAction(Action action) {
        this.actions.add(action);
        action.setSeparationApplication(this);
        return this;
    }

    public SeparationApplication removeAction(Action action) {
        this.actions.remove(action);
        action.setSeparationApplication(null);
        return this;
    }

    public void setActions(Set<Action> actions) {
        this.actions = actions;
    }

    public HrReps getHr() {
        return hr;
    }

    public SeparationApplication hr(HrReps hrReps) {
        this.hr = hrReps;
        return this;
    }

    public void setHr(HrReps hrReps) {
        this.hr = hrReps;
    }

    public FunctionReps getFr() {
        return fr;
    }

    public SeparationApplication fr(FunctionReps functionReps) {
        this.fr = functionReps;
        return this;
    }

    public void setFr(FunctionReps functionReps) {
        this.fr = functionReps;
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
        SeparationApplication separationApplication = (SeparationApplication) o;
        if (separationApplication.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), separationApplication.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SeparationApplication{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", dateOfLeave='" + getDateOfLeave() + "'" +
            ", dateSumbitted='" + getDateSumbitted() + "'" +
            ", dateCompleted='" + getDateCompleted() + "'" +
            ", dateApproved='" + getDateApproved() + "'" +
            "}";
    }
}
