package com.WhatsUpDoc.TechDemo;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Student {
    @Id
    private String studentID;
    private String first_name;
    private String last_name;
    private boolean course_units;
    private boolean prof_dev_req;
    private boolean comp_written_exam;
    private boolean comp_oral_exam;
    private boolean research_paper;
    private boolean dissertation_committee;
    private boolean dissertation_prospectus;

    public String getStudentID() {
        return studentID;
    }

    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }

    public String getFirst_Name() {
        return first_name;
    }

    public void setFirst_name(String fName) {
        this.first_name = fName;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String lName) {
        this.last_name = lName;
    }

    public boolean isCourse_units() {
        return course_units;
    }

    public void setCourse_units(boolean course_units) {
        this.course_units = course_units;
    }

    public boolean isProf_dev_req() {
        return prof_dev_req;
    }

    public void setProf_dev_req(boolean prof_dev_req) {
        this.prof_dev_req = prof_dev_req;
    }

    public boolean isComp_written_exam() {
        return comp_written_exam;
    }

    public void setComp_written_exam(boolean comp_written_exam) {
        this.comp_written_exam = comp_written_exam;
    }

    public boolean isComp_oral_exam() {
        return comp_oral_exam;
    }

    public void setComp_oral_exam(boolean comp_oral_exam) {
        this.comp_oral_exam = comp_oral_exam;
    }

    public boolean isResearch_paper() {
        return research_paper;
    }

    public void setResearch_paper(boolean research_paper) {
        this.research_paper = research_paper;
    }

    public boolean isDissertation_committee() {
        return dissertation_committee;
    }

    public void setDissertation_committee(boolean dissertation_committee) {
        this.dissertation_committee = dissertation_committee;
    }

    public boolean isDissertation_prospectus() {
        return dissertation_prospectus;
    }

    public void setDissertation_prospectus(boolean dissertation_prospectus) {
        this.dissertation_prospectus = dissertation_prospectus;
    }
}
