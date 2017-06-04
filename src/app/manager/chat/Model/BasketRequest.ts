/**
 * Created by nardm on 04.06.17.
 */
export declare module BasketRequestInterface {

    export interface Respons {
        id: number;
        chat_id: number;
        company_id: number;
    }

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
        id: number;
        logo_hash: string;
        rate: number;
        skin_id: number;
        phone: string;
        email: string;
        work_time: string;
        address: Address;
        master: Master;
        company: Company2;
        search_region_id: number;
        categories: number[];
    }

    export interface Confirm {
        id: number;
        company: Company;
        date_time: number;
        chat_id: number;
        response_id: number;
        request_id: number;
        review_id: number;
    }

    export interface Respons {
        id: number;
        chat_id: number;
        company_id: number;
    }

    export interface Request {
        id: number;
        status: number;
        from_color: string;
        to_color: string;
        title_label: string;
        title: string;
        subtitle_label: string;
        subtitle: string;
        details_label: string;
        details: string;
        chat_id: number;
        responses: Respons[];
        form_id: number;
        category_id: number;
        need_distance: boolean;
        show_count: number;
        response_count: number;
        confirm: Confirm;
    }

    export interface BasketRequest {
        requests: Request[];
    }

}