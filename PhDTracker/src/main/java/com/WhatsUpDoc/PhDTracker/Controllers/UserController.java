package com.WhatsUpDoc.PhDTracker.Controllers;

import com.WhatsUpDoc.PhDTracker.Services.DBFields.FilePopulationInfo;
import com.WhatsUpDoc.PhDTracker.Services.DBFields.Files;
import com.WhatsUpDoc.PhDTracker.Services.DBFields.User;
import com.WhatsUpDoc.PhDTracker.Services.DBFields.UserFileSummary;
import com.WhatsUpDoc.PhDTracker.Services.Emailer.EmailService;
import com.WhatsUpDoc.PhDTracker.Services.Exceptions.CannotStoreException;
import com.WhatsUpDoc.PhDTracker.Services.Exceptions.NoFilesFoundException;
import com.WhatsUpDoc.PhDTracker.Services.Exceptions.StudentAlreadyExistsException;
import com.WhatsUpDoc.PhDTracker.Services.Exceptions.StudentNotFoundException;
import com.WhatsUpDoc.PhDTracker.Services.FileTransfer.Functional.FileStorageService;
import com.WhatsUpDoc.PhDTracker.Services.Repositories.UserRepository;
import com.WhatsUpDoc.PhDTracker.Services.UserSummary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.regex.Pattern;

@RestController
@RequestMapping(path="/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FileStorageService fileStorageService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserSummary userSummary;

    @GetMapping
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        return Collections.singletonMap("name", principal.getAttribute("name"));
    }

    /**
     * Returns the user data that was submitted if successful
     * @param user JSON object that must be passed with "first_name", "last_name", and "userID" fields
     * @return new user data that's been saved to the database
     */
    @PostMapping(path="/create")
    public @ResponseBody User createUser(@RequestBody User user) {
    // additional admin check for usage
        // throw 403 if not admin
        Optional<User> optionalUser = userRepository.findById(user.getUserID());
        if (Pattern.compile("([a-z][a-z])[a-z]*[0-9]*").matcher(user.getUserID()).matches()) {
            if (optionalUser.isEmpty()) {
                User newUser = new User(user);
                return userRepository.save(newUser);
            }
            throw new StudentAlreadyExistsException();
        }
        throw new CannotStoreException();

    }

    /**
     * Returns updated user information if successful, 405 if unsuccessful
     * @param user - JSON object that must be passed with all user fields except userID:
     *             first_name, last_name, admin, advisor, enrollment_status
     * @param id - the userID of the user being updated
     * @return
     */
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

    @GetMapping(path="/all/summary")
    public @ResponseBody String getAllSummary() {
        Iterable<User> userIterable = userRepository.findAll();
        List JSONReturnString = new ArrayList<String>();
        for (User user : userIterable) {
            int[] tempUserSummary = userSummary.summarizeUserCompletedFiles(user.getUserID());
            String jsonString = userSummary.toJSONString(user, tempUserSummary);
            JSONReturnString.add(jsonString);
        }
        return JSONReturnString.toString();
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
        try {
            fileStorageService.removeIfExists(id, uploadAs);
            fileStorageService.storeFile(file, id, uploadAs);
//            ********************** uncomment for full release *************************
//            emailService.sendSimpleMail(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
        }
        return ResponseEntity.ok("File uploaded successfully.");
    }

    @DeleteMapping("/delete/{fileID}")
    public ResponseEntity<String> removeFile(@PathVariable String fileID) {
        if(fileStorageService.fileExists(fileID).isPresent()) {
            fileStorageService.removeFile(fileID);
            return ResponseEntity.ok("File removed");
        }
        throw new NoFilesFoundException();
    }


    // download
    @GetMapping("/files/{uploadID}")
    public ResponseEntity<byte[]> getFile(@PathVariable String uploadID) {
        Files f = fileStorageService.getFile(uploadID);
        Optional<Files> optionalFiles = fileStorageService.fileExists(uploadID);
        if(optionalFiles.isPresent()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + f.getFilename() + "\"")
                    .body(f.getData());
        }
        throw new NoFilesFoundException();
    }

    @GetMapping("/{id}/getFiles")
    public List<FilePopulationInfo> getUserFiles(@PathVariable String id) {
        Iterable<Files> iFiles = fileStorageService.getUserFiles(id);
        List<FilePopulationInfo> info = new ArrayList<>();
        for(Files files : iFiles) {
            FilePopulationInfo file = new FilePopulationInfo(files);
            info.add(file);
        }
        return info;
    }

    @DeleteMapping("/{id}/deleteStudent")
    public User deleteStudent(@PathVariable String id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()) {
            userRepository.deleteById(id);
            Iterable<Files> iFiles = fileStorageService.getUserFiles(id);
            for(Files files : iFiles) {
                fileStorageService.removeFile(files.getUploadID());
            }
            return optionalUser.get();
        }
        throw new StudentNotFoundException();
    }

    @GetMapping("/preview/{uploadID}")
    public String sendPreview(@PathVariable String uploadID) {
        Files previewFile = fileStorageService.getFile(uploadID);
        byte[] data = previewFile.getData();
        return Base64.getEncoder().encodeToString(data);
    }


}
