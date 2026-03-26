package com.csantana.clientes.controllers.handlers;

import com.csantana.clientes.dto.CustomError;
import com.csantana.clientes.dto.FieldMessage;
import com.csantana.clientes.dto.ValidationError;
import com.csantana.clientes.services.exceptions.DatabaseException;
import com.csantana.clientes.services.exceptions.ResourceNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<CustomError> resourceNotFound(ResourceNotFoundException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        CustomError err = new CustomError(Instant.now(), status.value(), e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(DatabaseException.class)
    public ResponseEntity<CustomError> database(DatabaseException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        CustomError err = new CustomError(Instant.now(), status.value(), e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationError> validation(MethodArgumentNotValidException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;

        List<FieldMessage> fieldMessage = new ArrayList<>();


        for (org.springframework.validation.FieldError f : e.getBindingResult().getFieldErrors()) {
            fieldMessage.add(new FieldMessage(f.getField(), f.getDefaultMessage()));
        }

        ValidationError err = new ValidationError(Instant.now(), status.value(), "Dados inválidos", request.getRequestURI(), fieldMessage);

        return ResponseEntity.status(status).body(err);
    }
}
