import Big from 'big.js';

export default function nanoPaymentLink(account, amount) {
  return `nano:${account}?amount=${Big(amount||0).times(1e30).toFixed(0)}`;
}
