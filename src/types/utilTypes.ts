export interface TableTree{
    typeNode:string;
    value: string;
    colSpan: number;
    children: TableTree[];
}

export interface responseError{
    status:number;
    message:string;
    data?: Record<string, string>[];
}