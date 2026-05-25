package com.example.demo.repositories;

import com.example.demo.entities.Infraccion;
import org.springframework.stereotype.Repository;

@Repository
public interface InfraccionRepository extends BaseRepository<Infraccion, Long> {
}
