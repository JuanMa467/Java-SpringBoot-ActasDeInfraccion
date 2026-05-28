package com.example.demo.config;

import com.example.demo.entities.TipoDeInfraccion;
import com.example.demo.repositories.TipoDeInfraccionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private TipoDeInfraccionRepository repository;

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() == 0) {
            repository.save(new TipoDeInfraccion("Exceso de velocidad", "GRAVE", 15000.0, 10.0));
            repository.save(new TipoDeInfraccion("Falta de seguro obligatorio", "MUY GRAVE", 25000.0, 15.0));
            repository.save(new TipoDeInfraccion("Sin luces bajas encendidas", "LEVE", 5000.0, 20.0));
            repository.save(new TipoDeInfraccion("Conducir sin cinturón de seguridad", "MODERADA", 8000.0, 15.0));
        }
    }
}
