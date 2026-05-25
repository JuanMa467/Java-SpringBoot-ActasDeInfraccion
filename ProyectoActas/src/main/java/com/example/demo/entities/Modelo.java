package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "modelo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Modelo extends Base {

    @Column(name = "modelo_auto")
    private String modeloAuto;
}
