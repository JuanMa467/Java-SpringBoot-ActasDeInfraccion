FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Install Node.js and npm for frontend build step
RUN apk add --no-cache nodejs npm

# Copy project files
COPY . .

# Make gradlew executable and build the bootJar
RUN chmod +x ProyectoActas/gradlew && cd ProyectoActas && ./gradlew bootJar -x test

# Runtime Stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

COPY --from=build /app/ProyectoActas/build/libs/*.jar app.jar

EXPOSE 9000

ENTRYPOINT ["java", "-jar", "app.jar"]
