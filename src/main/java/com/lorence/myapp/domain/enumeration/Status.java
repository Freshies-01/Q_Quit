package com.lorence.myapp.domain.enumeration;

/**
 * The Status enumeration.
 */
public enum Status {
    
    PENDING(0),
    UNDER_REVIEW_FR(25),
    EMPLOYEE_TASKS_IN_PROGRESS(50),
    EMPLOYEE_TASKS_COMPLETED(75),
    CLOSED_BY_HR(100);

    private final int status;
    Status(int status) { this.status = status; }
    public int getValue() { return this.status; }
}
