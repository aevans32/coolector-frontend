import { Component, inject, input } from '@angular/core';
import { Router } from 'express';

@Component({
    selector: 'app-error-modal',
    standalone: true,
    templateUrl: './signup-modal.component.html',
    styleUrl: './signup-modal.component.css',
    imports: []
})
export class SignUpModalComponent {

    private router = inject(Router);

    onClearMsg() {
        this.router.navigate(['sign-in']);
    }
}
