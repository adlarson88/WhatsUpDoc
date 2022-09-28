package com.WhatsUpDoc.PhDTracker.Users;

import com.WhatsUpDoc.PhDTracker.Services.Exceptions.NoFilesFoundException;
import com.WhatsUpDoc.PhDTracker.Services.Exceptions.StudentNotFoundException;
import com.WhatsUpDoc.PhDTracker.Services.Repositories.PrimaryFilesRepository;
import com.WhatsUpDoc.PhDTracker.Services.Repositories.SecondaryFilesRepository;
import com.WhatsUpDoc.PhDTracker.Services.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path="/files")
public class FileController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    PrimaryFilesRepository primaryFilesRepository;
    @Autowired
    SecondaryFilesRepository secondaryFilesRepository;

    @GetMapping(path="/primary/all")
    public @ResponseBody Iterable<PrimaryFiles> getAll() {
        // limit !admin == true
        // 401/403
        return primaryFilesRepository.findAll();
    }

    @GetMapping(path="/{id}/primaryFiles")
    public @ResponseBody PrimaryFiles getStudentFiles(@PathVariable String id) {
        // 401/403 access
        Optional<User> optionalUser = userRepository.findById(id);
        Optional<PrimaryFiles> optionalPrimaryFiles = primaryFilesRepository.findById(id);
        if(optionalPrimaryFiles.isPresent() && optionalUser.isPresent()) {
            return optionalPrimaryFiles.get();
        } else if (optionalPrimaryFiles.isEmpty() && optionalUser.isPresent()) {
            throw new NoFilesFoundException();
        }
        throw new StudentNotFoundException();
    }

    @GetMapping(path="/secondary/all")
    public @ResponseBody Iterable<SecondaryFiles> getAllSecondaryFiles() {
        // 401/403 access
        return secondaryFilesRepository.findAll();
    }
}
