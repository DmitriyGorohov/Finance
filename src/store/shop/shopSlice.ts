import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';
import { EventTypeApi } from '../../utils/common.ts';

export const shopSelector = (state: RootState): ShopState => state.shop;

type Product = {
    id: number;
    title: string;
    image: ReturnType<typeof require>;
    price: number;
    favorites: boolean;
    quantity?: number;
};

export interface ShopState {
    totalCount: number;
    itemBasket: { product: Product; quantity: number }[];
    itemFavorites: { product: Product; quantity: number }[];
    items: Product[];
    events: EventTypeApi[];
    enabledApi: boolean | null;
    path: string;
}

const initialState: ShopState = {
    totalCount: 0,
    itemBasket: [],
    itemFavorites: [],
    items: [],
    events: [],
    enabledApi: null,
    path: '',
};

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setPath: (state, { payload }: PayloadAction<string>) => {
            state.path = payload;
        },
        setEvents: (state, { payload }: PayloadAction<EventTypeApi[]>) => {
            state.events = payload;
        },
        setEnabledApi: (state, { payload }: PayloadAction<boolean | null>) => {
            state.enabledApi = payload;
        },
        resetProductToBasket: (state) => {
            state.itemBasket = [];
            state.totalCount = 0;
        },
        addProductToBasket: (state, action: PayloadAction<Product>) => {
            const existingProduct = state.itemBasket.find(
                (item) => item.product.id === action.payload.id
            );

            if (existingProduct) {
                // Если продукт уже в корзине, увеличиваем количество
                existingProduct.quantity += 1;
            } else {
                // Если продукта нет в корзине, добавляем его
                state.itemBasket.push({ product: action.payload, quantity: 1 });
            }

            // Пересчитываем общую сумму
            state.totalCount += action.payload.price;
        },
        removeProductFromBasket: (state, action: PayloadAction<number>) => {
            const productIndex = state.itemBasket.findIndex(
                (item) => item.product.id === action.payload
            );

            if (productIndex !== -1) {
                const product = state.itemBasket[productIndex];
                state.totalCount -= product.product.price * product.quantity;

                // Удаляем продукт из корзины
                state.itemBasket.splice(productIndex, 1);
            }
        },
        decreaseProductQuantity: (state, action: PayloadAction<number>) => {
            const product = state.itemBasket.find(
                (item) => item.product.id === action.payload
            );

            if (product) {
                product.quantity -= 1;
                state.totalCount -= product.product.price;

                // Если количество продукта достигает 0, удаляем его
                if (product.quantity <= 0) {
                    state.itemBasket = state.itemBasket.filter(
                        (item) => item.product.id !== action.payload
                    );
                }
            }
        },
        toggleFavoriteProduct: (state, action: PayloadAction<number>) => {
            const productId = action.payload;

            // Найти продукт в массиве items
            const productInItems = state.items.find(
                (item) => item.id === productId
            );

            if (!productInItems) {
                console.error(
                    `Product with ID ${productId} not found in items`
                );
                return;
            }

            // Проверить, есть ли продукт в избранных
            const favoriteIndex = state.itemFavorites.findIndex(
                (fav) => fav.product.id === productId
            );

            if (favoriteIndex !== -1) {
                // Если продукт уже в избранных, удалить его
                state.itemFavorites.splice(favoriteIndex, 1);
                productInItems.favorites = false; // Обновить поле favorites
            } else {
                // Если продукта нет в избранных, добавить его
                state.itemFavorites.push({
                    product: { ...productInItems },
                    quantity: 0,
                });
                productInItems.favorites = true; // Обновить поле favorites
            }
        },
        visibleItems: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload;
        },
        removeProductFromFavorites: (state, action: PayloadAction<number>) => {
            const productId = action.payload;

            // Удаляем продукт из избранного
            state.itemFavorites = state.itemFavorites.filter(
                (item) => item.product.id !== productId
            );

            // Обновляем поле favorites в массиве items
            const productInItems = state.items.find(
                (item) => item.id === productId
            );
            if (productInItems) {
                productInItems.favorites = false;
            }
        },
    },
});

export const shopSliceReducer = shopSlice.reducer;
export const {
    addProductToBasket,
    resetProductToBasket,
    toggleFavoriteProduct,
    removeProductFromFavorites,
    decreaseProductQuantity,
    removeProductFromBasket,
    visibleItems,
    setEnabledApi,
    setEvents,
    setPath,
} = shopSlice.actions;
