// services/password/create.js

import chalk from "chalk";
import handle from "./handle.js";

async function createPassword() {
  console.log(chalk.green("password"));
  const password = await handle();
  console.log(chalk.green.bold("\nSenha gerada com sucesso: ") + chalk.yellow(password));
}

export default createPassword;

