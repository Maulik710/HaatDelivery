
export interface Item {
    id: string;
    name: string;
    image: string;
}

export interface MarketState {
    categories:  { [key: string]: any } | null;
    categoryDetails:  { [key: string]: any }  | null;
    loading: boolean;
    error: string | undefined | null;
}
