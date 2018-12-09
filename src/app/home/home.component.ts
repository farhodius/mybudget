import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AccountInterface } from '../interfaces/AccountInterface';
import { TransactionInterface } from '../interfaces/TransactionInterface';
import { AccountType } from '../modules/AccountType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  accountTypeReport: Object = {};
  recentExpensesReport: object[] = [];

  constructor(public data: DataService) { }

  ngOnInit() {
    this.data.dataLoadObservable.subscribe(() => { }, () => { }, () => {
      this.calcAccountTypeReport();
      this.getRecentExpenses(10);
    })
  }

  calcAccountTypeReport(): void {
    let report: Object = {};
    let fields: string[] = [];
    this.data.accounts.forEach(function (a: AccountInterface) {
      if (fields.indexOf(a.type) == -1) {
        fields.push(a.type);
      }
    });
    fields.forEach(function (at: string) {
      report[at] = { type: at, balance: 0 };
    });
    this.data.accounts.forEach(function (a: AccountInterface) {
      a.transactions.forEach(function (t: TransactionInterface) {
        report[a.type].balance += t.amount * AccountType.accountTypeSign[a.type];
      });
    });
    this.accountTypeReport = report;
  }

  getRecentExpenses(count: number): void {
    let report: object[] = [];
    this.data.accounts.forEach(function (a: AccountInterface) {
      if (a.type == 'Expense') {
        a.transactions.forEach(function (t: TransactionInterface) {
          report.push({ date: t.date, amount: t.amount * AccountType.accountTypeSign.Expense , desc: t.desc });
        });
      }
    });
    report = report.sort((a: any, b: any): number => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    this.recentExpensesReport = report.slice(0, count);

  }

}
