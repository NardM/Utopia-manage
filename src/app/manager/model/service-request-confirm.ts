/**
 * Created by nardm on 24.12.16.
 */

export declare module RequestConfirmInterface {
  export interface Location {
    lat: number;
    lng: number;
  }

  export interface Address {
    city_id: number;
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
    phone: string;
    id: number;
    logo_hash: string;
    rate: number;
    skin_id: number;
    email: string;
    work_time: string;
    address: Address;
    master: Master;
    company: Company2;
    search_region_id: number;
    categories: number[];
  }

  export interface RequestConfirm {
    id: number;
    company: Company;
    date_time: number;
    completed_date: number;
    chat_id: number;
    response_id: number;
  }
}
