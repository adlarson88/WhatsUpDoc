package com.WhatsUpDoc.PhDTracker.Services.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class StudentAlreadyExistsException extends RuntimeException {

    public StudentAlreadyExistsException() {
        super("Student Already Exists");
    }
}
