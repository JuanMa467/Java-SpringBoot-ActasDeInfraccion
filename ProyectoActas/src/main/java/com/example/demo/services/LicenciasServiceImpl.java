package com.example.demo.services;

import com.example.demo.entities.Licencias;
import com.example.demo.repositories.LicenciasRepository;
import com.example.demo.repositories.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LicenciasServiceImpl extends BaseServiceImpl<Licencias, Long> implements LicenciasService {

    @Autowired
    private LicenciasRepository licenciasRepository;

    public LicenciasServiceImpl(BaseRepository<Licencias, Long> baseRepository) {
        super(baseRepository);
    }
}
