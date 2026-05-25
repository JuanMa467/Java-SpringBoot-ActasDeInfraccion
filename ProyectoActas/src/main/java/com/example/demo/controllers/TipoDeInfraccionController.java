package com.example.demo.controllers;

import com.example.demo.entities.TipoDeInfraccion;
import com.example.demo.services.TipoDeInfraccionServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/TiposDeInfraccion")
public class TipoDeInfraccionController extends BaseControllerImpl<TipoDeInfraccion, TipoDeInfraccionServiceImpl> {

}
