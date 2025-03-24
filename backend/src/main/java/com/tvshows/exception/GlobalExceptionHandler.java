package com.tvshows.exception;

import com.tvshows.dto.ApiResponse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.LocalDateTime;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @SuppressWarnings("rawtypes")
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ApiResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        log.error("TV Show not found: {}", ex.getMessage());
        return buildResponse(ex.getMessage(), "Not Found", HttpStatus.NOT_FOUND);
    }

    @SuppressWarnings("rawtypes")
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ApiResponse> handleGlobalException(Exception ex) {
        log.error("Unhandled exception: {}", ex.getMessage(), ex);
        return buildResponse("Something went wrong. Please try again later.", "Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @SuppressWarnings("rawtypes")
    private ResponseEntity<ApiResponse> buildResponse(String message, String error, HttpStatus status) {
        ApiResponse<?> response = new ApiResponse<>(error, message, LocalDateTime.now(), status.value());
        return new ResponseEntity<>(response, status);
    }
}
