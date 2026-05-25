package com.example.demo.services;

import com.example.demo.entities.Vehiculo;
import com.example.demo.repositories.VehiculoRepository;
import com.example.demo.repositories.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VehiculoServiceImpl extends BaseServiceImpl<Vehiculo, Long> implements VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    public VehiculoServiceImpl(BaseRepository<Vehiculo, Long> baseRepository) {
        super(baseRepository);
    }
}
