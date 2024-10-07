import { Injectable, signal } from '@angular/core';
import { dataRow } from './data-table.model';

@Injectable({ providedIn: 'root' })
export class DataTableService {


  // Simulate fetching data, this could be replaced by an HTTP request to an API
  private tableData = signal<dataRow[]>([
    {
        id: '1,001', column1: 'random', column2: 'data', column3: 'placeholder', column4: 'text'
    },
    {
        id: '1,002', column1: 'placeholder', column2: 'irrelevant', column3: 'visual', column4: 'layout'
    },
    {
        id: '1,003', column1: 'data', column2: 'rich', column3: 'dashboard', column4: 'tabular' 
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
