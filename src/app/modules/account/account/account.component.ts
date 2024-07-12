import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

  ngOnInit(): void {
    console.info("AccountComponent ngOnInit");
  
  }

}