package com.WhatsUpDoc.PhDTracker.Services.DBFields;

public class UserFileSummary {

    public String userID;
    public String last_name;
    public String first_name;
    public String term_activation;
    public String phase1Summary;
    public String phase2Summary;
    public String phase3Summary;
    public String phase4Summary;

    public UserFileSummary(User user, String phase1Summary, String phase2Summary,
                           String phase3Summary, String phase4Summary) {
        this.userID = user.getUserID();
        this.last_name = user.getLast_name();
        this.first_name = user.getFirst_name();
        this.term_activation = user.getTerm_activation();
        this.phase1Summary = phase1Summary;
        this.phase2Summary = phase2Summary;
        this.phase3Summary = phase3Summary;
        this.phase4Summary = phase4Summary;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getTerm_activation() {
        return term_activation;
    }

    public void setTerm_activation(String term_activation) {
        this.term_activation = term_activation;
    }

    public String getPhase1Summary() {
        return phase1Summary;
    }

    public void setPhase1Summary(String phase1Summary) {
        this.phase1Summary = phase1Summary;
    }

    public String getPhase2Summary() {
        return phase2Summary;
    }

    public void setPhase2Summary(String phase2Summary) {
        this.phase2Summary = phase2Summary;
    }

    public String getPhase3Summary() {
        return phase3Summary;
    }

    public void setPhase3Summary(String phase3Summary) {
        this.phase3Summary = phase3Summary;
    }

    public String getPhase4Summary() {
        return phase4Summary;
    }

    public void setPhase4Summary(String phase4Summary) {
        this.phase4Summary = phase4Summary;
    }

}
