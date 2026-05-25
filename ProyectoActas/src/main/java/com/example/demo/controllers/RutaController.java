package com.example.demo.controllers;

import com.example.demo.entities.Ruta;
import com.example.demo.services.RutaServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/Rutas")
public class RutaController extends BaseControllerImpl<Ruta, RutaServiceImpl> {

}
