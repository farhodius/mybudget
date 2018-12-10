import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AccountInterface } from '../interfaces/AccountInterface';
import { TransactionInterface } from '../interfaces/TransactionInterface';
import { AccountType } from '../modules/AccountType';
import { Account } from '../modules/Account';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  summaryReport: Object[] = [];
  recentExpensesReport: Object[] = [];

  displayedColumns = ['date', 'amount', 'desc'];
  summaryReportCols = ['type', 'balance'];

  expensesChart: any[] = [];

  // Chart options
  view: any[] = [600, 330];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Amount';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(public data: DataService, public account: Account) { }

  ngOnInit() {
    this.data.dataLoadObservable.subscribe(() => { }, () => { }, () => {
      this.calcSummaryReport();
      this.getRecentExpenses(10);
      this.generateExpensesChart();
    })
  }

  calcSummaryReport(): void {
    let report: Object = {};

    this.account.accountTypes.forEach(function (at: string) {
      report[at] = { type: at, balance: 0 };
    });
    this.data.accounts.forEach(function (a: AccountInterface) {
      a.transactions.forEach(function (t: TransactionInterface) {
        report[a.type].balance += t.amount * AccountType.accountTypeSign[a.type];
      });
    });
    // Convert report to array
    // This approach for some reason does not work with Material tables - doesn't seem to like binding of 'this'
    // this.account.accountTypes.forEach(((at: string) => {
    //   this.summaryReport.push(report[at]);
    // }).bind(this));
    let reportArr: Object[] = [];
    this.account.accountTypes.forEach((at: string) => {
      reportArr.push(report[at]);
    });
    this.summaryReport = reportArr;
  }

  getRecentExpenses(count: number): void {
    let report: object[] = [];
    this.data.accounts.forEach(function (a: AccountInterface) {
      if (a.type == 'Expense') {
        a.transactions.forEach(function (t: TransactionInterface) {
          report.push({ date: t.date, amount: t.amount * AccountType.accountTypeSign.Expense, desc: t.desc });
        });
      }
    });
    report = report.sort((a: any, b: any): number => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    this.recentExpensesReport = report.slice(0, count);

  }

  generateExpensesChart(): void {
    let report: object = {};
    let months: string[] = [];
    let date = new Date();
    date.setDate(1);

    for (let i = 1; i <= 6; i++) {
      months.push(formatDate(date, 'MMM y', 'en-US'));
      date = new Date(date.getTime() - 24 * 60 * 60 * 1000);
      date.setDate(1);
    }

    months.reverse();

    months.forEach(function (m: string) {
      report[m] = { name: m, value: 0 };
    });

    this.data.accounts.forEach(function (a: AccountInterface) {
      if (a.type === 'Expense') {
        a.transactions.forEach(function (t: TransactionInterface) {
          date = new Date(t.date);
          report[formatDate(date, 'MMM y', 'en-US')].value += t.amount * -1;
        });
      }
    });
    let reportArr: Object[] = [];
    months.forEach((m: string) => {
      reportArr.push(report[m]);
    });
    this.expensesChart = reportArr;
  };

  chartBarSelect(): void {

  }

  currencyFormat(val) {
    return `$${val}`;
  }

}
