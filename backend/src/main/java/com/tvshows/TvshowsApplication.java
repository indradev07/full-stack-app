package com.tvshows;

import com.tvshows.service.TvShowService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class TvshowsApplication implements CommandLineRunner {

    private final TvShowService tvShowService;

    public static void main(String[] args) {
        SpringApplication.run(TvshowsApplication.class, args);
    }

    @Override
    public void run(String... args) {
        tvShowService.loadTvShows();
    }
}
