package com.tvshows.controller;

import com.tvshows.model.TvShow;
import com.tvshows.repository.TvShowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tvshows")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://example.com"})
public class TvShowController {
    private final TvShowRepository tvShowRepository;

    @GetMapping
    public List<TvShow> getAllShows() {
        return tvShowRepository.findAll();
    }

    @GetMapping("/{id}")
    public TvShow getShowById(@PathVariable Long id) {
        return tvShowRepository.findById(id).orElseThrow(() -> new RuntimeException("TV Show not found"));
    }
}
