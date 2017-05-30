/**
 * Created by nardm on 16.12.16.
 */
export declare module ServiceRequestDataInterface {

  export interface Location {
    lat: number;
    lng: number;
  }

  export interface Address {
    text: string;
    location: Location;
    admin?: string;
    locality?: string;
    thoroughfare?: string;
    country_name?: string;
    feature?: string;
  }

  export interface Route {
    adresses: Address[];
    path: string;
    distance: number;
  }

  export interface Selected {
    key: number;
    value: string;
  }

  export interface ServiceRequestData {
    id: number;
    request_id: number;
    property_id: number;
    type: number;
    key: number;
    keys: number[];
    selected: Selected[];
    selectedActive: string[];
    responses: number[];
    response_count: number;
    number: string;
    images: number[];
    bool: boolean;
    text: string;
    check_box: boolean;
    date: number;
    date_time: number;
    address: Address;
    route: Route;
  }

}

