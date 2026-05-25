package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "acta_de_contatacion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActaDeContatacion extends Base {

    @OneToMany(mappedBy = "acta", cascade = CascadeType.ALL)
    private List<Infraccion> infraccion = new ArrayList<>();

    @Column(name = "fecha_de_labrado")
    private LocalDate fechaDeLabrado;

    @Column(name = "fecha_vto_pago_volun")
    private LocalDate fechaVtoPagoVolun;

    @Column(name = "hora_del_labrado")
    private LocalDate horaDelLabrado;

    @Column(name = "lugar_de_constatacion")
    private String lugarDeConstatacion;

    @Column(name = "id_acta")
    private int idActa;

    @Column(name = "observaciones", length = 1500)
    private String observaciones;

    @ManyToOne
    @JoinColumn(name = "conductor_id")
    private Conductor conductor;

    @OneToOne
    @JoinColumn(name = "licencia_id")
    private Licencias licencia;

    @ManyToOne
    @JoinColumn(name = "ruta_id")
    private Ruta ruta;

    @OneToOne
    @JoinColumn(name = "organizacion_id")
    private OrganizacionEstatal organizacion;

    @OneToOne
    @JoinColumn(name = "autoridad_id")
    private AutoridadDeContatacion autoridad;

    @ManyToOne
    @JoinColumn(name = "estado_id")
    private EstadoDelActa estado;

    @OneToOne
    @JoinColumn(name = "vehiculo_id")
    private Vehiculo vehiculo;

    public void infoActaConstatacion() {
        System.out.println("Acta #" + idActa + " - Fecha: " + fechaDeLabrado + " - Estado: " + (estado != null ? estado.getNombreEstadoActa() : "N/A"));
    }
}
