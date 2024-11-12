export interface dataRow {
    code?: number; //Marking it as optional allows for cases where the code might not be initially available, such as when creating a new debt before the backend responds.
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