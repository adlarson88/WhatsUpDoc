package com.WhatsUpDoc.PhDTracker.Services.Repositories;

import com.WhatsUpDoc.PhDTracker.Services.DBFields.Files;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FileRepository extends JpaRepository<Files, String> {

    Iterable<Files> findAllByUserID(String userID);
}
