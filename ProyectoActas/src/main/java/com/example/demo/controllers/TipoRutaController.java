package com.example.demo.controllers;

import com.example.demo.entities.TipoRuta;
import com.example.demo.services.TipoRutaServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/TiposDeRuta")
public class TipoRutaController extends BaseControllerImpl<TipoRuta, TipoRutaServiceImpl> {

}
