export declare module ClientInterface {

  export interface Account {
    id: number;
    company_id: number;
    name: string;
    last_name: string;
    phone: string;
    roles: string[];
  }

  export interface Client {
    accounts: Account[];
  }

}

