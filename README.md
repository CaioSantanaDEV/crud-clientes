# Sistema de Gerenciamento de Clientes (CRUD Full Stack)

Aplicação para gerenciamento de clientes, desenvolvida com foco em arquitetura limpa, tratamento de exceções e experiência do usuário. O sistema integra um backend em Java/Spring Boot com um frontend em Angular.

---

### Tecnologias e Arquitetura

**Backend (Spring Boot 3):**
- Java 21 e Spring Data JPA.
- Banco de dados H2 para persistência em memória.
- Bean Validation para integridade de dados na camada de entrada.
- Global Exception Handling para respostas padronizadas em JSON.
- Padrão DTO (Data Transfer Object) para desacoplamento de camadas.

**Frontend (Angular 21):**
- Arquitetura baseada em Standalone Components.
- Consumo de API REST via HttpClient e RxJS.
- Gerenciamento de estado e detecção de mudanças manual (Change Detection).
- Sistema de temas dinâmicos (Dark/Light Mode) via CSS Variables.

---

### Demonstração Visual

#### Interface do Sistema
![ezgif-681a663d751e0b18](https://github.com/user-attachments/assets/f36c54d8-f53d-464b-a0fc-faecc51aa514)


#### Operações de CRUD e Busca
<p align="center">
  <a href="https://www.youtube.com/watch?v=7LMaUXeY_jk" target="_blank">
    <img src="https://img.youtube.com/vi/7LMaUXeY_jk/maxresdefault.jpg" alt="Demonstração do Sistema" width="100%">
  </a>
  <br>
  <sub>Clique acima para assistir à demonstração</sub>
</p>


### Funcionalidades Implementadas

- **Operações CRUD Completas:** Criação, leitura, atualização e exclusão de registros.
- **Busca por Identificador:** Localização de registros específicos com interface de resposta imediata.
- **Edição em Contexto:** Atualização de dados na mesma tela, otimizando o fluxo de trabalho.
- **Tratamento de Erros:** Captura e exibição de mensagens de erro detalhadas vindas do servidor (ex: validação de campos e erros de integridade).
- **Alternador de Temas:** Suporte a modo diurno e noturno com transição suave de cores.

---

### Instruções para Execução

**Requisitos:** Java 21 Node.js 24, Angular CLI.

1. **Servidor Backend:**
   - Importar o projeto Maven e executar a classe `ClientesApplication`.
   - A API estará disponível em `http://localhost:8080`.

2. **Interface Frontend:**
   - Navegar até o diretório do frontend.
   - Executar `npm install` seguido de `npm start`.
   - Acessar a aplicação em `http://localhost:4200`.

---

