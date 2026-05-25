package com.example.demo.services;

import com.example.demo.entities.TipoRuta;
import com.example.demo.repositories.TipoRutaRepository;
import com.example.demo.repositories.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TipoRutaServiceImpl extends BaseServiceImpl<TipoRuta, Long> implements TipoRutaService {

    @Autowired
    private TipoRutaRepository tipoRutaRepository;

    public TipoRutaServiceImpl(BaseRepository<TipoRuta, Long> baseRepository) {
        super(baseRepository);
    }
}
