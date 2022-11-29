package com.WhatsUpDoc.PhDTracker.Services.DBFields;

public class FilePopulationInfo {

    private String uploadID;
    private String uploaded_as;
    private String uploadTime;

    public FilePopulationInfo(Files file) {
        uploadID = file.getUploadID();
        uploaded_as = file.getUploaded_as();
        uploadTime = file.getUploadTime();
    }

    public String getUploadID() {
        return uploadID;
    }

    public String getUploaded_as() {
        return uploaded_as;
    }

    public String getUploadTime() {
        return uploadTime;
    }
}
