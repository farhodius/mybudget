import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountInterface } from '../interfaces/AccountInterface';
import { TransactionInterface } from '../interfaces/TransactionInterface';
import { AccountType } from '../modules/AccountType';

@Component({
    selector: 'app-glaccount',
    templateUrl: './glaccount.component.html',
    styleUrls: ['./glaccount.component.scss']
})
export class GlaccountComponent implements OnInit {

    accountForm: FormGroup;

    constructor(private data: DataService, private fb: FormBuilder) { }

    ngOnInit() {
        this.resetAccountForm();
    }

    resetAccountForm(): void {
        this.accountForm = this.fb.group({
            number: '',
            name: '',
            type: ''
        });
    }

    addAccount(): void {
        console.log(this.accountForm);
        let account: AccountInterface;
        account = { id: 0, number: this.accountForm.value.number, name: this.accountForm.value.name, type: this.accountForm.value.type, balance: 0, transactions: [] };

        this.data.accounts.push(account);
        this.resetAccountForm();
    }

    accountBalance(account: AccountInterface): number {
        let balance: number = 0;
        account.transactions.forEach(function (t: TransactionInterface) {
            balance += t.amount * AccountType.accountTypeSign[account.type];
        });
        return balance;
    }

}
