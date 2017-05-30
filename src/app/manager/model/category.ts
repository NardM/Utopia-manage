/**
 * Created by nardm on 04.11.16.
 */



  export interface Subcategory {
  id: number;
  name: string;
  key_words: string[];
  from_color: string;
  to_color: string;
  root: boolean;
  sequence: number;
  company: boolean;
}

  export interface Category {
    subcategories: Subcategory[];
    id: number;
    name: string;
    key_words: string[];
    from_color: string;
    to_color: string;
    percent: number;
    min_response_summ: number;
    published: boolean;
    root: boolean;
    sequence: number;
    company: boolean;
  }

  export interface Categories {
    categories: Category[];
  }











