import { Injectable, signal } from '@angular/core';
import { dataRow } from './data-table.model';

@Injectable({ providedIn: 'root' })
export class DataTableService {


  // Simulate fetching data, this could be replaced by an HTTP request to an API
  private tableData = signal<dataRow[]>([
    {
      client: 'Carmen Sandiego', status: 'Paid', amount: '$ 1,001.30', bank: 'Bank of America', issueDate: 'Oct 19', expDate: 'Today', payDate: 'Oct 20', moreActions: ':'
    },
    {
      client: 'Jack Gray', status: 'Pending', amount: '$ 740.50', bank: 'Chase', issueDate: 'Today', expDate: 'Dec 12', payDate: '-', moreActions: ':'
    },
    {
      client: 'Robert Duran', status: 'Reversed', amount: '$ 1,811.07', bank: 'Wells Fargo', issueDate: 'Sept 1', expDate: 'Oct 30', payDate: '-', moreActions: ':'
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
