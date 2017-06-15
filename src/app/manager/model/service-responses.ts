/**
 * Created by nardm on 16.12.16.
 */
export declare module ServiceResponsesInterface {

  export interface Location {
    lat: number;
    lng: number;
  }

  export interface Address {
    text: string;
    location: Location;
    admin: string;
    locality: string;
    thoroughfare: string;
    country_name: string;
    feature: string;
  }

  export interface Master {
    first_name: string;
    last_name: string;
  }

  export interface Company2 {
    name: string;
    inn: string;
  }

  export interface Company {
    id: number;
    rate: number;
    phone: string;
    email: string;
    work_time: string;
    address: Address;
    master: Master;
    company: Company2;
    logo: string;
  }

  export interface Respons {
    id: number;
    chat_id: number;
    status: number;
    request_id: number;
    from_price: number;
    active_chat: boolean;
    to_price: number;
    from_date: number;
    to_date: number;
    show_distance: boolean;
    company: Company;
    company_id: number;
  }

  export interface Responses {
    responses: Respons[];
  }

}

