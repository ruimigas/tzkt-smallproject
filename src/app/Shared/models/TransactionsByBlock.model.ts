export interface TransactionsByBlock {
    type: string;
    id: number;
    level: number;
    timestamp: string;
    block: string;
    hash: string;
    counter: number;
    sender: SenderOrTarget;
    gasLimit: number;
    gasUsed: number;
    storageLimit: number;
    storageUsed: number;
    bakerFee: number;
    storageFee: number;
    allocationFee: number;
    target: SenderOrTarget;
    amount: number;
    status: string;
    hasInternals: boolean;
  }
  export interface SenderOrTarget {
    address: string;
  }
  