package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "autoridad_de_contatacion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AutoridadDeContatacion extends Persona {

    @Column(name = "id_placa")
    private int idPlaca;

    @Column(name = "id_legajo")
    private int idLegajo;
}
