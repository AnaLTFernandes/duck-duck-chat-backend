# :duck: Duck, Duck, Chat Backend

# Índice

- [Sobre](#Sobre)
- [Rotas](#Rotas)
  - [Rotas não autenticadas:](#Rotas-não-autenticadas)
    - [Cadastro](#Cadastro)
    - [Login](#Login)
    - [Listar usuários](#Listar-usuários)
    - [Listar mensagens](#Listar-mensagens)
    - [Listar mensagens de um usuário](#Listar-mensagens-de-um-usuário)
  - [*Rotas autenticadas*:](#Rotas-autenticadas)
    - [Criar mensagem](#Criar-mensagem)
    - [Editar mensagem](#Editar-mensagem)
    - [Apagar mensagem](#Apagar-mensagem)
    - [Logout](#Logout)
- [Como rodar em desenvolvimento](#Como-rodar-em-desenvolvimento)
- [Como rodar os testes](#Como-rodar-os-testes)

<br/>

# Sobre
Backend do [Duck, Duck, Chat](https://github.com/AnaLTFernandes/duck-duck-chat-frontend), um simulador de chat.
<br/>
Esse projeto é uma POC que tem o intuito de centralizar algumas tecnologias e padrões que gostaria de testar.

<br/>

# Rotas
## Rotas não autenticadas

## Cadastro
- Rota: `/sign-up`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "username": "jorel",
    "email": "jorel07@gmail.com",
    "image": "https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2022/02/09/1388801198-irmaodojorel.jpg",
    "password": "123"
  }
  ```
<br />

## Login
- Rota: `/sign-in`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "email": "jorel07@gmail.com",
    "password": "123"
  }
  ```

- Exemplo de Resposta:

  ```json
  {
    "token": "pwoehfcnmçksh.dflkjskbckjl.jfoakspfoiwujknfcç",
    "username": "jorel",
    "image": "https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2022/02/09/1388801198-irmaodojorel.jpg"
  }
  ```
<br />

## Listar usuários
- Rota: `/users`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
      "id": 1,
      "username": "jorel",
      "image": "https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2022/02/09/1388801198-irmaodojorel.jpg"
    }
  ]
  ```
<br/>

## Listar mensagens
- Rota: `/messages`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
      "id": 1,
      "userId": 1,
      "text": "Oi, eu sou o Jorel :)",
      "date": "2023-01-15T22:21:06.601Z",
      "userImage": "https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2022/02/09/1388801198-irmaodojorel.jpg",
      "username": "jorel"
    }
  ]
  ```
<br/>

## Listar mensagens de um usuário
- Rota: `/messages/:userId`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
      "id": 1,
      "userId": 1,
      "text": "Oi, eu sou o Jorel :)",
      "date": "2023-01-15T22:21:06.601Z",
      "userImage": "https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2022/02/09/1388801198-irmaodojorel.jpg",
      "username": "jorel"
    }
  ]
  ```
<br/>

## Rotas autenticadas
- Enviar Header 'Authorization' no formato: `Bearer {token}`

## Criar mensagem
- Rota: `/messages`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "text": "Oi, eu sou o Jorel :)"
  }
  ```
<br/>

## Editar mensagem
- Rota: `/messages/:id`
- Método: `PUT`
- Exemplo de Body:

  ```json
  {
    "text": "Oi, eu sou o Jorel :)"
  }
  ```
<br/>

## Apagar mensagem
- Rota: `/messages/:id`
- Método: `DELETE`
<br/>

## Logout
- Rota: `/sign-out`
- Método: `POST`
<br/>

# Como rodar em desenvolvimento
**Atenção:** para rodar o projeto é preciso ter o PostgreSQL em sua máquina.

<br/>

1. Clone esse repositório:
>```bash
> git clone https://github.com/AnaLTFernandes/duck-duck-chat-backend.git
>```

2. Na raiz do projeto, instale as dependências:
>```bash
> npm install
>```

3. Crie um banco de dados PostgreSQL com o nome que desejar

4. Configure o arquivo `.env.development` usando como base o arquivo `.env.example`

5. Rode as migrations para criar as tabelas no banco de dados
>```bash
> npm run dev:migration:generate
>```

6. (opcional) Popule o banco de dados:
>```bash
> npm run seed
>```

7. Inicie o projeto:
>```bash
> npm run dev
>```

8. Instale e configure o [Frontend](https://github.com/AnaLTFernandes/duck-duck-chat-frontend/), ou divirta-se nas rotas usando de URL base: http://localhost:4000
<br/>

# Como rodar os testes
1. Siga os passos da seção [Como rodar em desenvolvimento](#Como-rodar-em-desenvolvimento)

2. Configure o arquivo `.env.test` usando como base o arquivo `.env.example`

3. Rode as migrations para criar as tabelas no banco de dados
>```bash
> npm run test:migration:generate
>```

4. Inicie os testes
>```bash
> npm run test
>```
