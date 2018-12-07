import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountInterface } from './interfaces/AccountInterface';
import { TransactionInterface } from './interfaces/TransactionInterface';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    loaded: boolean = false;
    
    accounts: AccountInterface[];

    transactions: TransactionInterface[];

    constructor(private http: HttpClient) { }

    getGlAccounts() {
        return this.http.get('http://localhost:8080/glaccounts');
    }

    getData() {
        if(this.loaded === false){
            this.http.get('http://localhost:8080/budgetdata').subscribe((data: {accounts: AccountInterface[]}) => {
                this.accounts = data.accounts;
            });
        }

    }
}
