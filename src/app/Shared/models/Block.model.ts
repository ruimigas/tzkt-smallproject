export interface Block {
    cycle: number;
    level: number;
    hash: string;
    timestamp: string;
    proto: number;
    payloadRound: number;
    blockRound: number;
    validations: number;
    deposit: number;
    reward: number;
    bonus: number;
    fees: number;
    nonceRevealed: boolean;
    lbToggleEma: number;
    priority: number;
    lbEscapeVote: boolean;
    lbEscapeEma: number;
    proposer?: ProposerOrProducerOrBaker | null;
    producer?: ProposerOrProducerOrBaker1 | null;
    baker?: ProposerOrProducerOrBaker2 | null;
  }
  export interface ProposerOrProducerOrBaker {
    alias: string;
    address: string;
  }
  export interface ProposerOrProducerOrBaker1 {
    alias: string;
    address: string;
  }
  export interface ProposerOrProducerOrBaker2 {
    alias: string;
    address: string;
  }
  
  export interface BlockWithTransactionCount extends Block{
    transactionNumber?: number;
}