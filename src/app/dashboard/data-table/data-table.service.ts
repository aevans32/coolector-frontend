import { Injectable, signal } from '@angular/core';
import { dataRow } from './data-table.model';

@Injectable({ providedIn: 'root' })
export class DataTableService {


  // Simulate fetching data, this could be replaced by an HTTP request to an API
  private tableData = signal<dataRow[]>([
    {
      accntCode: '1', clientID: '1,001', clientName: 'random', amount: 'data', lateFees: 'placeholder', minAmount: 'text', issueDate: 'hh', expDate: 'sdfd', status: 'dsda', serviceCode: 'sdadsa'
    },
    {
      accntCode: '1', clientID: '1,001', clientName: 'random', amount: 'data', lateFees: 'placeholder', minAmount: 'text', issueDate: 'hh', expDate: 'sdfd', status: 'dsda', serviceCode: 'sdadsa'
    },
    {
      accntCode: '1', clientID: '1,001', clientName: 'random', amount: 'data', lateFees: 'placeholder', minAmount: 'text', issueDate: 'hh', expDate: 'sdfd', status: 'dsda', serviceCode: 'sdadsa'
    },
    // Add more data here...
  ]);
  

  allData = this.tableData.asReadonly();

  constructor() {
    const tableData = localStorage.getItem('tableData');

    if (tableData) {
        this.tableData.set(JSON.parse(tableData) as dataRow[]);
    }
  }
}
