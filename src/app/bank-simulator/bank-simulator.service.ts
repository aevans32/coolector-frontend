import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { BankDebtRow } from './bank-simulator.model';

@Injectable({
  providedIn: 'root'
})
export class BankSimulatorService {

    private httpClient = inject(HttpClient);

    public destroyRef = inject(DestroyRef);

    private baseURL = 'https://localhost:7096/api/bank-simulator'; // Update with the actual endpoint for the bank simulator

    private tableData = signal<BankDebtRow[]>([]);


    constructor() {
        
    }

  

    // Expose read-only signal to components
    allData = this.tableData.asReadonly();

  
}
