import { Component } from "@angular/core";

@Component({
    selector : 'app-body',
    templateUrl : './home.component.html'
})
export class HomeComponent {
    public body : any = {mensaje: 'Carlos', error : 'Hernandez'};
    

}
