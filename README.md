
# CRUD de Clientes - Spring Boot API

Este projeto consiste em uma API REST para o gerenciamento de clientes, desenvolvida com Java e Spring Boot. A aplicação implementa as operações fundamentais de um CRUD (Create, Read, Update, Delete), utilizando o padrão de camadas e transferência de dados via DTOs.

### Tecnologias Utilizadas

* Java 21
* Spring Boot 3
* Spring Data JPA
* H2 Database (Banco de dados em memória)
* Bean Validation (Jakarta Validation)
* Maven

### Funcionalidades Implementadas
* Listagem Paginada: Busca de registros com suporte a paginação e ordenação via parâmetros de URL.
* Busca por ID: Recuperação de dados de um cliente específico.
* Inserção e Atualização: Cadastro e edição de clientes com validação de campos obrigatórios e formatos de dados.
* Exclusão: Remoção de registros com verificação prévia de existência no banco de dados.
* Tratamento de Exceções Global: Respostas HTTP padronizadas em formato JSON para erros de validação (422), recurso não encontrado (404) e falhas de integridade (400).

### Estrutura da Solução
* Entities: Mapeamento objeto-relacional com JPA.
* Repositories: Interfaces de acesso ao banco de dados.
* Services: Camada de lógica de negócio e lançamento de exceções customizadas.
* Controllers: Exposição dos endpoints REST e manipulação de respostas HTTP.
* DTOs: Utilização de Java Records para transferência de dados entre as camadas.

### Como Executar o Projeto
1. Clone o repositório para sua máquina local.
2. Certifique-se de ter o JDK 21 instalado.
3. Execute a aplicação através da sua IDE ou via terminal com o comando: ./mvnw spring-boot:run.
4. A API estará disponível no endereço: http://localhost:8080/clients.
O console do banco de dados H2 pode ser acessado em: http://localhost:8080/h2-console (JDBC URL: jdbc:h2:mem:testdb).