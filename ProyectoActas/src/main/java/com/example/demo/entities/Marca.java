package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "marca")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Marca extends Base {

    @Column(name = "marca_auto")
    private String marcaAuto;

    @ManyToOne
    @JoinColumn(name = "modelo_id")
    private Modelo modelo;

    public String queModelo() {
        return modelo != null ? modelo.getModeloAuto() : null;
    }
}
