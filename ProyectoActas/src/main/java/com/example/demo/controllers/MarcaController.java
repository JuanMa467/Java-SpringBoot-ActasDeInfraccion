package com.example.demo.controllers;

import com.example.demo.entities.Marca;
import com.example.demo.services.MarcaServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/Marcas")
public class MarcaController extends BaseControllerImpl<Marca, MarcaServiceImpl> {

}
