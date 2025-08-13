// services/pix/create.js

import prompt from "prompt";
import qr from "qrcode-terminal";
import chalk from "chalk";
import promptSchemaPIX from "../../prompts-schema/prompt-schema-pix.js";

function generatePIXCode(amount, description) {
  // Dados da loja
  const key = process.env.PIX_KEY;
  const receiver = process.env.PIX_RECEIVER_NAME;
  const city = process.env.PIX_RECEIVER_CITY;

  // Formato simplificado do PIX payload (pode usar bibliotecas específicas para EMV)
  return `00020126580014BR.GOV.BCB.PIX0114${key}520400005303986540${amount}5802BR5913${receiver}6007${city}62070503***6304`;
}

async function createPIXQRCode() {
  console.log(
    chalk.yellow("⚠️  ATENÇÃO: QR PIX gerado apenas para ESTUDO. Nenhum pagamento real será realizado.\n")
  );

  prompt.get(promptSchemaPIX, (err, result) => {
    if (err) {
      console.log(chalk.red("Erro ao ler dados"));
      return;
    }

    const pixPayload = generatePIXCode(result.amount, result.description || "");
    qr.generate(pixPayload, { small: true }, (qrcode) => {
      console.log(chalk.green("\nQR Code PIX gerado com sucesso:\n"));
      console.log(qrcode);
    });
  });

  prompt.start();
}

export default createPIXQRCode;
