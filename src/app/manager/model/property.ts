
export declare module PropertyInterface {

  export interface InRect {
    min_lat: number;
    min_lng: number;
    max_lat: number;
    max_lng: number;
  }

  export interface Address {
    location_required: boolean;
    in_rect: InRect;
  }

  export interface Text {
    min_lenght: number;
    max_lenght: number;
  }

  export interface NumberI {
    min: number;
    max: number;
  }

  export interface Property {
    name: string,
    id: number;
    description: string;
    label: string;
    access_level: number;
    type: number;
    address: Address;
    text: Text;
    number: NumberI;
    save_mode: number;
  }
}

