🆕 Novidades da Versão
  - Esta versão inclui melhorias relacionadas à formatação monetária e à aplicação de cupons de desconto no carrinho de compras.

✅ Novos utilitários
  - Adicionado o arquivo src/utils/moneyUtils.js, com funções utilitárias para formatação de valores em reais (BRL):
    - formatBRL(value) – formata o valor no padrão brasileiro de moeda.
    - formatBRLRounded(value) – formata o valor com arredondamento para duas casas decimais.

🎟️ Descontos com Cupom
  - Criado o serviço src/services/coupon.js, com suporte à aplicação de cupons de desconto:
    - Valida cupons disponíveis no sistema (FRETE10, DESCONTO20, BLACK50, etc.).
    - Aplica percentual de desconto sobre o total do carrinho.
    - Retorna os valores formatados: total original, desconto aplicado e total final com desconto.