package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tipo_ruta")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TipoRuta extends Base {

    @Column(name = "desc_tipo_ruta")
    private String descTipoRuta;

    @Column(name = "nombre_tipo_de_ruta")
    private String nombreTipoDeRuta;

    public boolean esInternacional() {
        return "INTERNACIONAL".equalsIgnoreCase(nombreTipoDeRuta);
    }

    public boolean esNacional() {
        return "NACIONAL".equalsIgnoreCase(nombreTipoDeRuta);
    }

    public boolean esProvincial() {
        return "PROVINCIAL".equalsIgnoreCase(nombreTipoDeRuta);
    }
}
