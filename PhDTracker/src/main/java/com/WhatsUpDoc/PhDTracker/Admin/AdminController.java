package com.WhatsUpDoc.PhDTracker.Admin;

import com.WhatsUpDoc.PhDTracker.Resources.FileUploadService;
import com.WhatsUpDoc.PhDTracker.Student.Student;
import com.WhatsUpDoc.PhDTracker.Student.StudentRepository;
import org.apache.tomcat.util.http.fileupload.FileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping(path="/admin")
public class AdminController {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private FileUploadService fileUploadService;


    // Updates student completion info
    // Also receives admin status updates
    @PutMapping(path="/updateStudent")
    public @ResponseBody String updateStudent(@RequestBody Student student) {
        studentRepository.findById(student.getStudentID());
        studentRepository.save(student);
        String response = student.getStudentID() + " updated";
        return response;
    }

    // returns individual student info
    @GetMapping(path="/studentInfo")
    public @ResponseBody Optional<Student> getStudent(@RequestBody Student student) {
        return studentRepository.findById(student.getStudentID());
    }

    // returns all student info
    @GetMapping(path="/allInfo")
    public @ResponseBody Iterable<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // creates new student, similar
    @PostMapping(path="/createStudent")
    public @ResponseBody String createStudent(@RequestBody Student student) {
        studentRepository.save(student);
        String response = studentRepository.findById(student.getStudentID()) + " created";
        return response;
    }

    @PostMapping(path="/upload")
    public void uploadFile(@RequestParam("file")MultipartFile file, Student student)
        throws IllegalStateException, IOException {
        fileUploadService.uploadFile(file, student);
    }
}
