package com.example.demo.repositories;

import com.example.demo.entities.Marca;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcaRepository extends BaseRepository<Marca, Long> {
}
