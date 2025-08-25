// src/repositories/players-repository.ts

import { PlayerModel } from "../models/player-model";
import { StatisticsModel } from "../models/statistics-model";
import fs from "fs/promises";
import path from "path";

const filePath = path.resolve(__dirname, "../data/players.json");

// Lê todos os jogadores do JSON
const readDatabase = async (): Promise<PlayerModel[]> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    // Se o arquivo não existir, retorna array vazio
    return [];
  }
};

// Salva todos os jogadores no JSON
const writeDatabase = async (players: PlayerModel[]) => {
  await fs.writeFile(filePath, JSON.stringify(players, null, 2), "utf-8");
};

export const findAllPlayers = async (): Promise<PlayerModel[]> => {
  return readDatabase();
};

export const findPlayerById = async (id: number): Promise<PlayerModel | undefined> => {
  const players = await readDatabase();
  return players.find((player) => player.id === id);
};

export const insertPlayer = async (player: PlayerModel) => {
  const players = await readDatabase();

  const newId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;

  const newPlayer: PlayerModel = {
    id: newId,
    name: player.name,
    club: player.club,
    nationality: player.nationality,
    position: player.position,
    statistics: player.statistics
  };

  players.push(newPlayer);
  await writeDatabase(players);

  return newPlayer;
};

export const deleteOnePlayer = async (id: number): Promise<boolean> => {
  const players = await readDatabase();
  const index = players.findIndex((p) => p.id === id);

  if (index !== -1) {
    players.splice(index, 1);
    await writeDatabase(players);
    return true;
  }

  return false;
};

export const findAndModifyPlayer = async (
  id: number,
  updates: Partial<PlayerModel>
): Promise<PlayerModel | undefined> => {
  const players = await readDatabase();
  const playerIndex = players.findIndex((p) => p.id === id);

  if (playerIndex === -1) {
    return undefined;
  }

  players[playerIndex] = {
    ...players[playerIndex],
    ...updates,
    statistics: {
      ...players[playerIndex].statistics,
      ...(updates.statistics || {}),
    },
  };

  await writeDatabase(players);
  return players[playerIndex];
};

