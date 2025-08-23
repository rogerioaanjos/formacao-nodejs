// src/server.ts

import fastify from "fastify";
import cors from "@fastify/cors";
import fs from "fs";
import path from "path";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

// Servir index.html na raiz
server.get("/", async (req, reply) => {
  const filePath = path.join(__dirname, "../public/index.html");
  const html = fs.readFileSync(filePath, "utf-8");
  reply.type("text/html").send(html);
});

const teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom", worldChampionships: 8, firstGP: 1966, principal: "Andrea Stella" },
  { id: 3, name: "Mercedes", base: "Brackley, United Kingdom", worldChampionships: 8, firstGP: 1954, principal: "Toto Wolff" },
  { id: 4, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom", worldChampionships: 6, firstGP: 2005, principal: "Christian Horner" },
  { id: 5, name: "Ferrari", base: "Maranello, Italy", worldChampionships: 16, firstGP: 1950, principal: "Frédéric Vasseur" },
  { id: 6, name: "Alpine", base: "Enstone, United Kingdom", worldChampionships: 2, firstGP: 1976, principal: "Laurent Rossi" },
  { id: 7, name: "Aston Martin", base: "Silverstone, United Kingdom", worldChampionships: 1, firstGP: 1959, principal: "Mike Krack" },
  { id: 8, name: "Alfa Romeo Racing", base: "Hinwil, Switzerland", worldChampionships: 2, firstGP: 1950, principal: "Frédéric Vasseur" },
  { id: 9, name: "AlphaTauri", base: "Faenza, Italy", worldChampionships: 0, firstGP: 1985, principal: "Franz Tost" },
  { id: 10, name: "Williams", base: "Grove, United Kingdom", worldChampionships: 9, firstGP: 1977, principal: "Jost Capito" },
  { id: 11, name: "Haas", base: "Kannapolis, United States", worldChampionships: 0, firstGP: 2016, principal: "Guenther Steiner" },
  { id: 12, name: "Uralkali Haas F1 Team", base: "Banbury, United Kingdom", worldChampionships: 0, firstGP: 2021, principal: "Guenther Steiner" },
  { id: 13, name: "Scuderia Toro Rosso", base: "Faenza, Italy", worldChampionships: 0, firstGP: 2006, principal: "Franz Tost" },
];

const drivers = [
  { 
    id: 1,
    name: "Max Verstappen",
    team: "Red Bull Racing",
    nationality: "Dutch",
    championships: 2,
    wins: 35,
    podiums: 65,
    number: 1
  },
  { 
    id: 2,
    name: "Lewis Hamilton",
    team: "Mercedes",
    nationality: "British",
    championships: 7,
    wins: 103,
    podiums: 182,
    number: 44
  },
  { 
    id: 3,
    name: "Lando Norris",
    team: "McLaren",
    nationality: "British",
    championships: 0,
    wins: 0,
    podiums: 5,
    number: 4
  },
  { 
    id: 4,
    name: "Charles Leclerc",
    team: "Ferrari",
    nationality: "Monegasque",
    championships: 0,
    wins: 3,
    podiums: 18,
    number: 16
  },
  { 
    id: 5,
    name: "Carlos Sainz",
    team: "Ferrari",
    nationality: "Spanish",
    championships: 0,
    wins: 0,
    podiums: 8,
    number: 55
  },
  { 
    id: 6,
    name: "George Russell",
    team: "Mercedes",
    nationality: "British",
    championships: 0,
    wins: 1,
    podiums: 6,
    number: 63
  },
  { 
    id: 7,
    name: "Sergio Pérez",
    team: "Red Bull Racing",
    nationality: "Mexican",
    championships: 0,
    wins: 2,
    podiums: 21,
    number: 11
  },
  { 
    id: 8,
    name: "Esteban Ocon",
    team: "Alpine",
    nationality: "French",
    championships: 0,
    wins: 0,
    podiums: 2,
    number: 31
  },
  { 
    id: 9,
    name: "Fernando Alonso",
    team: "Alpine",
    nationality: "Spanish",
    championships: 2,
    wins: 32,
    podiums: 98,
    number: 14
  },
  { 
    id: 10,
    name: "Valtteri Bottas",
    team: "Alfa Romeo Racing",
    nationality: "Finnish",
    championships: 0,
    wins: 10,
    podiums: 67,
    number: 77
  },
];

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

interface DriverParams {
  id: string;
}

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    } else {
      response.type("application/json").code(200);
      return { driver };
    }
  }
);

server.listen({ port: 3333 }, () => {
  console.log("Server init");
});
