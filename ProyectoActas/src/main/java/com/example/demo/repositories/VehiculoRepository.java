package com.example.demo.repositories;

import com.example.demo.entities.Vehiculo;
import org.springframework.stereotype.Repository;

@Repository
public interface VehiculoRepository extends BaseRepository<Vehiculo, Long> {
}
