package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vehiculo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vehiculo extends Base {

    @Column(name = "color")
    private String color;

    @Column(name = "dominio")
    private String dominio;

    @Column(name = "anio_patentamiento")
    private int anioPatentamiento;

    @ManyToOne
    @JoinColumn(name = "marca_id")
    private Marca marca;
}
