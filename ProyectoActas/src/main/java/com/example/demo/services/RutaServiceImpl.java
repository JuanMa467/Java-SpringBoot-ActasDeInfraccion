package com.example.demo.services;

import com.example.demo.entities.Ruta;
import com.example.demo.repositories.RutaRepository;
import com.example.demo.repositories.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RutaServiceImpl extends BaseServiceImpl<Ruta, Long> implements RutaService {

    @Autowired
    private RutaRepository rutaRepository;

    public RutaServiceImpl(BaseRepository<Ruta, Long> baseRepository) {
        super(baseRepository);
    }
}
