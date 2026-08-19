#  EcoFactory

Sistema web para monitoramento e gestão de processos industriais, desenvolvido com foco em **indústria inteligente, produtividade e sustentabilidade**.

## 📌 Sobre o projeto

A **EcoFactory** foi criada para solucionar dificuldades encontradas no controle de informações industriais que normalmente são registradas em planilhas e documentos separados.

O sistema centraliza informações relacionadas a:

* 🏭 Máquinas utilizadas na produção;
* 📦 Quantidade de produtos fabricados;
* ⚡ Consumo de energia;
* 💧 Consumo de água;
* 🔧 Situação de funcionamento dos equipamentos;
* 🦺 Ocorrências relacionadas à saúde e segurança;
* 📊 Indicadores de produtividade e sustentabilidade.

## 🎯 Objetivo

Desenvolver uma aplicação web **Full Stack** capaz de integrar interface, API e banco de dados para facilitar o monitoramento dos processos industriais e auxiliar na tomada de decisões.

## 🚀 Funcionalidades

### Obrigatórias

* [ ] CRUD completo de máquinas;
* [ ] Cadastro de produção;
* [ ] Consulta de produção;
* [ ] Dashboard com indicadores;
* [ ] Persistência dos dados no PostgreSQL;
* [ ] Integração entre Front-End e API REST;
* [ ] Validação dos principais formulários;
* [ ] Documentação do projeto.

### Complementares

* [ ] Módulo de sustentabilidade;
* [ ] Módulo de ocorrências de segurança;
* [ ] Filtros e ordenação;
* [ ] Gráficos;
* [ ] Sistema de autenticação;
* [ ] Deploy da aplicação.

## 🛠️ Tecnologias

### Front-End

* HTML5
* CSS3
* JavaScript
* React
* Vite
* Fetch API ou Axios

### Back-End

* Node.js
* Express

### Banco de dados

* PostgreSQL

### Versionamento

* Git
* GitHub

### Testes

* Vitest
* React Testing Library
* Jest
* Supertest

### Prototipação

* Figma ou ferramenta equivalente

## 📂 Estrutura do projeto

```text
EcoFactory/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── database/
│   │   └── server.js
│   └── package.json
│
├── database/
│   └── schema.sql
│
├── tests/
│
├── .gitignore
└── README.md
```

## 🗄️ Banco de dados

O PostgreSQL será responsável pelo armazenamento das informações do sistema.

Principais tabelas previstas:

| Tabela        | Descrição                 |
| ------------- | ------------------------- |
| `usuarios`    | Usuários do sistema       |
| `maquinas`    | Informações das máquinas  |
| `producoes`   | Registros de produção     |
| `consumo`     | Consumo de água e energia |
| `ocorrencias` | Registros de segurança    |

## 🔄 Arquitetura

```text
┌──────────────────────┐
│      FRONT-END       │
│ React / HTML / CSS   │
│     JavaScript       │
└──────────┬───────────┘
           │
           │ HTTP / Fetch / Axios
           ▼
┌──────────────────────┐
│       API REST       │
│   Node.js + Express  │
└──────────┬───────────┘
           │
           │ SQL
           ▼
┌──────────────────────┐
│      PostgreSQL      │
│      Database        │
└──────────────────────┘
```

## 📊 Dashboard

O Dashboard será responsável por apresentar os principais indicadores da indústria.

Exemplos:

* Máquinas em funcionamento;
* Máquinas paradas;
* Produção total;
* Consumo de energia;
* Consumo de água;
* Quantidade de ocorrências;
* Indicadores de produtividade;
* Indicadores de sustentabilidade.

## ⚙️ Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/EcoFactory.git
```

### 2. Entrar na pasta

```bash
cd EcoFactory
```

### 3. Instalar as dependências do Front-End

```bash
cd frontend
npm install
```

### 4. Executar o Front-End

```bash
npm run dev
```

### 5. Instalar as dependências do Back-End

Em outro terminal:

```bash
cd backend
npm install
```

### 6. Executar o Back-End

```bash
npm run dev
```

## 🔐 Variáveis de ambiente

O Back-End deverá utilizar um arquivo `.env` para armazenar configurações do banco de dados e outras informações sensíveis.

Exemplo:

```env
PORT=3000
DATABASE_URL=sua_url_do_postgresql
```

> O arquivo `.env` não deve ser enviado para o GitHub.

## 🧪 Testes

Para executar os testes do projeto:

```bash
npm test
```

Os testes devem verificar principalmente:

* Funcionamento da API;
* Cadastro de máquinas;
* Atualização de máquinas;
* Exclusão de máquinas;
* Cadastro de produção;
* Validação dos formulários;
* Funcionamento dos componentes principais.

## 🌿 Sustentabilidade

A EcoFactory também possui como objetivo auxiliar no acompanhamento de indicadores ambientais.

O sistema poderá registrar:

* 💧 Consumo de água;
* ⚡ Consumo de energia;
* 📈 Evolução do consumo;
* ♻️ Indicadores de sustentabilidade.

## 🦺 Segurança

O módulo de segurança permitirá registrar ocorrências relacionadas ao ambiente industrial.

Exemplos de informações:

* Descrição da ocorrência;
* Data;
* Setor;
* Gravidade;
* Status;
* Observações.

## 👥 Público-alvo

O projeto é destinado principalmente a **estudantes do Curso Técnico em Informática para Internet**, servindo também como aplicação prática dos conhecimentos de:

* Desenvolvimento Web;
* Banco de Dados;
* APIs;
* UI/UX;
* Git e GitHub;
* Testes de software;
* Desenvolvimento Full Stack.

## 📚 Objetivos de aprendizagem

Durante o desenvolvimento serão aplicados conhecimentos de:

1. Planejamento de software;
2. UI/UX;
3. Desenvolvimento Front-End;
4. Desenvolvimento Back-End;
5. Criação de APIs REST;
6. Banco de dados relacionais;
7. Integração entre sistemas;
8. Versionamento com Git;
9. Testes automatizados;
10. Documentação técnica.

## 🤝 Desenvolvimento colaborativo

O projeto deverá utilizar o **Git e GitHub** para controlar as versões do código e permitir o desenvolvimento colaborativo.

Sugestão de branches:

```text
main
├── frontend
├── backend
├── database
└── tests
```

## 📄 Status do projeto

🚧 **Em desenvolvimento**

O projeto será desenvolvido de forma incremental, começando pelas funcionalidades obrigatórias e posteriormente adicionando os recursos complementares.

## 👨‍💻 Projeto acadêmico

**Projeto: EcoFactory — Indústria Inteligente**

Desenvolvido por estudantes do **Curso Técnico em Informática para Internet**.

<img width="1536" height="1024" alt="4c94d96e-599e-4446-a0ea-91debadb600e" src="https://github.com/user-attachments/assets/909c0063-e70d-4033-945f-2142a854eae9" />
![Uploading 4c94d96e-599e-4446-a0ea-91debadb600e.png…]()
