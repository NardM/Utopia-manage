/**
 * Created by nardm on 23.12.16.
 */
export declare module PropertySubInterface {

  export interface Address {
    min_lat: number;
    min_lng: number;
    max_lat: number;
    max_lng: number;
  }

  export interface Subset {
    id: number;
    type: string;
    address: Address;
    name: string;
    description: string;
  }

  export interface PropertySub {
    subsets: Subset[];
  }

}

