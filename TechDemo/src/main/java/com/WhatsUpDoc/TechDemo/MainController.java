package com.WhatsUpDoc.TechDemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path="/student")
public class MainController {
    @Autowired
    private StudentRepository studentRepository;

    @PostMapping(path = "/add")
    public @ResponseBody String addNewStudent(@RequestBody Student student) {
        studentRepository.save(student);
        return "Created";
    }

    @PutMapping(path = "/update")
    public @ResponseBody String updateStudent(@RequestBody Student student) {
        studentRepository.findById(student.getStudentID());
        studentRepository.save(student);
        return "Updated";
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Student> getAllUsers() {
        return studentRepository.findAll();
    }

    @GetMapping(path="/{studentID}")
    public @ResponseBody Optional<Student> getStudent(@PathVariable String studentID) {
        return studentRepository.findById(studentID);
    }

    @DeleteMapping(path = "/delete")
    public @ResponseBody void deleteStudent(@RequestParam String studentID) {
        studentRepository.deleteById(studentID);
    }

}



