import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.css']
})

export class TicketComponent implements OnInit {

    ngOnInit(): void {

        console.info("TicketComponent ngOnInit()");
    }

    currentDate = new Date();
    customerName = 'John Doe';
    items = [
        { name: 'Producto 1', price: 50.00 },
        { name: 'Producto 2', price: 30.00 },
        { name: 'Producto 3', price: 20.00 },
    ];
    total = this.items.reduce((acc, item) => acc + item.price, 0);

    printTicket() {
        const printContents = document.getElementById('ticket')!.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // Recargar la página para restaurar el contenido original
    }

}