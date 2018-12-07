import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountInterface } from '../interfaces/AccountInterface';

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

    resetAccountForm () {
        this.accountForm = this.fb.group({
            number: '',
            name: '',
            type: ''
        });
    }

    addAccount() {
        let account: AccountInterface;
        console.log(this.accountForm.value);
        account = {id: 0, number: this.accountForm.value.number, name: this.accountForm.value.name, type: this.accountForm.value.type};

        this.data.accounts.push(account);
        this.resetAccountForm();
    }

}
