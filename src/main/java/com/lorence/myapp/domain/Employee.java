package com.lorence.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

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

    @ManyToOne
    @JsonIgnoreProperties("")
    private Location location;

    @OneToOne(mappedBy = "employee")
    @JsonIgnore
    private SeparationApplication separationApplication;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToOne(mappedBy = "employee")
    private HrReps hr;

    @OneToOne(mappedBy = "employee")
    @JsonIgnore
    private FunctionReps fr;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Department department;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public User getUser() {
        return user;
    }

    public Employee user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Department getDepartment() {
        return department;
    }

    public Employee department(Department department) {
        this.department = department;
        return this;
    }

    public void setDepartment(Department department) {
        this.department = department;
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
            "}";
    }
}
