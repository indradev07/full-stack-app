package com.tvshows.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tvshows.model.TvShow;
import com.tvshows.repository.TvShowRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TvShowService {
    private static final String API_URL = "http://api.tvmaze.com/singlesearch/shows?q=";
    private final TvShowRepository tvShowRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final ExecutorService executorService = Executors.newFixedThreadPool(10); // Parallel Processing

    public void loadTvShows() {
        try {
            List<String> titles = Files.readAllLines(Paths.get("src/main/resources/tvtitles.txt"));
            log.info("Loaded {} titles from tvtitles.txt", titles.size());

            titles.parallelStream().forEach(this::processTvShow);

        } catch (IOException e) {
            log.error("Error reading tvtitles.txt file", e);
        }
    }

    private void processTvShow(String title) {
        try {
            String response = restTemplate.getForObject(API_URL + title, String.class);
            JsonNode jsonNode = objectMapper.readTree(response);

            if (jsonNode == null || jsonNode.get("name") == null) {
                log.warn("No data found for: {}", title);
                return;
            }

            TvShow tvShow = TvShow.builder()
                .name(jsonNode.get("name").asText())
                .rating(jsonNode.has("rating") && jsonNode.get("rating").has("average") ? jsonNode.get("rating").get("average").asDouble() : null)
                .image(jsonNode.has("image") && jsonNode.get("image").has("medium") ? jsonNode.get("image").get("medium").asText() : null)
                .summary(jsonNode.has("summary") ? jsonNode.get("summary").asText() : "N/A")
                .language(jsonNode.has("language") ? jsonNode.get("language").asText() : "N/A")
                .webChannel(jsonNode.has("webChannel") ? jsonNode.get("webChannel").asText() : "N/A")
                .schedule(jsonNode.has("schedule") && jsonNode.get("schedule").has("time") ? jsonNode.get("schedule").get("time").asText() : "N/A")
                .status(jsonNode.get("status").asText())
                .showType(jsonNode.get("type").asText())
                .genres(jsonNode.has("genres") ? objectMapper.convertValue(jsonNode.get("genres"), List.class) : List.of())
                .episodesOrdered(jsonNode.has("weight") ? String.valueOf(jsonNode.get("weight").asInt()) : "N/A")
                .developedBy("N/A") // Placeholder as API doesn't provide this
                .officialSite(jsonNode.has("officialSite") ? jsonNode.get("officialSite").asText() : "N/A")
                .build();

            tvShowRepository.save(tvShow);
            log.info("TV Show '{}' saved successfully", tvShow.getName());

        } catch (Exception e) {
            log.error("Error fetching data for: {}", title, e);
        }
    }
}
