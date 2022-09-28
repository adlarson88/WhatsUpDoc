package com.WhatsUpDoc.PhDTracker.Services.FileTransfer.Functional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.stream.Stream;

@Service
public class FileStorageService {
    @Autowired
    private FileDBRepository fileDBRepository;

    public PrimaryFile store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        PrimaryFile primaryFile = new PrimaryFile(fileName, file.getContentType(), file.getBytes());
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        primaryFile.setUploadTime(timestamp.toString());
        return fileDBRepository.save(primaryFile);
    }

    public PrimaryFile getFile(String id) {
        return fileDBRepository.findById(id).get();
    }

    public Stream<PrimaryFile> getAllFiles() {
        return fileDBRepository.findAll().stream();
    }
}
