import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indexhome',
  templateUrl: './indexhome.component.html'
})
export class IndexHomeComponent implements OnInit {

  ngOnInit(): void {
    console.log("IndexHomeComponent ngOnInit");
  }
}
