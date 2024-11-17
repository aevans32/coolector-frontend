import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { dataRow } from './data-table.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { response } from 'express';

@Injectable({ providedIn: 'root' })
export class DataTableService {

  private httpClient = inject(HttpClient);

  public destroyRef = inject(DestroyRef);

  private baseURL = 'https://localhost:7096/api/debt';

  private tableData = signal<dataRow[]>([]);
  
  
  // Expose read-only signal to components
  allData = this.tableData.asReadonly();

  constructor() 
  {
    //  this.fetchTableData();
    //  console.log(this.tableData);
  }


  /**
   * HTTP Method to POST a new debt
   * @param newDebt 
   * @returns 
   */
  addDebt(payload: { 
    clientName: string; 
    status: string; 
    amount: number; 
    issueDate: string; 
    expDate: string }) {
    return this.httpClient.post(`${this.baseURL}/add`, payload).pipe(
      catchError(error => {
        console.error('Error adding new debt:', error);
        return throwError(() => new Error('Error adding new debt'));
      })
    );
  }
  
  

  /**
   * Adds a Row to the table.
   * @param newRow 
   */
  // addRow(newRow: dataRow) {
  //   // Construct payload for backend by mapping `client` to `clientName`
  //   const payload = {
  //     clientName: newRow.client,
  //     status: newRow.status ? 'paid' : 'pending',
  //     amount: Number(newRow.amount.replace(/[^0-9.-]+/g, "")), // Convert formatted string to number
  //     issueDate: new Date(newRow.issueDate).toISOString(),
  //     expDate: new Date(newRow.expDate).toISOString()
  //   };

  //   const subscription = this.addDebt(payload).subscribe({
  //     next: (savedDebt) => {
  //       // Combine savedDebt data with local `newRow` data for complete `dataRow` structure
  //       const newTableRow: dataRow = {
  //         ...newRow,
  //         code: savedDebt.code || undefined // Use code if backend returns it
  //       };

  //       const updatedData = [...this.tableData(), newTableRow];
  //       this.tableData.set(updatedData); // Update the table data with the new row
  //     },
  //     error: (error) => {
  //       console.error('Failed to add new debt row:', error);
  //     }
  //   });

  //   // Unsubscribe on destroy to prevent memory leaks
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }
  
  
  /**
   * Update the tableData signal with new data
   * @param newData 
   */
  updateTableData(newData: dataRow[]) {
    this.tableData.set(newData);
  }


  /**
   * HTTP Method to GET all debts from the table.
   */
  fetchTableData()
  {
    const subscription = this.httpClient.get<any[]>(`${this.baseURL}/dashboard`)
    .pipe(
      map(response => {
        return response.map(item => ({
          code: item.code,                              // Include code from the response
          client: item.clientName,                          // Mapping API's clientName to client
          status: item.status.toLowerCase() === 'paid',     // Map "paid" to true and "pending" to false
          amount: `$ ${item.amount.toFixed(2)}`,            // Formatting the amount with a currency symbol and two decimal places
          bank: '-',                                        // Default value for bank
          issueDate: this.formatDate(item.issueDate),       // Format the date as needed
          expDate: this.formatDate(item.expDate),           // Format the date as needed
          payDate: '-',                                     // Default value for payDate
          moreActions: '-',                                 // Default value for moreActions
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
        console.log("Fetched tableData with code values:", this.tableData()); // Log to verify code presence
      }
    }
    );

    // Ensure the subscription is cleaned up on component/service destroy
    this.destroyRef.onDestroy(() => 
    {
      subscription.unsubscribe();
    });
  }

  /**
   * HTTP Method to DELETE a number of rows
   * 
   * httpClient.delete(...): This method is convenient for simple DELETE requests 
   * but does not allow sending a body with the request. In some cases (like when deleting multiple items), 
   * it’s necessary to include data in the request body.
   * 
   * httpClient.request('delete', ...): This method is more flexible, 
   * allowing you to specify the HTTP method ('delete' in this case) 
   * and include a body by setting the body property in the options object. 
   * This approach is useful when you need to send data, such as an array of code values, with a DELETE request.
   * @param codes 
   * @returns 
   */
  deleteRows(codes: number[]) {

    console.log("Codes received by Service:", codes);
    // Return the observable instead of subscribing here
    return this.httpClient.request('delete', `${this.baseURL}/delete`, {
      body: { codes }
    })
    .pipe(
      catchError(error => {
        console.error('Error deleting rows:', error);
        return throwError(() => new Error('Error deleting rows'));
      })
    );
  }
  



  // Utility function to format the date
  private formatDate(dateString: string): string
  {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  //  Capitalizes the Status since it arrives from the API all lowercase
  // DEPRECATED
  private capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  private formatAmount(amount: number): string {
    return `$ ${amount.toFixed(2)}`; // Formats amount with a dollar sign and two decimal places
  }
  
  
}
