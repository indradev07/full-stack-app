package com.tvshows.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("dev")
public class H2DatabaseConfig {
    // No explicit configuration needed, just ensuring it loads only in dev mode
}
