## 🆕 Novidades da Versão
  - CRUD de jogadores com persistência em JSON (src/data/players.json).
  - Atualizações parciais via PATCH para qualquer campo do jogador ou de statistics.
  - Ao inserir um novo jogador, gera id automaticamente.
  - DELETE retorna 204 se o jogador não existir.

## ✅ Exemplos de Endpoints

  Criar jogador: POST /api/players
```sh
  {
    "name": "Luka Modric",
    "club": "Real Madrid",
    "nationality": "Croatia",
    "position": "Midfielder",
    "statistics": {
      "Overall": 87,
      "Pace": 70,
      "Shooting": 80,
      "Passing": 91,
      "Dribbling": 88,
      "Defending": 72,
      "Physical": 75
    }
  }
```

- Listar todos os jogadores: GET /api/players
- Atualização parcial de jogador: PATCH /api/players/:id
```sh
  {
    "name": "Luka Modric A",
    "position": "Forward",
    "statistics": {
      "Overall": 90,
      "Pace": 80
    }  
  }
```

- Deletar jogador: DELETE /api/players/:id
- Listar clubes: GET /api/clubs

## 💾 Persistência
  - Funções utilitárias para leitura e escrita no JSON:
  - readDatabase() → lê todos os jogadores.
  - writeDatabase(players) → sobrescreve o JSON com os dados atualizados.

## 🛠 Serviços e Repositórios
  - findAndModifyPlayer suporta atualização parcial e merge de campos de statistics.
  - Todas as operações de CRUD atualizam o JSON de forma consistente.