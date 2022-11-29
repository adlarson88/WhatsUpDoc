package com.WhatsUpDoc.PhDTracker.Services;

import com.WhatsUpDoc.PhDTracker.Services.DBFields.Files;
import com.WhatsUpDoc.PhDTracker.Services.DBFields.User;
import com.WhatsUpDoc.PhDTracker.Services.DBFields.UserFileSummary;
import com.WhatsUpDoc.PhDTracker.Services.Repositories.FileRepository;
import com.WhatsUpDoc.PhDTracker.Services.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserSummary {

    @Autowired
    FileRepository fileRepository;

    public Iterable<Files> userFiles(String userID) {
        return fileRepository.findAllByUserID(userID);
    }



    public int[] summarizeUserCompletedFiles(String userID) {
        Iterable<Files> filesIterable = userFiles(userID);

        Pattern patternPhase1 = Pattern.compile("phase1_[0-9]");
        Pattern patternPhase2 = Pattern.compile("phase2_[0-9]");
        Pattern patternPhase3 = Pattern.compile("phase3_[0-9]");
        Pattern patternPhase4 = Pattern.compile("phase4_[0-9]");

        int[] fileSummary = new int[4];

        for (Files file : filesIterable) {
            if(patternPhase1.matcher(file.getUploaded_as()).find()) {
                fileSummary[0] += 1;
            } else if (patternPhase2.matcher(file.getUploaded_as()).find()) {
                fileSummary[1] += 1;
            } else if (patternPhase3.matcher(file.getUploaded_as()).find()) {
                fileSummary[2] += 1;
            } else if (patternPhase4.matcher(file.getUploaded_as()).find()) {
                fileSummary[3] += 1;
            }
        }
        return fileSummary;
    }

    public String toJSONString(User user, int[] summary) {
        return "{" +
                "\"userID\":\"" + user.getUserID() +
                "\",\"first_name\":\"" + user.getFirst_name() +
                "\",\"last_name\":\"" + user.getLast_name() +
                "\",\"term_activation\":\"" + user.getTerm_activation() +
                "\",\"phase1Summary\":\"" + summary[0] +
                "\",\"phase2Summary\":\"" + summary[1] +
                "\",\"phase3Summary\":\"" + summary[2] +
                "\",\"phase4Summary\":\"" + summary[3] +
                "\"}";
    }

}
