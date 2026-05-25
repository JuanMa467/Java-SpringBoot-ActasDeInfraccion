package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tipo_de_infraccion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TipoDeInfraccion extends Base {

    @Column(name = "descr_infrac")
    private String descrInfrac;

    @Column(name = "tipo_gravedad")
    private String tipoGravedad;

    @Column(name = "importe_asignado_infrac")
    private double importeAsignadoInfrac;

    @Column(name = "porcentaje_descuento")
    private double porcentajeDescuento;

    public void infoTipoInfraccion() {
        System.out.println("Tipo: " + descrInfrac + " | Gravedad: " + tipoGravedad + " | Importe: " + importeAsignadoInfrac);
    }
}
