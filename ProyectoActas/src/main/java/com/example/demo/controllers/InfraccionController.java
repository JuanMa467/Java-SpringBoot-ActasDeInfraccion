package com.example.demo.controllers;

import com.example.demo.entities.Infraccion;
import com.example.demo.services.InfraccionServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/Infracciones")
public class InfraccionController extends BaseControllerImpl<Infraccion, InfraccionServiceImpl> {

}
