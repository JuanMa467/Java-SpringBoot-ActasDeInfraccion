package com.example.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MenuController {

    @GetMapping("/")
    public String inicio(Model model) {
        return "index";
    }

    @GetMapping("/actas")
    public String actas(Model model) {
        return "actas";
    }

    @GetMapping("/actas/nueva")
    public String nuevaActa(Model model) {
        return "actas";
    }

    @GetMapping("/conductores")
    public String conductores(Model model) {
        return "conductores";
    }

    @GetMapping("/vehiculos")
    public String vehiculos(Model model) {
        return "vehiculos";
    }

    @GetMapping("/infracciones")
    public String infracciones(Model model) {
        return "infracciones";
    }

    @GetMapping("/rutas")
    public String rutas(Model model) {
        return "rutas";
    }

    @GetMapping("/marcas")
    public String marcas(Model model) {
        return "marcas";
    }

    @GetMapping("/modelos")
    public String modelos(Model model) {
        return "modelos";
    }

    @GetMapping("/licencias")
    public String licencias(Model model) {
        return "licencias";
    }

    @GetMapping("/organizaciones")
    public String organizaciones(Model model) {
        return "organizaciones";
    }

    @GetMapping("/autoridades")
    public String autoridades(Model model) {
        return "autoridades";
    }

    @GetMapping("/tipos-infraccion")
    public String tiposInfraccion(Model model) {
        return "tipos-infraccion";
    }

    @GetMapping("/tipos-ruta")
    public String tiposRuta(Model model) {
        return "tipos-ruta";
    }
}
