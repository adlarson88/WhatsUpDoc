package com.WhatsUpDoc.PhDTracker.Services.Repositories;

import com.WhatsUpDoc.PhDTracker.Services.DBFields.Files;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<Files, String> {

    boolean existsByUploadID(String uploadID);
}
