package com.tvshows.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tvshows.model.TvShow;
import com.tvshows.repository.TvShowRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.context.event.EventListener;
import org.springframework.boot.context.event.ApplicationReadyEvent;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TvShowService {
    private static final String API_URL = "http://api.tvmaze.com/singlesearch/shows?q=";
    private static final String BACKUP_FILE = "src/main/resources/tvshows_backup.json";
    private static final String TITLE_FILE = "src/main/resources/tvtitles.txt";

    private final TvShowRepository tvShowRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final ScheduledExecutorService executorService = Executors.newScheduledThreadPool(10);

    @Async
    @EventListener(ApplicationReadyEvent.class)
    public void loadTvShowsAsync() {
        log.info("Starting async TV Show data loading...");
        fetchAndStoreTvShows();
    }

    private void fetchAndStoreTvShows() {
        try {
            List<String> titles = Files.readAllLines(Paths.get(TITLE_FILE));
            log.info("Loaded {} titles from tvtitles.txt", titles.size());

            List<CompletableFuture<Void>> futures = titles.stream()
                .map(title -> CompletableFuture.runAsync(() -> processTvShow(title).ifPresent(tvShowRepository::save), executorService))
                .collect(Collectors.toList());

            CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
            log.info("All TV Shows processed successfully.");
        } catch (IOException e) {
            log.error("Error reading tvtitles.txt file", e);
        }
    }

    private Optional<TvShow> processTvShow(String title) {
        try {
            String response = restTemplate.getForObject(API_URL + title, String.class);
            JsonNode jsonNode = objectMapper.readTree(response);

            if (jsonNode == null || jsonNode.path("name").isMissingNode()) {
                log.warn("No data found for: {}", title);
                return Optional.empty();
            }

            TvShow tvShow = TvShow.builder()
                .name(jsonNode.path("name").asText())
                .rating(jsonNode.path("rating").path("average").asDouble(Double.NaN))
                .image(jsonNode.path("image").path("medium").asText(null))
                .summary(jsonNode.path("summary").asText("N/A"))
                .language(jsonNode.path("language").asText("N/A"))
                .webChannel(jsonNode.path("webChannel").asText("N/A"))
                .schedule(jsonNode.path("schedule").path("time").asText("N/A"))
                .status(jsonNode.path("status").asText("N/A"))
                .showType(jsonNode.path("type").asText("N/A"))
                .genres(objectMapper.convertValue(jsonNode.path("genres"), List.class))
                .episodesOrdered(jsonNode.path("weight").asText("N/A"))
                .developedBy("N/A")
                .officialSite(jsonNode.path("officialSite").asText("N/A"))
                .build();

            saveBackup(tvShow);
            return Optional.of(tvShow);

        } catch (Exception e) {
            log.error("Error fetching data for: {}", title, e);
            return Optional.empty();
        }
    }

    private void saveBackup(TvShow tvShow) {
        try {
            String json = objectMapper.writeValueAsString(tvShow);
            Files.write(Paths.get(BACKUP_FILE), (json + System.lineSeparator()).getBytes(), StandardOpenOption.CREATE, StandardOpenOption.APPEND);
        } catch (IOException e) {
            log.error("Error writing to backup file", e);
        }
    }
}
