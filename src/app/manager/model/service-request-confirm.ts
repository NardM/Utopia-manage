/**
 * Created by nardm on 24.12.16.
 */

export declare module RequestConfirmInterface {
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
    logo_hash: string;
    order_count: number;
    order_price_summ: number;
    paid_percent_summ: number;
    confirm_percent_summ: number;
    freeze_percent_summ: number;
    skin_id: number;
    banlance_transactions_summ: number;
    phone: string;
    email: string;
    work_time: string;
    address: Address;
    master: Master;
    company: Company2;
    city_id: number;
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
