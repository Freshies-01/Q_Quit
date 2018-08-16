package com.lorence.myapp.domain.enumeration;

/**
 * The Status enumeration.
 */
public enum Status {
     
    PENDING(1), 
    IN_PROGRESS(2),
    COMPLETED(3),
    CLOSED(4);

    private final int status;
    Status(int status) { this.status = status; }
    public int getValue() { return this.status; }
}
