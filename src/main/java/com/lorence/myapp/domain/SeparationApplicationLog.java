package com.lorence.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.lorence.myapp.domain.enumeration.EditType;

/**
 * A SeparationApplicationLog.
 */
@Entity
@Table(name = "separation_application_log")
public class SeparationApplicationLog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "edit_type", nullable = false)
    private EditType editType;

    @NotNull
    @Column(name = "date_edited", nullable = false)
    private LocalDate dateEdited;

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

    public EditType getEditType() {
        return editType;
    }

    public SeparationApplicationLog editType(EditType editType) {
        this.editType = editType;
        return this;
    }

    public void setEditType(EditType editType) {
        this.editType = editType;
    }

    public LocalDate getDateEdited() {
        return dateEdited;
    }

    public SeparationApplicationLog dateEdited(LocalDate dateEdited) {
        this.dateEdited = dateEdited;
        return this;
    }

    public void setDateEdited(LocalDate dateEdited) {
        this.dateEdited = dateEdited;
    }

    public Employee getEmployee() {
        return employee;
    }

    public SeparationApplicationLog employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public SeparationApplication getSeparationApplication() {
        return separationApplication;
    }

    public SeparationApplicationLog separationApplication(SeparationApplication separationApplication) {
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
        SeparationApplicationLog separationApplicationLog = (SeparationApplicationLog) o;
        if (separationApplicationLog.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), separationApplicationLog.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SeparationApplicationLog{" +
            "id=" + getId() +
            ", editType='" + getEditType() + "'" +
            ", dateEdited='" + getDateEdited() + "'" +
            "}";
    }
}
