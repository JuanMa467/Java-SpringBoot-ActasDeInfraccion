package com.example.demo.services;

import com.example.demo.entities.OrganizacionEstatal;
import com.example.demo.repositories.OrganizacionEstatalRepository;
import com.example.demo.repositories.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrganizacionEstatalServiceImpl extends BaseServiceImpl<OrganizacionEstatal, Long> implements OrganizacionEstatalService {

    @Autowired
    private OrganizacionEstatalRepository organizacionEstatalRepository;

    public OrganizacionEstatalServiceImpl(BaseRepository<OrganizacionEstatal, Long> baseRepository) {
        super(baseRepository);
    }
}
