package com.tvshows.controller;

import com.tvshows.exception.ResourceNotFoundException;
import com.tvshows.model.TvShow;
import com.tvshows.repository.TvShowRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tvshows")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TvShowController {
    private final TvShowRepository tvShowRepository;

    @GetMapping
    public ResponseEntity<List<TvShow>> getAllShows() {
        return ResponseEntity.ok(tvShowRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TvShow> getShowById(@PathVariable Long id) {
        TvShow tvShow = tvShowRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("TV Show with ID " + id + " not found"));
        return ResponseEntity.ok(tvShow);
    }
}
