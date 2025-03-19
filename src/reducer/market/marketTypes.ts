
export interface Item {
    id: string;
    name: string;
    image: string;
}

export interface MarketState {
    categories: any | null;
    categoryDetails: any | null;
    loading: boolean;
    error: string | undefined | null;
}
