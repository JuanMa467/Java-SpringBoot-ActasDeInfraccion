package com.example.demo.repositories;

import com.example.demo.entities.Conductor;
import org.springframework.stereotype.Repository;

@Repository
public interface ConductorRepository extends BaseRepository<Conductor, Long> {
}
