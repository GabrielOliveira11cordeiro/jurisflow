# JurisFlow

O JurisFlow é um sistema de gestão de fluxos de trabalho jurídicos, desenvolvido para auxiliar equipes no gerenciamento de clientes, casos judiciais, processos, diligências, alertas, notificações e permissões de usuário — tudo em uma única plataforma.

Este repositório contém tanto a API (backend) quanto a aplicação web (frontend).

## Visão Geral

O projeto está organizado em duas partes principais:

- `backend/` — API construída com Express, utilizando Sequelize e PostgreSQL
- `frontend/` — Aplicação desenvolvida em React, utilizando Vite

## Funcionalidades

- Gestão de clientes
- Cadastro e acompanhamento de casos
- Monitoramento de processos jurídicos
- Agendamento de diligências
- Alertas e notificações
- Perfis e permissões de usuário
- Histórico de atividades
- Painel (dashboard) para monitoramento operacional

## Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Sequelize CLI
- CORS

### Frontend
- React
- Vite
- React Router
- Axios
- Tailwind CSS

## Estrutura do Projeto

```text
jurisflow/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── server.js
│   │   └── ...
│   ├── .sequelizerc
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── README.md
├── .gitignore
└── ...
