import { CarrinhoContextState, CarrinhoAction, CarrinhoItemProps } from "@/types/carrinho";

export const initialState: CarrinhoContextState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    isLoading: true,
    isInitialized: false,
};

const calculateTotals = (items: CarrinhoItemProps[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantidade, 0);

    const totalPrice = items.reduce((sum, item) => {
        const price = item.produto?.preco_calculado ?? item.produto?.preco ?? 0;
        return sum + price * item.quantidade;
    }, 0);

    return { totalItems, totalPrice };
};

export const carrinhoReducer = ( state: CarrinhoContextState, action: CarrinhoAction ): CarrinhoContextState => {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, isLoading: action.payload };

        case "SET_CARRINHO":
            const items = action.payload;
            const { totalItems, totalPrice } = calculateTotals(items);
            return {
                ...state,
                items,
                totalItems,
                totalPrice,
                isLoading: false,
                isInitialized: true,
            };

        case "LIMPAR_CARRINHO":
            return { ...initialState, isLoading: false, isInitialized: true };

        default:
            return state;
    }
};
