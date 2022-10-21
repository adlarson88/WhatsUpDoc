package com.WhatsUpDoc.PhDTracker.Controllers;

import com.WhatsUpDoc.PhDTracker.Services.DBFields.Files;
import com.WhatsUpDoc.PhDTracker.Services.DBFields.User;
import com.WhatsUpDoc.PhDTracker.Services.Exceptions.StudentAlreadyExistsException;
import com.WhatsUpDoc.PhDTracker.Services.Exceptions.StudentNotFoundException;
import com.WhatsUpDoc.PhDTracker.Services.FileTransfer.Functional.FileStorageService;
import com.WhatsUpDoc.PhDTracker.Services.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path="/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FileStorageService fileStorageService;

//    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        return Collections.singletonMap("name", principal.getAttribute("name"));
    }

    @PostMapping(path="/create")
    public @ResponseBody User createUser(@RequestBody User user) {
    // additional admin check for usage
        // throw 403 if not admin
        Optional<User> optionalUser = userRepository.findById(user.getUserID());
        if (optionalUser.isEmpty()) {
            User newUser = new User(user);
            return userRepository.save(newUser);
        }
        throw new StudentAlreadyExistsException();
    }

    @PutMapping(path="/{id}/update")
    public @ResponseBody User updateUser(@RequestBody User user, @PathVariable String id) {
        // need additional class to allow person making update to make the update
        // googlewhateveraccessstuff.getuserid == path id
        // if userid!=pathid {
            // throw some 403 exception
        // }
        user.setUserID(id);
        Optional<User> oExistingUser = userRepository.findById(id);
        if (oExistingUser.isPresent()) {
            User existingUser = oExistingUser.get();
            existingUser.copyFrom(user);
            return userRepository.save(existingUser);
        }
        throw new StudentNotFoundException();
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAll() {
        // lock out students if admin status != true
        // else throw 403 exception
        return userRepository.findAll();
    }

    @GetMapping(path="/{id}/info")
    public @ResponseBody User getStudent(@PathVariable String id) {
        // same check as put or with spring goodness
        Optional<User> oExistingUser = userRepository.findById(id);
        if (oExistingUser.isPresent()) {
            return oExistingUser.get();
        }
        throw new StudentNotFoundException();
    }


    @PostMapping("/{id}/upload/{uploadAs}")
    public ResponseEntity<?> handleFileUpload( @RequestParam("file") MultipartFile file, @PathVariable String id,
                                               @PathVariable String uploadAs) {
        String fileName = file.getOriginalFilename();
        try {
            fileStorageService.storeFile(file, id, uploadAs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
        }
        return ResponseEntity.ok("File uploaded successfully.");
    }

    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        Files f = fileStorageService.getFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + f.getFilename() + "\"")
                .body(f.getData());
    }

    @GetMapping("/files/exists/{fileId}")
    public HttpStatus existingFile(@PathVariable String fileId) {
        return fileStorageService.fileExists(fileId);
    }

}
