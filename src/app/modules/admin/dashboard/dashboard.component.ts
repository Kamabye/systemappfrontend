import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
    console.info("DashboardComponent ngOnInit");
  
  }

}
