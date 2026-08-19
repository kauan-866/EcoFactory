EcoFactory

Sistema web Full Stack para monitoramento e gestão de processos de uma indústria inteligente.

📌 Sobre o projeto

A EcoFactory foi desenvolvida para centralizar informações importantes de uma indústria que anteriormente eram registradas em planilhas e documentos separados.

O sistema permite acompanhar máquinas, produção, consumo de recursos, indicadores de produtividade e sustentabilidade, além de registrar ocorrências relacionadas à saúde e segurança no trabalho.

O projeto foi desenvolvido como atividade do Curso Técnico em Informática para Internet, aplicando conceitos de desenvolvimento Full Stack, banco de dados, APIs, UI/UX, versionamento e testes.

🎯 Objetivo

Desenvolver uma aplicação web responsiva capaz de integrar Front-End, Back-End e banco de dados, facilitando o monitoramento dos processos industriais e apoiando a análise de indicadores.

⚙️ Funcionalidades

Funcionalidades obrigatórias

CRUD completo de máquinas;

Cadastro e consulta de produção;

Dashboard com indicadores básicos;

Persistência de dados no PostgreSQL;

Integração do Front-End com a API REST;

Validação dos principais formulários;

Documentação do projeto.

Funcionalidades complementares

Módulo de sustentabilidade;

Módulo de ocorrências de segurança;

Filtros e ordenação;

Gráficos e indicadores;

Autenticação de usuários;

Deploy da aplicação.

📊 Indicadores

O sistema pode apresentar indicadores como:

Quantidade total de produtos fabricados;

Produção por período;

Máquinas em funcionamento;

Máquinas paradas ou em manutenção;

Consumo de energia;

Consumo de água;

Indicadores de produtividade;

Indicadores de sustentabilidade;

Quantidade de ocorrências de segurança.

🏗️ Arquitetura

A aplicação utiliza uma arquitetura dividida em três partes principais:

┌─────────────────────┐
│      Front-End      │
│   React + Vite      │
└──────────┬──────────┘
           │ HTTP / REST
           ▼
┌─────────────────────┐
│       Back-End      │
│   Node.js + Express │
└──────────┬──────────┘
           │ SQL
           ▼
┌─────────────────────┐
│      PostgreSQL     │
│     Banco de Dados  │
└─────────────────────┘

🛠️ Tecnologias utilizadas

Front-End

HTML5

CSS3

JavaScript

React

Vite

Fetch API ou Axios

Back-End

Node.js

Express

Banco de dados

PostgreSQL

Testes

Vitest

React Testing Library

Jest

Supertest

Versionamento

Git

GitHub

Prototipação

Figma, Canva ou ferramenta equivalente

📁 Estrutura do projeto

A estrutura pode ser organizada da seguinte forma:

ecofactory/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── assets/
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── config/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── tests/
│
├── .gitignore
└── README.md

🗄️ Principais entidades

O banco de dados pode ser organizado com entidades como:

Máquinas — informações e situação dos equipamentos;

Produção — registros de produtos fabricados;

Consumo — dados de consumo de água e energia;

Ocorrências — registros relacionados à saúde e segurança;

Usuários — acesso ao sistema, caso a autenticação seja implementada.

🚀 Como executar o projeto

Pré-requisitos

Antes de iniciar, instale:

Node.js;

npm;

PostgreSQL;

Git.

1. Clonar o repositório

git clone URL_DO_REPOSITORIO
cd ecofactory

2. Instalar as dependências do Front-End

cd frontend
npm install

3. Instalar as dependências do Back-End

Em outro terminal:

cd backend
npm install

4. Configurar o banco de dados

Crie um banco PostgreSQL e execute o arquivo:

database/schema.sql

Caso exista um arquivo de dados iniciais:

database/seed.sql

5. Configurar as variáveis de ambiente

Crie um arquivo .env dentro da pasta backend:

PORT=3000
DATABASE_URL=sua_string_de_conexao

Não compartilhe informações sensíveis do arquivo .env no GitHub.

6. Iniciar o Back-End

cd backend
npm run dev

7. Iniciar o Front-End

Em outro terminal:

cd frontend
npm run dev

Depois, acesse o endereço informado pelo Vite no terminal.

🔌 API REST

A API será responsável pela comunicação entre o Front-End e o banco de dados.

Exemplos de endpoints:

Método

Endpoint

Função

GET

/api/maquinas

Listar máquinas

GET

/api/maquinas/:id

Consultar uma máquina

POST

/api/maquinas

Cadastrar máquina

PUT

/api/maquinas/:id

Atualizar máquina

DELETE

/api/maquinas/:id

Excluir máquina

GET

/api/producao

Consultar produção

POST

/api/producao

Registrar produção

GET

/api/indicadores

Consultar indicadores

GET

/api/ocorrencias

Consultar ocorrências

Os endpoints podem ser ajustados conforme a implementação final do projeto.

🧪 Testes

Para executar os testes, utilize os comandos definidos no package.json.

Exemplo:

npm test

Os testes devem verificar principalmente:

Componentes do Front-End;

Validação de formulários;

Rotas da API;

Operações CRUD;

Respostas da API;

Integração com o banco de dados, quando aplicável.

🔐 Segurança

Algumas boas práticas devem ser utilizadas durante o desenvolvimento:

Não enviar arquivos .env para o GitHub;

Validar dados recebidos pela API;

Utilizar consultas parametrizadas;

Validar formulários no Front-End e no Back-End;

Controlar permissões caso a autenticação seja implementada.

🌱 Sustentabilidade

O sistema permite acompanhar informações relacionadas ao uso de recursos naturais e gerar indicadores que auxiliem na identificação de oportunidades de melhoria.

Entre os dados monitorados estão:

Consumo de água;

Consumo de energia;

Produção;

Indicadores de sustentabilidade.

🦺 Saúde e segurança

O módulo de ocorrências permite registrar situações relacionadas à saúde e segurança no ambiente industrial.

Os registros podem conter informações como:

Data da ocorrência;

Local;

Descrição;

Tipo de ocorrência;

Nível de prioridade;

Situação;

Medidas tomadas.

🎨 UI/UX

A interface deve seguir princípios básicos de UI/UX, buscando:

Facilidade de navegação;

Organização das informações;

Responsividade;

Consistência visual;

Boa legibilidade;

Feedback para ações realizadas pelo usuário.

🌿 Versionamento

O projeto utiliza Git e GitHub para controle de versão e trabalho colaborativo.

Exemplos de commits:

feat: adiciona CRUD de máquinas
fix: corrige validação do cadastro
docs: atualiza README
style: ajusta responsividade do dashboard
test: adiciona testes da API de máquinas

👥 Equipe

Projeto: EcoFactory
Curso: Técnico em Informática para Internet
Área: Desenvolvimento Full Stack

Integrantes

Nome do integrante 1

Nome do integrante 2

Nome do integrante 3

Nome do integrante 4

📄 Licença

Projeto desenvolvido para fins educacionais no Curso Técnico em Informática para Internet.

EcoFactory — Tecnologia para uma indústria mais inteligente e sustentável. 🌱🏭# EcoFactory
