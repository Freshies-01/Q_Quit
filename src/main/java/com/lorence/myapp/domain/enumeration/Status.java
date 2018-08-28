package com.lorence.myapp.domain.enumeration;

/**
 * The Status enumeration.
 */
public enum Status {
    
    PENDING(0, "Pending"),
    UNDER_REVIEW_FR(25, "Under Review"),
    EMPLOYEE_TASKS_IN_PROGRESS(50, "Employee Tasks In Progress"),
    EMPLOYEE_TASKS_COMPLETED(75, "Employee Tasks Complete"),
    CLOSED_BY_HR(100, "Closed By HR");

    private final int status;
    private final String name;
    Status(int status) { this.status = status; this.name = "";}
    Status(int status, String name) { this.status = status; this.name = name; }
    public int getValue() { return this.status; }
}
