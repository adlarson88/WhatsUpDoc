package com.WhatsUpDoc.PhDTracker.Users;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {

    @Id
    private String userID;
    private String first_name;
    private String last_name;
    private boolean admin;

    public User() {
    }

    public User(User user) {
        this.userID = user.getUserID();
        this.first_name = user.getFirst_name();
        this.last_name = user.getLast_name();
        this.admin = user.isAdmin();
    }

    public User copyFrom(User user) {
        this.userID = user.getUserID();
        this.first_name = user.getFirst_name();
        this.last_name = user.getLast_name();
        this.admin = user.isAdmin();
        return this;
    }
    
    public String getUserID(){
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
}
