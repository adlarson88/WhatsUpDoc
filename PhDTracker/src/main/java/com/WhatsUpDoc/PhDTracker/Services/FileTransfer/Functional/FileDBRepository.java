package com.WhatsUpDoc.PhDTracker.Services.FileTransfer.Functional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileDBRepository extends JpaRepository<PrimaryFile, String> {
}
