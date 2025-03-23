package com.tvshows.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private String error;
    private String message;
    private LocalDateTime timestamp;
    private int status;
}
