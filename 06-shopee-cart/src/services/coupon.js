// src/services/coupon.js

import { formatBRL, formatBRLRounded } from '../utils/moneyUtils.js';

// Mapa de cupons disponíveis
const availableCoupons = {
    "FRETE10": 10,  // 10% de desconto
    "DESCONTO20": 20,
    "BLACK50": 50,
};

// ✅ Recebe o código do cupom e aplica se for válido
async function addCoupon(cart, couponCode) {
    const percentage = availableCoupons[couponCode.toUpperCase()];
    if (!percentage) {
        console.log("❌ Cupom inválido ou expirado.");
        return;
    }

    cart.coupon = {
        code: couponCode.toUpperCase(),
        percentage,
    };

    console.log(`✅ Cupom "${cart.coupon.code}" aplicado com ${cart.coupon.percentage}% de desconto!`);
    return await applyDiscount(cart);
}

// ✅ Aplica um percentual de desconto no total do carrinho
async function applyDiscount(cart) {
    if (!cart.items || cart.items.length === 0) {
        console.log("🚫 Carrinho vazio.");
        return {
            total: formatBRL(0),
            discount: formatBRL(0),
            finalTotal: formatBRL(0),
        };
    }

    const percentage = cart.coupon?.percentage || 0;
    const total = cart.items.reduce((sum, item) => sum + item.subtotal(), 0);
    const discount = (total * percentage) / 100;
    const finalTotal = total - discount;

    console.log(`💰 Total original: ${formatBRLRounded(total)}`);
    console.log(`🎉 Desconto de ${percentage}% aplicado!`);
    console.log(`🧾 Total com desconto: ${formatBRLRounded(finalTotal)}`);

    return {
        total: formatBRLRounded(total),
        discount: formatBRLRounded(discount),
        finalTotal: formatBRLRounded(finalTotal),
    };
}

export { applyDiscount, addCoupon };