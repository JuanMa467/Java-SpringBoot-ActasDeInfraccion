package com.example.demo.services;

import com.example.demo.entities.Infraccion;
import com.example.demo.repositories.InfraccionRepository;
import com.example.demo.repositories.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InfraccionServiceImpl extends BaseServiceImpl<Infraccion, Long> implements InfraccionService {

    @Autowired
    private InfraccionRepository infraccionRepository;

    public InfraccionServiceImpl(BaseRepository<Infraccion, Long> baseRepository) {
        super(baseRepository);
    }
}
