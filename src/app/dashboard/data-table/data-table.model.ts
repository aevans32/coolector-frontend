export interface dataRow {
    client: string;
    status: boolean; // true for "paid", false for "pending"
    amount: string;
    bank: string;
    issueDate: string;
    expDate: string;
    payDate: string;
    moreActions: string;
    selected: boolean;
}