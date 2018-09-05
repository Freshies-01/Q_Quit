package com.lorence.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

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
    @Column(name = "date_edited", nullable = false)
    private LocalDate dateEdited;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "edit_type", nullable = false)
    private EditType editType;

    @Column(name = "edit_id")
    private Integer editId;

    @OneToOne
    @JoinColumn(unique = true)
    private SeparationApplication separationApplication;

    @OneToOne
    @JoinColumn(unique = true)
    private Employee employee;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Integer getEditId() {
        return editId;
    }

    public SepartationApplicationLog editId(Integer editId) {
        this.editId = editId;
        return this;
    }

    public void setEditId(Integer editId) {
        this.editId = editId;
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
            ", dateEdited='" + getDateEdited() + "'" +
            ", editType='" + getEditType() + "'" +
            ", editId=" + getEditId() +
            "}";
    }
}
