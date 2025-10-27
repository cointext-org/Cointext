// src/modules/blockscout_fetcher.ts
// ---------------------------------------------------------
// Blockscout / Autoscout integration for Cointext
// Used to fetch wallet transactions and summarize behavior.
// ---------------------------------------------------------

import fetch from "node-fetch";

export interface TxEntry {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
}

export async function fetchAddressTxs(
  address: string,
  explorerBaseUrl: string
): Promise<TxEntry[]> {
  const url = `${explorerBaseUrl}/api?module=account&action=txlist&address=${address}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Blockscout API error ${res.status}`);
  const data = await res.json();
  return data.result as TxEntry[];
}

export async function summarizeWalletBehavior(
  address: string,
  explorerBaseUrl: string
) {
  const txs = await fetchAddressTxs(address, explorerBaseUrl);
  let incoming = 0n;
  let outgoing = 0n;

  for (const tx of txs.slice(0, 20)) {
    const value = BigInt(tx.value || "0");
    if (tx.to?.toLowerCase() === address.toLowerCase()) incoming += value;
    if (tx.from?.toLowerCase() === address.toLowerCase()) outgoing += value;
  }

  const trend =
    incoming > outgoing
      ? "accumulating"
      : outgoing > incoming
      ? "distributing"
      : "neutral";

  return {
    address,
    trend,
    note: "Heuristic summary from onchain tx patterns (Blockscout).",
  };
}

