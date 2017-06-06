export declare module ServiceRequestInterface {

  export interface Request {
    id: number;
    title_label: string;
    status: number;
    icon_hash: string;
    show_count: number;
    response_count: number;
    chat_id: number;
    user_id: number;
    from_color: string;
    to_color: string;
    title: string;
    subtitle_label: string;
    subtitle: string;
    details_label: string;
    details: string;
    responses: number[];
    confirm_id: number;
    form_id: number;
    logo: string;
    category_id: number;
    category_name: string;
  }

  export interface ServiceRequest {
    total_count: number;
    requests: Request[];
  }

}

