package com.example.demo.controllers;

import com.example.demo.entities.Licencias;
import com.example.demo.services.LicenciasServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/Licencias")
public class LicenciasController extends BaseControllerImpl<Licencias, LicenciasServiceImpl> {

}
