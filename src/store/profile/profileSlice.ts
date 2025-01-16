import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';

export type UserType = {
  userName: string;
  userAge: string;
  userAvatar: string;
  userEmail: string;
};

export interface THistory {
  id: number;
  status: boolean;
  total: string;
  task: string;
}

export interface ReservationType {
  id: number;
  name: string;
  phone: string;
  hours: string;
  tarif: number;
}

interface Summary {
  statusTrue: number;
  statusFalse: number;
}

export interface ProfileState {
  history: THistory[];
  account: UserType | null;
  isOnboarding: boolean;
  isOnboardingQrCode: boolean;
  isApi: boolean | null;
  reservations: ReservationType[];
  policyPath: string;
  summary: Summary;
}

const initialState: ProfileState = {
  history: [],
  account: null,
  isOnboarding: false,
  isOnboardingQrCode: false,
  isApi: null,
  reservations: [],
  policyPath: '',
  summary: { statusTrue: 0, statusFalse: 0 },
};

export const profileSelector = (state: RootState): ProfileState =>
  state.profile;

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setHistory: (state: ProfileState, { payload }: PayloadAction<THistory>) => {
      state.history = [payload, ...(state.history || [])];

      const summary = state.history.reduce<Summary>(
        (acc, item) => {
          const total = parseFloat(item.total.toString().replace(/\s/g, "")) || 0;

          if (item.status) {
            acc.statusTrue += total;
          } else {
            acc.statusFalse += total;
          }

          return acc;
        },
        { statusTrue: 0, statusFalse: 0 } // Начальное значение
      );

      state.summary = summary;
    },
    setPolicyPath: (state, { payload }: PayloadAction<string>) => {
      state.policyPath = payload;
    },
    setIsApi: (state, { payload }: PayloadAction<boolean | null>) => {
      state.isApi = payload;
    },
    addReservations: (state, { payload }: PayloadAction<ReservationType>) => {
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

export const profileActions = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
