package com.lorence.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.lorence.myapp.domain.enumeration.Status;

import com.lorence.myapp.domain.enumeration.EditType;

/**
 * A SepartationApplicationLog.
 */
@Entity
@Table(name = "separtation_application_log")
public class SepartationApplicationLog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @Column(name = "date_approved")
    private LocalDate dateApproved;

    @NotNull
    @Column(name = "date_submitted", nullable = false)
    private LocalDate dateSubmitted;

    @Column(name = "date_completed")
    private LocalDate dateCompleted;

    @Column(name = "date_of_leave")
    private LocalDate dateOfLeave;

    @NotNull
    @Column(name = "action_added", nullable = false)
    private Boolean actionAdded;

    @NotNull
    @Column(name = "date_edited", nullable = false)
    private LocalDate dateEdited;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "edit_type", nullable = false)
    private EditType editType;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Employee editor;

    @OneToOne
    @JoinColumn(unique = true)
    private Action action;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private HrReps hrReps;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private FunctionReps functionReps;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Employee employee;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private SeparationApplication separationApplication;

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

    public SepartationApplicationLog status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDate getDateApproved() {
        return dateApproved;
    }

    public SepartationApplicationLog dateApproved(LocalDate dateApproved) {
        this.dateApproved = dateApproved;
        return this;
    }

    public void setDateApproved(LocalDate dateApproved) {
        this.dateApproved = dateApproved;
    }

    public LocalDate getDateSubmitted() {
        return dateSubmitted;
    }

    public SepartationApplicationLog dateSubmitted(LocalDate dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
        return this;
    }

    public void setDateSubmitted(LocalDate dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }

    public LocalDate getDateCompleted() {
        return dateCompleted;
    }

    public SepartationApplicationLog dateCompleted(LocalDate dateCompleted) {
        this.dateCompleted = dateCompleted;
        return this;
    }

    public void setDateCompleted(LocalDate dateCompleted) {
        this.dateCompleted = dateCompleted;
    }

    public LocalDate getDateOfLeave() {
        return dateOfLeave;
    }

    public SepartationApplicationLog dateOfLeave(LocalDate dateOfLeave) {
        this.dateOfLeave = dateOfLeave;
        return this;
    }

    public void setDateOfLeave(LocalDate dateOfLeave) {
        this.dateOfLeave = dateOfLeave;
    }

    public Boolean isActionAdded() {
        return actionAdded;
    }

    public SepartationApplicationLog actionAdded(Boolean actionAdded) {
        this.actionAdded = actionAdded;
        return this;
    }

    public void setActionAdded(Boolean actionAdded) {
        this.actionAdded = actionAdded;
    }

    public LocalDate getDateEdited() {
        return dateEdited;
    }

    public SepartationApplicationLog dateEdited(LocalDate dateEdited) {
        this.dateEdited = dateEdited;
        return this;
    }

    public void setDateEdited(LocalDate dateEdited) {
        this.dateEdited = dateEdited;
    }

    public EditType getEditType() {
        return editType;
    }

    public SepartationApplicationLog editType(EditType editType) {
        this.editType = editType;
        return this;
    }

    public void setEditType(EditType editType) {
        this.editType = editType;
    }

    public Employee getEditor() {
        return editor;
    }

    public SepartationApplicationLog editor(Employee employee) {
        this.editor = employee;
        return this;
    }

    public void setEditor(Employee employee) {
        this.editor = employee;
    }

    public Action getAction() {
        return action;
    }

    public SepartationApplicationLog action(Action action) {
        this.action = action;
        return this;
    }

    public void setAction(Action action) {
        this.action = action;
    }

    public HrReps getHrReps() {
        return hrReps;
    }

    public SepartationApplicationLog hrReps(HrReps hrReps) {
        this.hrReps = hrReps;
        return this;
    }

    public void setHrReps(HrReps hrReps) {
        this.hrReps = hrReps;
    }

    public FunctionReps getFunctionReps() {
        return functionReps;
    }

    public SepartationApplicationLog functionReps(FunctionReps functionReps) {
        this.functionReps = functionReps;
        return this;
    }

    public void setFunctionReps(FunctionReps functionReps) {
        this.functionReps = functionReps;
    }

    public Employee getEmployee() {
        return employee;
    }

    public SepartationApplicationLog employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public SeparationApplication getSeparationApplication() {
        return separationApplication;
    }

    public SepartationApplicationLog separationApplication(SeparationApplication separationApplication) {
        this.separationApplication = separationApplication;
        return this;
    }

    public void setSeparationApplication(SeparationApplication separationApplication) {
        this.separationApplication = separationApplication;
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
        SepartationApplicationLog separtationApplicationLog = (SepartationApplicationLog) o;
        if (separtationApplicationLog.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), separtationApplicationLog.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SepartationApplicationLog{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", dateApproved='" + getDateApproved() + "'" +
            ", dateSubmitted='" + getDateSubmitted() + "'" +
            ", dateCompleted='" + getDateCompleted() + "'" +
            ", dateOfLeave='" + getDateOfLeave() + "'" +
            ", actionAdded='" + isActionAdded() + "'" +
            ", dateEdited='" + getDateEdited() + "'" +
            ", editType='" + getEditType() + "'" +
            "}";
    }
}
