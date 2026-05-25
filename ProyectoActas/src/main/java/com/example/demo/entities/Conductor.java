package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "conductor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Conductor extends Persona {

    @Column(name = "domicilio")
    private String domicilio;
}
