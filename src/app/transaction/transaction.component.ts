import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountInterface } from '../interfaces/AccountInterface';
import { TransactionInterface } from '../interfaces/TransactionInterface';
import { AccountType } from '../modules/AccountType';
import { Account } from '../modules/Account';
import { formatDate } from '@angular/common';

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
    let account: AccountInterface = this.getAccountByNumber(this.transactionForm.value.fromAccountNumber);
    let amount: number = this.transactionForm.value.amount;
    transaction = { id: 0, date: dateString, amount: amount, accountNumber: this.transactionForm.value.toAccountNumber, desc: this.transactionForm.value.desc };
    account.transactions.push(transaction);
    console.log('from amount', amount);

    account = this.getAccountByNumber(this.transactionForm.value.toAccountNumber);
    amount = this.transactionForm.value.amount * this.account.accountTypeSign[account.type];
    transaction = { id: 0, date: dateString, amount: amount, accountNumber: this.transactionForm.value.fromAccountNumber, desc: this.transactionForm.value.desc };
    account.transactions.push(transaction);
    console.log('to amount', amount);

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
