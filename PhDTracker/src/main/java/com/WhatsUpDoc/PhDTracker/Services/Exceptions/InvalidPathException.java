package com.WhatsUpDoc.PhDTracker.Services.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidPathException extends RuntimeException{

    public InvalidPathException() {
        super("Invalid Path Sequence");
    }
}
