package com.WhatsUpDoc.PhDTracker.Services.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NoFilesFoundException extends RuntimeException {

    public NoFilesFoundException() {
        super("No Files Found");
    }

}
