package com.WhatsUpDoc.PhDTracker.Users;

import com.WhatsUpDoc.PhDTracker.Services.Exceptions.StudentAlreadyExistsException;
import com.WhatsUpDoc.PhDTracker.Services.Exceptions.StudentNotFoundException;
import com.WhatsUpDoc.PhDTracker.Services.FileTransfer.Functional.PrimaryFile;
import com.WhatsUpDoc.PhDTracker.Services.FileTransfer.Functional.FileStorageService;
import com.WhatsUpDoc.PhDTracker.Services.FileTransfer.Service.ResponseMessage;
import com.WhatsUpDoc.PhDTracker.Services.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path="/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FileStorageService storageService;

    // needs better understanding, likely needs to be in a webconfig class for use in below requests
    // and/or token storage (so constant logging in does not occur)
    @GetMapping
    public Map<String, Object> currentUser(OAuth2AuthenticationToken oAuth2AuthenticationToken) {
        return oAuth2AuthenticationToken.getPrincipal().getAttributes();
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
        Optional<User> oExistingUser = userRepository.findById(user.getUserID());
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

    // needs work and verify - does not track who uploads
    @PostMapping(value = "/{id}/upload", consumes = MediaType.TEXT_XML_VALUE)
    public @ResponseBody ResponseEntity<ResponseMessage> uploadFile(@RequestBody MultipartFile file, @PathVariable String id) {
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
    @GetMapping("/{id}/files")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        PrimaryFile primaryFile = storageService.getFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + primaryFile.getFilename() + "\"")
                .body(primaryFile.getData());
    }
}
