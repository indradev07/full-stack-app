# Stage 1: Build the JAR using Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn clean package -DskipTests || true  # Pre-download dependencies

COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create a minimal runtime image
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

# Ensure resources are available (if needed outside the JAR)
COPY src/main/resources/tvtitles.txt /app/resources/tvtitles.txt
COPY src/main/resources/tvshows_backup.json /app/resources/tvshows_backup.json

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
