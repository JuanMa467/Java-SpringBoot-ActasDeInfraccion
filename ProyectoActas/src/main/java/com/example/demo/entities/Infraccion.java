package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "infraccion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Infraccion extends Base {

    @Column(name = "descrip_infraccion")
    private String descripInfraccion;

    @Column(name = "importe_infraccion")
    private double importeInfraccion;

    @ManyToMany
    @JoinTable(
        name = "infraccion_nomenclada",
        joinColumns = @JoinColumn(name = "infraccion_id"),
        inverseJoinColumns = @JoinColumn(name = "tipo_de_infraccion_id")
    )
    private List<TipoDeInfraccion> infraccionNomenclada = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "acta_id")
    private ActaDeContatacion acta;

    public List<TipoDeInfraccion> getTipoDeInfraccion() {
        return infraccionNomenclada;
    }

    public void addInfraccionNomenclada(TipoDeInfraccion tipo) {
        this.infraccionNomenclada.add(tipo);
    }

    public void removeInfraccionNomenclada(TipoDeInfraccion tipo) {
        this.infraccionNomenclada.remove(tipo);
    }
}
