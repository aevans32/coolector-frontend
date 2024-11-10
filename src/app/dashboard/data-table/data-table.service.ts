import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { dataRow } from './data-table.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { response } from 'express';

@Injectable({ providedIn: 'root' })
export class DataTableService {

  private httpClient = inject(HttpClient);

  private destroyRef = inject(DestroyRef);

  private baseURL = 'https://localhost:7096/api/debt';

  private tableData = signal<dataRow[]>([]);
  
  
  // Expose read-only signal to components
  allData = this.tableData.asReadonly();

  constructor() 
  {
     this.fetchTableData();
  }

  addRow(newRow: dataRow) {
    const updatedData = [...this.tableData(), newRow];
    this.tableData.set(updatedData); // Update the signal with the new row
  }

  fetchTableData()
  {
    const subscription = this.httpClient.get<any[]>(`${this.baseURL}/dashboard`)
    .pipe(
      map(response => {
        return response.map(item => ({
          client: item.clientName,                          // Mapping API's clientName to client
            status: this.capitalizeFirstLetter(item.status),// Directly mapping status
            amount: `$ ${item.amount.toFixed(2)}`,          // Formatting the amount with a currency symbol and two decimal places
            bank: '-',                                      // Default value for bank
            issueDate: this.formatDate(item.issueDate),     // Format the date as needed
            expDate: this.formatDate(item.expDate),         // Format the date as needed
            payDate: '-',                                   // Default value for payDate
            moreActions: '-',                                // Default value for moreActions
            selected: false
        }));
      }),
      catchError((error) =>
      {
        console.log(error);
        return throwError(() => new Error('Error thrown from data-table.service'));
      })
    ).subscribe({
      next: (data) => 
      {
        this.tableData.set(data);       // Update the tableData signal with the transformed data
      }
    }
    );

    // Ensure the subscription is cleaned up on component/service destroy
    this.destroyRef.onDestroy(() => 
    {
      subscription.unsubscribe();
    });
    
  }

  // Utility function to format the date
  private formatDate(dateString: string): string
  {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  //  Capitalizes the Status since it arrives from the API all lowercase
  private capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
  
}
