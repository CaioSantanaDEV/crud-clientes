package com.csantana.clientes.dto;

import java.time.Instant;
import java.util.List;

public record ValidationError(Instant timestamp, Integer status, String error, String path, List<FieldMessage> Message) {

}
