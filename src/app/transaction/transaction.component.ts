import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountInterface } from '../interfaces/AccountInterface';
import { TransactionInterface } from '../interfaces/TransactionInterface';
import { Account } from '../modules/Account';
import { formatDate } from '@angular/common';
import { CustomValidator } from '../modules/CustomValidator'

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transactionForm: FormGroup;

  constructor(public data: DataService, private account: Account, private fb: FormBuilder) { }

  ngOnInit() {
    this.resetTransactionForm();
  }

  resetTransactionForm(): void {
    this.transactionForm = this.fb.group({
      date: '',
      amount: '',
      fromAccountNumber: '',
      toAccountNumber: '',
      desc: ''
    });
  }

  addTransaction(): void {
    let transaction: TransactionInterface;
    let dateString: string = formatDate(this.transactionForm.value.date, 'MM/dd/yyyy', 'en-US');
    let fromAccount: AccountInterface = this.getAccountByNumber(this.transactionForm.value.fromAccountNumber);
    let toAccount: AccountInterface = this.getAccountByNumber(this.transactionForm.value.toAccountNumber);
    let amount: number = Math.abs(this.transactionForm.value.amount);
    let fromSign: number;
    let toSign: number;
    if (this.account.accountTypeSign[fromAccount.type] + this.account.accountTypeSign[toAccount.type] === -2) {
      // Both debit balance accounts
      fromSign = 1;
      toSign = -1;
    }
    else if (this.account.accountTypeSign[fromAccount.type] + this.account.accountTypeSign[toAccount.type] === 2) {
      // Both credit balance account
      fromSign = -1;
      toSign = 1;
    }
    else {
      fromSign = 1;
      toSign = -1;
    }
    // From account entry
    transaction = { id: 0, date: dateString, amount: amount * fromSign, accountNumber: this.transactionForm.value.toAccountNumber, desc: this.transactionForm.value.desc };
    fromAccount.transactions.push(transaction);
    // To account entry
    transaction = { id: 0, date: dateString, amount: amount * toSign, accountNumber: this.transactionForm.value.fromAccountNumber, desc: this.transactionForm.value.desc };
    toAccount.transactions.push(transaction);

    this.resetTransactionForm();
  }

  getAccountByNumber(accountNumber: string): AccountInterface {
    let account: AccountInterface;
    this.data.accounts.forEach(function (a: AccountInterface) {
      if (a.number === accountNumber) {
        account = a;
      }
    });
    return account;
  }


}
