package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class Persona extends Base {

    @Column(name = "nombre")
    protected String nombre;

    @Column(name = "apellido")
    protected String apellido;

    @Column(name = "dni")
    protected int dni;

    @Column(name = "genero")
    protected String genero;
}
