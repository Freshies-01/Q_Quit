import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'jhi-nav-top',
    templateUrl: './nav-top.component.html',
    styleUrls: ['./nav-top.component.css']
})
export class NavTopComponent {
    @Output() toogleNav = new EventEmitter();
}
