export interface BankDebtRow {
    clientName: string;
    amount: string;
    expDate: string;
    selected: boolean; // This property will help with selecting a row in the table
}
