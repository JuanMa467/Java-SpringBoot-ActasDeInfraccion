package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "organizacion_estatal")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrganizacionEstatal extends Base {

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "localidad")
    private String localidad;
}
