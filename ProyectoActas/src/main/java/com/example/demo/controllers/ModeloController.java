package com.example.demo.controllers;

import com.example.demo.entities.Modelo;
import com.example.demo.services.ModeloServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/Modelos")
public class ModeloController extends BaseControllerImpl<Modelo, ModeloServiceImpl> {

}
