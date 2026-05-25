package com.example.demo.controllers;

import com.example.demo.entities.ActaDeContatacion;
import com.example.demo.services.ActaDeContatacionServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/Actas")
public class ActaDeContatacionController extends BaseControllerImpl<ActaDeContatacion, ActaDeContatacionServiceImpl> {

}
