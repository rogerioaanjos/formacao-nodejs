const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

const player3 = {
  NOME: "Peach",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 2,
  PONTOS: 0,
};

const player4 = {
  NOME: "Yoshi",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 4,
  PODER: 3,
  PONTOS: 0,
};

const player5 = {
  NOME: "Bowser",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};

const player6 = {
  NOME: "Donkey Kong",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2, character3, character4, character5, character6) {
  const characters = [character1, character2, character3, character4, character5, character6];

  // Array de Emojis
  const victoryEmojis = ['🚀', '😁', '🎉', '🏆', '😎'];
  const sadEmojis = ['😢', '😞', '💔', '😨', '😭'];
  const mehEmojis = ['😒', '😐', '🙄', '😶'];

  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();

    // Rolar dados para todos os personagens
    let diceResults = [];
    for (let i = 0; i < characters.length; i++) {
      diceResults.push(await rollDice());
    }

    if (block === "RETA") {
      console.log(`Bloco: ${block}`);

      for (let i = 0; i < characters.length; i++) {
        await logRollResult(characters[i].NOME, "velocidade", diceResults[i], characters[i].VELOCIDADE);
      }

      const results = characters.map((p, i) => ({
        personagem: p,
        dado: diceResults[i],
        atributo: p.VELOCIDADE,
        resultado: diceResults[i] + p.VELOCIDADE
      }));

      const highest = Math.max(...results.map(r => r.resultado));
      const winners = results.filter(r => r.resultado === highest);

      if (winners.length > 1) {
        winners.forEach(w => w.personagem.PONTOS++);
        console.log(`⚖️ Empate na reta! ${formatNamesWithAnd(winners.map(w => w.personagem.NOME))} ganharam 1 ponto cada.`);
      } else {
        winners[0].personagem.PONTOS++;
        const randomVictoryEmoji = victoryEmojis[Math.floor(Math.random() * victoryEmojis.length)];
        console.log(`🏁 ${winners[0].personagem.NOME} venceu a reta e marcou 1 ponto! ${randomVictoryEmoji}`);
      }
    }
    else if (block === "CURVA") {
      console.log(`Bloco: ${block}`);

      for (let i = 0; i < characters.length; i++) {
        await logRollResult(characters[i].NOME, "manobrabilidade", diceResults[i], characters[i].MANOBRABILIDADE);
      }

      const results = characters.map((p, i) => ({
        personagem: p,
        dado: diceResults[i],
        atributo: p.MANOBRABILIDADE,
        resultado: diceResults[i] + p.MANOBRABILIDADE
      }));

      const highest = Math.max(...results.map(r => r.resultado));
      const winners = results.filter(r => r.resultado === highest);

      if (winners.length > 1) {
        winners.forEach(w => w.personagem.PONTOS++);
        console.log(`⚖️ Empate na curva! ${formatNamesWithAnd(winners.map(w => w.personagem.NOME))} ganharam 1 ponto cada.`);
      } else {
        winners[0].personagem.PONTOS++;
        const randomVictoryEmoji = victoryEmojis[Math.floor(Math.random() * victoryEmojis.length)];
        console.log(`🏆 ${winners[0].personagem.NOME} venceu a curva e marcou 1 ponto! ${randomVictoryEmoji}`);
      }
    }
    else if (block === "CONFRONTO") {
      console.log(`Bloco: ${block}`);
      console.log(`Todos os adversários se confrontaram! 🥊`);

      // Mostrar os dados rolados
      for (let i = 0; i < characters.length; i++) {
        await logRollResult(characters[i].NOME, "poder", diceResults[i], characters[i].PODER);
      }

      // Mapear resultados
      const results = characters.map((p, i) => ({
        personagem: p,
        dado: diceResults[i],
        atributo: p.PODER,
        resultado: diceResults[i] + p.PODER
      }));

      // Determinar maior pontuação (vencedores)
      const highest = Math.max(...results.map(r => r.resultado));
      const winners = results.filter(r => r.resultado === highest);
      const losers = results.filter(r => r.resultado < highest);

      // Mostrar vencedores
      if (winners.length === 1) {
        console.log(`🏆 ${winners[0].personagem.NOME} ganhou o confronto!`);

        // Sortear se ganha turbo (+1 ponto) aleatoriamente
        if (Math.random() < 0.5) {
          winners[0].personagem.PONTOS++;
          const randomVictoryEmoji = victoryEmojis[Math.floor(Math.random() * victoryEmojis.length)];
          console.log(`⚡️ ${winners[0].personagem.NOME} ganhou um turbo e recebeu +1 ponto! ${randomVictoryEmoji}`);
        } else {
          const randomMehEmoji = mehEmojis[Math.floor(Math.random() * mehEmojis.length)];
          console.log(`⚡️ ${winners[0].personagem.NOME} tentou ativar o turbo, mas não teve sorte. ${randomMehEmoji}`);
        }
      } else {
        const winnerNames = winners.map(w => w.personagem.NOME);
        console.log(`🏆 Empate no confronto entre: ${formatNamesWithAnd(winnerNames)}`);
        const turboWinner = winners[Math.floor(Math.random() * winners.length)];
        turboWinner.personagem.PONTOS++;
        const randomVictoryEmoji = victoryEmojis[Math.floor(Math.random() * victoryEmojis.length)]
        console.log(`⚡️ ${turboWinner.personagem.NOME} ganhou o turbo sortudo e recebeu +1 ponto! ${randomVictoryEmoji}`);
      }

      // Aplicar penalidade e mostrar o que aconteceu com os demais
      losers.forEach(p => {
        const isShell = Math.random() < 0.5;
        const penalty = isShell ? 1 : 2;

        if (p.personagem.PONTOS > 0) {
          const pontosAntes = p.personagem.PONTOS;
          p.personagem.PONTOS = Math.max(0, p.personagem.PONTOS - penalty);
          const pontosPerdidos = pontosAntes - p.personagem.PONTOS;

          const item = isShell ? "casco 🐢 (-1 ponto)" : "bomba 💣 (-2 pontos)";
          console.log(`❌ ${p.personagem.NOME} foi atingido por um ${item} e foi de ${pontosAntes} para ${p.personagem.PONTOS} ponto(s).`);
        } else {
          const randomSadEmoji = sadEmojis[Math.floor(Math.random() * sadEmojis.length)];
          console.log(`❌ ${p.personagem.NOME} já está com 0 pontos. ${randomSadEmoji}`);
        }
      });
    }
    console.log("----------------------------------------------------");              
  }
}

function formatNamesWithAnd(nomes) {
  if (nomes.length === 0) return "";
  if (nomes.length === 1) return nomes[0];
  if (nomes.length === 2) return nomes[0] + " e " + nomes[1];

  // Para 3 ou mais: separar com vírgula e antes do último colocar "e"
  return nomes.slice(0, -1).join(", ") + " e " + nomes[nomes.length - 1];
}

async function declareWinner(...characters) {
  // Declaração do vencedor ou empate
  const maxPoints = Math.max(...characters.map(c => c.PONTOS));
  const winners = characters.filter(c => c.PONTOS === maxPoints);

  if (winners.length === 1) {
    console.log(`\n🏁 ${winners[0].NOME} venceu a corrida com ${winners[0].PONTOS} ponto(s)! 🏆`);
  } else {
    const names = winners.map(p => p.NOME);
    console.log(`\n🏁 A corrida terminou em empate entre: ${formatNamesWithAnd(names)} com ${winners[0].PONTOS} ponto(s)! ⚖️`);
  }

  // Mostrar Ranking Final ordenado por pontos
  console.log("\n🏆 RANKING FINAL 🏆");
  const ranking = [...characters].sort((a, b) => b.PONTOS - a.PONTOS);

  ranking.forEach((p, i) => {
    const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : ` ${i + 1}º`;
    console.log(`${medal} - ${p.NOME.padEnd(15)} ${p.PONTOS} ponto(s)`);
  });
}

(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME}, ${player2.NOME}, ${player3.NOME}, ${player4.NOME}, ${player5.NOME} e ${player6.NOME} começando...\n`
  );

  await playRaceEngine(player1, player2, player3, player4, player5, player6);
  await declareWinner(player1, player2, player3, player4, player5, player6);
})();
