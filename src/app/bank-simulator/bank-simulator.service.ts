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

    private baseURL = 'https://localhost:7096/api/debt'; // Update with the actual endpoint for the bank simulator

    private tableData = signal<BankDebtRow[]>([]);


    // Expose read-only signal to components
    allData = this.tableData.asReadonly();


    
    lookUpDebtsByCustomerName (customerName: string): Observable<BankDebtRow[]> {

      // Structure of the payload
      const payload = { clientName: customerName };

      return this.httpClient.post<BankDebtRow[]>(`${this.baseURL}/filter-by-client`, payload)
      .pipe(
        catchError((error) => {
          console.error('Error at http Service:', error);
          return throwError(() => new Error('Failed to fetch debts by customer name.'));

        })
      )

    }

    
    // Update the signal with the new data
    updateTableData (newData: BankDebtRow[]) {
      this.tableData.set(newData);
    }

  
}
