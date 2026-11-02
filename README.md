# API de Controle Financeiro Pessoal (ODS 1 e ODS 12)

API RESTful desenvolvida com **NestJS** e **MongoDB** (`@nestjs/mongoose`), atuando como motor para um aplicativo de Controle Financeiro Pessoal voltado ao letramento financeiro comunitário, prevenção ao superendividamento (**ODS 1 - Erradicação da Pobreza**) e incentivo ao consumo consciente (**ODS 12 - Consumo e Produção Responsáveis**).

## Tecnologias Utilizadas

- **Node.js** & **TypeScript**
- **NestJS** (`@nestjs/core`, `@nestjs/common`, `@nestjs/mongoose`)
- **MongoDB** & **Mongoose**
- **Docker Compose** (container local do MongoDB)

## Como executar o projeto

### 1. Subir o banco de dados MongoDB (Docker Compose)
```bash
docker compose up -d
```
*(Alternativamente, defina a variável de ambiente `MONGODB_URI` com sua connection string do MongoDB Atlas).*

### 2. Instalar dependências e iniciar a API
```bash
npm install
npm run start:dev
```
A API estará disponível em `http://localhost:3000`.

## Endpoints da API

### `POST /transacoes`
Cadastra uma nova receita ou despesa.

**Exemplo de Payload (Despesa Essencial / Consciente):**
```json
{
  "descricao": "Conta de Luz",
  "valor": 180.50,
  "tipo": "despesa",
  "categoria": "Moradia",
  "consumoConsciente": true
}
```

**Exemplo de Payload (Gasto por Impulso - ODS 12):**
```json
{
  "descricao": "Compra de Roupas não planejada",
  "valor": 250.00,
  "tipo": "despesa",
  "categoria": "Lazer",
  "consumoConsciente": false
}
```

### `GET /transacoes`
Retorna o histórico completo de transações e as métricas consolidadas pelo `TransacoesService`:

```json
{
  "historico": [...],
  "metricas": {
    "saldoTotal": 2569.5,
    "totalDespesas": 430.5,
    "totalGastoImpulso": 250
  }
}
```
