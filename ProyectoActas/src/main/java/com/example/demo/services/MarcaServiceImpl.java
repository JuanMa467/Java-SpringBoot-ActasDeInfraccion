package com.example.demo.services;

import com.example.demo.entities.Marca;
import com.example.demo.repositories.MarcaRepository;
import com.example.demo.repositories.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MarcaServiceImpl extends BaseServiceImpl<Marca, Long> implements MarcaService {

    @Autowired
    private MarcaRepository marcaRepository;

    public MarcaServiceImpl(BaseRepository<Marca, Long> baseRepository) {
        super(baseRepository);
    }
}
