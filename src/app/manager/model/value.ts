/**
 * Created by nardm on 22.12.16.
 */


export declare module ValueInterface {

  export interface Value {
    key: number;
    value: string;
  }

  export interface Values {
    total_count: number;
    values: Value[];
  }
}
