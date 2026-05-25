package com.example.demo.controllers;

import com.example.demo.entities.Vehiculo;
import com.example.demo.services.VehiculoServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/Vehiculos")
public class VehiculoController extends BaseControllerImpl<Vehiculo, VehiculoServiceImpl> {

}
