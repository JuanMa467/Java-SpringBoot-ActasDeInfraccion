package com.example.demo.controllers;

import com.example.demo.entities.AutoridadDeContatacion;
import com.example.demo.services.AutoridadDeContatacionServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/Autoridades")
public class AutoridadDeContatacionController extends BaseControllerImpl<AutoridadDeContatacion, AutoridadDeContatacionServiceImpl> {

}
