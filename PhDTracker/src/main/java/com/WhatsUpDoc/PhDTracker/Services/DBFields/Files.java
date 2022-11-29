package com.WhatsUpDoc.PhDTracker.Services.DBFields;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name="files")
public class Files {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    String uploadID;
    private String filename;
    private String filetype;
    @Lob
    private byte[] data;
    private String uploadTime;
    @Column(name="userID")
    private String userID;
    private String uploaded_as;

    public Files() {
    }

    public Files(String filename, String filetype, byte[] data) {
        this.filename = filename;
        this.filetype = filetype;
        this.data = data;
    }

    public Files(Files files) {
        this.uploadID = files.getUploadID();
        this.filename = files.getFilename();
        this.filetype = files.getFiletype();
        this.userID = files.getUserID();
        this.uploaded_as = files.getUploaded_as();
    }

    public Files(String filename, String filetype, byte[] data, String userID, String uploaded_as, String uploadTime) {
        this.filename = filename;
        this.filetype = filetype;
        this.data = data;
        this.userID = userID;
        this.uploaded_as = uploaded_as;
        this.uploadTime = uploadTime;
    }

    public String getUploadID() {
        return uploadID;
    }

    public void setUploadID(String uploadID) {
        this.uploadID = uploadID;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getFiletype() {
        return filetype;
    }

    public void setFiletype(String filetype) {
        this.filetype = filetype;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(String uploadTime) {
        this.uploadTime = uploadTime;
    }

    public String getUploaded_as() {
        return uploaded_as;
    }

    public void setUploaded_as(String uploaded_as) {
        this.uploaded_as = uploaded_as;
    }


}
