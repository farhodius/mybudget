import { TransactionInterface } from './TransactionInterface';

export interface AccountInterface {
    id: number;
    number: string;
    name: string;
    type: string;
    balance: number;
    showTrn: boolean;
    transactions: TransactionInterface[];
}
