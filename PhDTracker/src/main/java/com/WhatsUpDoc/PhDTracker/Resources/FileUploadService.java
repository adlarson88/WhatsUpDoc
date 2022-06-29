package com.WhatsUpDoc.PhDTracker.Resources;

import com.WhatsUpDoc.PhDTracker.Student.Student;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class FileUploadService {
    public void uploadFile(MultipartFile file, Student student) throws IllegalStateException, IOException {
        file.transferTo(new File("~/"+student.getStudentID()+file.getOriginalFilename()));
    }
}
