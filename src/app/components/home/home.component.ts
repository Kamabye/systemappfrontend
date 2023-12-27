import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-body',
    templateUrl: './home.component.html'
})
export class HomeComponent
    implements OnInit {

    ngOnInit(): void {
        console.info("HomeComponent ngOnInit");

    }

}
