// prompt-schema/prompt-schema-pix.js

import chalk from "chalk";

const promptSchemaPIX = [
  {
    name: "amount",
    description: chalk.yellow("Digite o valor do pagamento (ex: 100.50)"),
    required: true,
    pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
    message: chalk.red("Informe um valor válido"),
  },
  {
    name: "description",
    description: chalk.yellow("Digite uma descrição (opcional)"),
  },
];

export default promptSchemaPIX;
