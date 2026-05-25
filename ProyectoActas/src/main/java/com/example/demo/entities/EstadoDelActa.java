package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "estado_del_acta")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EstadoDelActa extends Base {

    @Column(name = "descripcion_estado_acta")
    private String descripcionEstadoActa;

    @Column(name = "nombre_estado_acta")
    private String nombreEstadoActa;
}
