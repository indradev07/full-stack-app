package com.tvshows.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tv_shows")
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

    @ElementCollection
    private List<String> genres;

    private String episodesOrdered;
    private String developedBy;
    private String officialSite;
}