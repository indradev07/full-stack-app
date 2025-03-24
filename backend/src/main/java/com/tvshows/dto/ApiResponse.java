package com.tvshows.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ApiResponse<T> {
    private String error;
    private String message;
    private LocalDateTime timestamp;
    private int status;
}
