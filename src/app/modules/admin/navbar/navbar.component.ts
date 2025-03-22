import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopCartService } from 'src/app/services/shopcart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {

  title: string = 'Logo'

  count: number = 0;

  constructor(private shopCartService: ShopCartService, private router: Router, private activateRoute: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log("NavbarComponent OnInit()");

    this.shopCartService.countCartItem().subscribe({
      next: data => {
        this.count = data.body!;
        this.cdr.detectChanges();
      },
      error: err => {
        Swal.fire({
          title: "¡Algo pasó!",
          text: `Error: ${err.error.error}`,
          icon: "error"
        });
        console.error("Error: ", err.error.error);
      },
      complete() {

      },
    });
  }

}
