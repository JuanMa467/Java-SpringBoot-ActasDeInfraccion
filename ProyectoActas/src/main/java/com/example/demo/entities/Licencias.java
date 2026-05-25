package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "licencias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Licencias extends Base {

    @Column(name = "fecha_de_vto")
    private LocalDate fechaDeVto;

    @Column(name = "puntos_iniciales_licencia")
    private int puntosInicialesLicencia;

    @OneToOne
    @JoinColumn(name = "conductor_id")
    private Conductor conductor;
}
