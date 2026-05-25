package com.example.demo.controllers;

import com.example.demo.entities.Conductor;
import com.example.demo.services.ConductorServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/Conductores")
public class ConductorController extends BaseControllerImpl<Conductor, ConductorServiceImpl> {

}
