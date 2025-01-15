import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';

export type UserType = {
    userName: string;
    userAge: string;
    userAvatar: string;
    userEmail: string;
};

export interface ReservationType {
    id: number;
    name: string;
    phone: string;
    hours: string;
    tarif: number;
};

export interface ProfileState {
    account: UserType | null;
    isOnboarding: boolean;
    isOnboardingQrCode: boolean;
    isApi: boolean | null,
    reservations: ReservationType[];
    policyPath: string;
}

const initialState: ProfileState = {
    account: null,
    isOnboarding: false,
    isOnboardingQrCode: false,
    isApi: null,
    reservations: [],
    policyPath: '',
};

export const profileSelector = (state: RootState): ProfileState =>
    state.profile;

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setPolicyPath: (state, { payload }: PayloadAction<string>) => {
            state.policyPath = payload;
        },
        setIsApi: (state, { payload }: PayloadAction<boolean | null>) => {
            state.isApi = payload;
        },
        addReservations: (
            state,
            { payload }: PayloadAction<ReservationType>
        ) => {
            state.reservations = [payload, ...state.reservations];
        },
        setSaveUser: (state, { payload }: PayloadAction<UserType>) => {
            state.account = payload;
        },
        setIsOnboarding: (state, { payload }: PayloadAction<boolean>) => {
            state.isOnboarding = payload;
        },
        setIsOnboardingQrCode: (state, { payload }: PayloadAction<boolean>) => {
            state.isOnboardingQrCode = payload;
        },
    },
});

export const profileActions =
    profileSlice.actions;
export const profileReducer = profileSlice.reducer;
