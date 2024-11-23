import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BankDebtRow } from './bank-simulator.model';

@Injectable({
  providedIn: 'root'
})
export class BankSimulatorService {

    private httpClient = inject(HttpClient);

    public destroyRef = inject(DestroyRef);

    // private baseURL = 'https://localhost:7096/api/debt'; // Update with the actual endpoint for the bank simulator
    private baseURL = 'https://coolectorapivs.azurewebsites.net/api/debt';

    private tableData = signal<BankDebtRow[]>([]);


    // Expose read-only signal to components
    allData = this.tableData.asReadonly();


    
    lookUpDebtsByCustomerName (customerName: string): Observable<BankDebtRow[]> {

      // Structure of the payload
      const payload = { clientName: customerName };

      return this.httpClient.post<BankDebtRow[]>(`${this.baseURL}/filter-by-client`, payload)
      .pipe(
        map(response => {
          // Transform the response data to format the "amount" and any other fields as needed
          return response.map(item => ({
            ...item,
            code: item.code,
            clientName: item.clientName,
            status: item.status.toLocaleLowerCase(),
            amount: `$ ${Number(item.amount).toFixed(2)}`,
            issueDate: this.formatDate(item.expDate), // Format the amount as currency with 2 decimal places
            expDate: this.formatDate(item.expDate),
            selected: false
          }));
        }),
        catchError((error) => {
          console.error('Error at http Service:', error);
          return throwError(() => new Error('Failed to fetch debts by customer name.'));

        })
      )

    }


    updateDebtStatus(codes: number[], newStatus: string): Observable<any> {
      const payload = { codes, status: newStatus };
    
      return this.httpClient.put(`${this.baseURL}/update-status`, payload).pipe(
        catchError(error => {
          console.error('Error updating debt status:', error);
          return throwError(() => new Error('Failed to update debt status.'));
        })
      );
    }
    


    // Update the signal with the new data
    updateTableData (newData: BankDebtRow[]) {
      this.tableData.set(newData);
    }


    formatDate(date: string): string {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    }
    

  
}
