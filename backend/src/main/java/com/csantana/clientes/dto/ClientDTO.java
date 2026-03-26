package com.csantana.clientes.dto;
import com.csantana.clientes.entities.Client;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record ClientDTO(
        Long id,
        @NotBlank(message = "Nome não pode ser vazio")
        String name,
        @Size(min = 11, max = 11, message = "CPF deve ter exatamente 11 dígitos")
        String cpf,
        @Positive(message = "Renda deve ser um valor positivo")
        Double income,
        @PastOrPresent(message = "Data de nascimento não pode ser futura")
        LocalDate birthDate,
        Integer children) {

    public ClientDTO(Client entity) {
        this(entity.getId(), entity.getName(), entity.getCpf(), entity.getIncome(), entity.getBirthDate(), entity.getChildren());
    }
}
