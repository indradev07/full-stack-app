package com.tvshows.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tv_shows")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TvShow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double rating;
    private String image;
    private String language;
    
    @Column(columnDefinition = "TEXT")
    private String summary;

    private String webChannel;
    private String schedule;
    private String status;
    private String showType;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "tv_show_genres", joinColumns = @JoinColumn(name = "tv_show_id"))
    @Column(name = "genre")
    private List<String> genres;

    private String episodesOrdered;
    private String developedBy;
    private String officialSite;
}
