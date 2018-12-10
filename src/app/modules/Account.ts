import { Injectable } from '@angular/core';
import { AccountInterface } from '../interfaces/AccountInterface';
import { TransactionInterface } from '../interfaces/TransactionInterface';

@Injectable({
    providedIn: 'root'
})

export class Account {
    accountTypeSign = {
        Asset: -1,
        Liability: 1,
        Income: 1,
        Expense: -1
    };

    accountBalance(account: AccountInterface): number {
        let balance: number = 0;
        let types = this.accountTypeSign;
        account.transactions.forEach(function (t: TransactionInterface) {
            balance += t.amount * types[account.type];
        });
        return balance;
    }

    accountTypes:string[] = ['Asset', 'Liability', 'Income', 'Expense'];
}