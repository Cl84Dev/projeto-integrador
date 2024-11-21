# 💳 Banco Integrador

**Banco Integrador** é uma aplicação desenvolvida como parte do **Projeto Integrador** do curso de **Análise e Desenvolvimento de Sistemas** na **UniDomBosco**.  
Este projeto tem como objetivo simular o fluxo de controle de uma conta bancária, proporcionando uma experiência completa e funcional.

## 🌟 Funcionalidades

- **Criação de Conta**: Cadastre-se para criar sua conta bancária.
- **Login Seguro**: Acesse sua conta com credenciais protegidas.
- **Transferências**: Realize transferências para outras contas cadastradas.
- **Contas a Pagar**: Registre contas pendentes e faça seus pagamentos diretamente pelo sistema.

## 🛠️ Tecnologias

O projeto utiliza as seguintes tecnologias:

- **Frontend**: [Vue.js](https://vuejs.org/)
- **Backend**: [Express.js](https://expressjs.com/)
- **Banco de Dados**: [MySQL](https://www.mysql.com/)
- **Containerização**: [Docker Compose](https://docs.docker.com/compose/)

## 🌐 Ambiente de Desenvolvimento

- A aplicação de desenvolvimento está configurada para ser acessada na porta `3000`.
- Todo o ambiente pode ser inicializado facilmente utilizando **Docker Compose**.

## 🚀 Como Executar o Projeto

Siga as etapas abaixo para rodar o **Banco Integrador**:

1. **Certifique-se de ter os pré-requisitos instalados:**

   - [Docker](https://www.docker.com/)
   - [Docker Compose](https://docs.docker.com/compose/install/)

2. **Clone este repositório:**

   ```bash
   git clone https://github.com/seu-usuario/banco-integrador.git
   cd banco-integrador
   ```

3. **Inicie o Docker Compose:**

   ```bash
   docker-compose up --build
   ```

4. **Acesse a aplicação:**
   - Acesse o frontend em `http://localhost:3000`.
