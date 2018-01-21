import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { Politician } from '../../../models/politician.model';

@Component({
  selector: 'user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css']
})
export class UserSelectComponent implements OnInit {

  myControl = new FormControl();
  
  politicians: Politician[];
  options;

  filteredOptions: Observable<Politician[]>;

  ngOnInit() {
    this.politicians = [
      {
        id: 1,
        firstname: "Donald",
        lastname: "Trump",
        role: "President",
        avatar: "",
        votes: 1000,
        Party: null
      },
      {
        id: 2,
        firstname: "Barack",
        lastname: "Obama",
        role: "President",
        avatar: "",
        votes: 2000,
        Party: null
      },
      {
        id: 3,
        firstname: "Don",
        lastname: "Draper",
        role: "President",
        avatar: "",
        votes: 3000,
        Party: null
      },
    ];

    this.options = this.politicians;

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Politician>(''),
        map(value => typeof value === 'string' ? value : value.firstname),
        map(firstname => firstname ? this.filter(firstname) : this.options.slice())
      );
  }

  filter(name: string): Politician[] {
    return this.options.filter(option =>
      option.firstname.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(politician?: Politician): string | undefined {
    return politician ? politician.firstname : undefined;
  }
}
