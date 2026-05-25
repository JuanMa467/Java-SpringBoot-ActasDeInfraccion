package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ruta")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ruta extends Base {

    @Column(name = "nombre_ruta")
    private String nombreRuta;

    @Column(name = "km_ruta")
    private String kmRuta;

    @ManyToOne
    @JoinColumn(name = "tipo_ruta_id")
    private TipoRuta tipoRuta;

    public boolean esRutaInternacional() {
        return tipoRuta != null && tipoRuta.esInternacional();
    }

    public boolean esRutaNacional() {
        return tipoRuta != null && tipoRuta.esNacional();
    }

    public boolean esRutaProvincial() {
        return tipoRuta != null && tipoRuta.esProvincial();
    }
}
