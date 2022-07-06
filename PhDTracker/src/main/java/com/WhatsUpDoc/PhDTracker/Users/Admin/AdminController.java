package com.WhatsUpDoc.PhDTracker.Users.Admin;

import com.WhatsUpDoc.PhDTracker.Services.FileTransfer.Functional.FileDB;
import com.WhatsUpDoc.PhDTracker.Services.FileTransfer.Functional.FileStorageService;
import com.WhatsUpDoc.PhDTracker.Services.FileTransfer.Service.ResponseFile;
import com.WhatsUpDoc.PhDTracker.Services.FileTransfer.Service.ResponseMessage;
import com.WhatsUpDoc.PhDTracker.Users.Student.Student;
import com.WhatsUpDoc.PhDTracker.Users.Student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

    /*
        TODO: Add validation check for authenticated user access to limit usage
        TODO: @CrossOrigin at class level - search for refresher
     */

@RestController
@RequestMapping(path="/admin")
public class AdminController {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private FileStorageService storageService;

    // needs better understanding, likely needs to be in a webconfig class for use in below requests
    // and/or token storage (so constant logging in does not occur)
    @GetMapping
    public Map<String, Object> currentUser(OAuth2AuthenticationToken oAuth2AuthenticationToken) {
        return oAuth2AuthenticationToken.getPrincipal().getAttributes();
    }

    @PutMapping(path="/update")
    public @ResponseBody String updateStudent(@RequestBody Student student) {
        studentRepository.findById(student.getStudentID());
        studentRepository.save(student);
        return student.getStudentID() + " info updated";
    }

    @GetMapping(path="/info")
    public @ResponseBody Optional<Student> getStudent(@RequestBody Student student) {
        return studentRepository.findById(student.getStudentID());
    }

    @GetMapping(path="/allInfo")
    public @ResponseBody Iterable<Student> getAllStudentData() {
        return studentRepository.findAll();
    }

    // needs work and verify - does not track who upload
    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            storageService.store(file);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    // needs work and verify - may drop path variable and use @requestbody
    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        FileDB fileDB = storageService.getFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
                .body(fileDB.getData());
    }

    // needs work and verify
    @GetMapping("/files")
    public ResponseEntity<List<ResponseFile>> getListFiles() {
        List <ResponseFile> files = storageService.getAllFiles().map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/files/")
                    .path(dbFile.getId())
                    .toUriString();
            return new ResponseFile(
                    dbFile.getName(),
                    fileDownloadUri,
                    dbFile.getType(),
                    dbFile.getData().length);
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }
}
