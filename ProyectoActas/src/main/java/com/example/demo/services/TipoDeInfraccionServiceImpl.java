package com.example.demo.services;

import com.example.demo.entities.TipoDeInfraccion;
import com.example.demo.repositories.TipoDeInfraccionRepository;
import com.example.demo.repositories.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TipoDeInfraccionServiceImpl extends BaseServiceImpl<TipoDeInfraccion, Long> implements TipoDeInfraccionService {

    @Autowired
    private TipoDeInfraccionRepository tipoDeInfraccionRepository;

    public TipoDeInfraccionServiceImpl(BaseRepository<TipoDeInfraccion, Long> baseRepository) {
        super(baseRepository);
    }
}
