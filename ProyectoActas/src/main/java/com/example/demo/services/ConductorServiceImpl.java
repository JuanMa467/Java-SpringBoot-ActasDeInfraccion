package com.example.demo.services;

import com.example.demo.entities.Conductor;
import com.example.demo.repositories.ConductorRepository;
import com.example.demo.repositories.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConductorServiceImpl extends BaseServiceImpl<Conductor, Long> implements ConductorService {

    @Autowired
    private ConductorRepository conductorRepository;

    public ConductorServiceImpl(BaseRepository<Conductor, Long> baseRepository) {
        super(baseRepository);
    }
}
