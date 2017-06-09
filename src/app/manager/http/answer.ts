export class EmptyAnswer {
  success :boolean;
  message :ResponseDescription ;
  data: any;
  name: string;
};

export class Answer<T> {
  success :boolean;
  data :T;
  message :ResponseDescription ;
};
export class ResponseDescription {
  code:number;
  message:String;
}
