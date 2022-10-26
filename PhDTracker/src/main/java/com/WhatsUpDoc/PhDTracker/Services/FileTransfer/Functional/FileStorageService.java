package com.WhatsUpDoc.PhDTracker.Services.FileTransfer.Functional;

import com.WhatsUpDoc.PhDTracker.Services.Exceptions.CannotStoreException;
import com.WhatsUpDoc.PhDTracker.Services.Exceptions.InvalidPathException;
import com.WhatsUpDoc.PhDTracker.Services.Exceptions.NoFilesFoundException;
import com.WhatsUpDoc.PhDTracker.Services.Repositories.FileRepository;
import com.WhatsUpDoc.PhDTracker.Services.DBFields.Files;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class FileStorageService {

    @Autowired
    private FileRepository fileRepository;

    public Files storeFile(MultipartFile file, String userID, String uploaded_as) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if(fileName.contains("..")) {
                throw new InvalidPathException();
            }

            SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy.HH:mm:ss");
            String timestamp = df.format(new Date());

            Files f = new Files(fileName, file.getContentType(), file.getBytes(), userID, uploaded_as, timestamp);
            return fileRepository.save(f);
        } catch (IOException e) {
            throw new CannotStoreException();
        }
    }

    public Files getFile(String fileId) {
        return fileRepository.findById(fileId)
                .orElseThrow(NoFilesFoundException::new);
    }

    // temp for testing
    public HttpStatus fileExists(String fileId) {
        if (fileRepository.existsByUploadID(fileId)) {
            return HttpStatus.OK;
        }
        return HttpStatus.NOT_FOUND;
    }
}
