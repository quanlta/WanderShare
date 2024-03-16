package com.admin.admin.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@Data
@NoArgsConstructor
@Table(name = "roles")
public class Role {
    @Id
    @SequenceGenerator(name = "role_sequence",
        sequenceName = "role_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.AUTO,
            generator = "role_sequence"
    )
    private Long id;
    private String name;
    @ManyToMany(mappedBy = "roles")
    @Fetch(value = FetchMode.SELECT)
    @JsonIgnore
    private Set<Users> user = new HashSet<>();
    public Role(Long id, String name){
        this.id = id;
        this.name=name;
    }
    public Role(String name){
        this.name = name;
    }
}
