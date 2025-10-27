// src/payments/pyusd_payment.ts
// ---------------------------------------------------------
// PayPal USD (PYUSD) integration stub for Cointext
// Demonstrates pay-per-analysis flow for agent payments.
// ---------------------------------------------------------

import { ethers } from "ethers";

export const COINTEXT_TREASURY = "0xYourTreasuryAddressHere";

const ERC20_ABI = [
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address owner) view returns (uint256)",
];

/**
 * chargePyusdFee:
 * Sends a micro-fee in PYUSD before delivering premium Cointext intel.
 */
export async function chargePyusdFee(
  rpcUrl: string,
  pyusdToken: string,
  payerKey: string,
  feeAmountWei: bigint
) {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(payerKey, provider);
  const pyusd = new ethers.Contract(pyusdToken, ERC20_ABI, wallet);

  const tx = await pyusd.transfer(COINTEXT_TREASURY, feeAmountWei);
  const receipt = await tx.wait();

  return {
    ok: receipt.status === 1n,
    txHash: tx.hash,
  };
}

