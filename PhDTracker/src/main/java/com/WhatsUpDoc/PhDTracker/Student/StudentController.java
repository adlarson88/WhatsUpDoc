package com.WhatsUpDoc.PhDTracker.Student;

import com.WhatsUpDoc.PhDTracker.Resources.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping(path="/student")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private FileUploadService fileUploadService;

    @PutMapping(path="/updateStudent")
    public @ResponseBody String updateStudent(@RequestBody Student student) {
        studentRepository.findById(student.getStudentID());
        studentRepository.save(student);
        String response = student.getStudentID() + " updated";
        return response;
    }

    @GetMapping(path="/info")
    public @ResponseBody Optional<Student> getStudent(@RequestBody Student student) {
        return studentRepository.findById(student.getStudentID());
    }

    @PostMapping(path="/upload")
    public void uploadFile(@RequestParam("file")MultipartFile file, Student student)
        throws IllegalStateException, IOException {
        fileUploadService.uploadFile(file, student);
    }
}
