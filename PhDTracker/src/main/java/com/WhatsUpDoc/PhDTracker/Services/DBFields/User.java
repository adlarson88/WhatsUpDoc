package com.WhatsUpDoc.PhDTracker.Services.DBFields;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {

    @Id
    private String userID;
    private String first_name;
    private String last_name;
    private boolean admin;
    private String advisor;
    private String enrollment_status;
    private String term_activation;

    public User() {
    }

    public User(User user) {
        this.userID = user.getUserID();
        this.first_name = user.getFirst_name();
        this.last_name = user.getLast_name();
        this.admin = user.isAdmin();
        this.advisor = user.getAdvisor();
        this.enrollment_status = user.getEnrollment_status();
        this.term_activation = user.getTerm_activation();
    }

    public User copyFrom(User user) {
        this.userID = user.getUserID();
        this.first_name = user.getFirst_name();
        this.last_name = user.getLast_name();
        this.admin = user.isAdmin();
        this.advisor = user.getAdvisor();
        this.enrollment_status = user.getEnrollment_status();
        this.term_activation = user.getTerm_activation();
        return this;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public String getAdvisor() {
        return advisor;
    }

    public void setAdvisor(String advisor) {
        this.advisor = advisor;
    }

    public String getEnrollment_status() {
        return enrollment_status;
    }

    public void setEnrollment_status(String enrollment_status) {
        this.enrollment_status = enrollment_status;
    }

    public String getTerm_activation() {
        return term_activation;
    }

    public void setTerm_activation(String term_activation) {
        this.term_activation = term_activation;
    }
}
