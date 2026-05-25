package com.example.demo.services;

import com.example.demo.entities.ActaDeContatacion;
import com.example.demo.repositories.ActaDeContatacionRepository;
import com.example.demo.repositories.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActaDeContatacionServiceImpl extends BaseServiceImpl<ActaDeContatacion, Long> implements ActaDeContatacionService {

    @Autowired
    private ActaDeContatacionRepository actaDeContatacionRepository;

    public ActaDeContatacionServiceImpl(BaseRepository<ActaDeContatacion, Long> baseRepository) {
        super(baseRepository);
    }
}
