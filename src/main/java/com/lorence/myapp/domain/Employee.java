package com.lorence.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Employee.
 */
@Entity
@Table(name = "employee")
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fname", nullable = false)
    private String fname;

    @NotNull
    @Column(name = "lname", nullable = false)
    private String lname;

    @ManyToOne
    @JsonIgnoreProperties("employees")
    private Location location;

    @OneToOne(mappedBy = "employee")
    @JsonIgnore
    private SeparationApplication separationApplication;

    @OneToOne(mappedBy = "employee")
    @JsonIgnore
    private HrReps hr;

    @OneToOne(mappedBy = "employee")
    @JsonIgnore
    private FunctionReps fr;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public Employee fname(String fname) {
        this.fname = fname;
        return this;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public Employee lname(String lname) {
        this.lname = lname;
        return this;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public Location getLocation() {
        return location;
    }

    public Employee location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public SeparationApplication getSeparationApplication() {
        return separationApplication;
    }

    public Employee separationApplication(SeparationApplication separationApplication) {
        this.separationApplication = separationApplication;
        return this;
    }

    public void setSeparationApplication(SeparationApplication separationApplication) {
        this.separationApplication = separationApplication;
    }

    public HrReps getHr() {
        return hr;
    }

    public Employee hr(HrReps hrReps) {
        this.hr = hrReps;
        return this;
    }

    public void setHr(HrReps hrReps) {
        this.hr = hrReps;
    }

    public FunctionReps getFr() {
        return fr;
    }

    public Employee fr(FunctionReps functionReps) {
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
        Employee employee = (Employee) o;
        if (employee.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employee.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", fname='" + getFname() + "'" +
            ", lname='" + getLname() + "'" +
            "}";
    }
}
