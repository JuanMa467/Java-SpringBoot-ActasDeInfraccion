package com.example.demo.services;

import com.example.demo.entities.AutoridadDeContatacion;
import com.example.demo.repositories.AutoridadDeContatacionRepository;
import com.example.demo.repositories.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AutoridadDeContatacionServiceImpl extends BaseServiceImpl<AutoridadDeContatacion, Long> implements AutoridadDeContatacionService {

    @Autowired
    private AutoridadDeContatacionRepository autoridadDeContatacionRepository;

    public AutoridadDeContatacionServiceImpl(BaseRepository<AutoridadDeContatacion, Long> baseRepository) {
        super(baseRepository);
    }
}
