import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchBanks} from '@renderer/api/bank';
import {BANKS} from '@renderer/constants/store';
import {Bank, ProtocolType} from '@renderer/types/entities/Bank';
import {Loading, StateSlice} from '@renderer/types/store';
import {fulfilledReducer, pendingReducer, rejectedReducer} from '@renderer/utils/store';

const banksSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchBanks.pending, pendingReducer);
    builder.addCase(fetchBanks.fulfilled, fulfilledReducer);
    builder.addCase(fetchBanks.rejected, rejectedReducer);
  },
  initialState: {
    currentRequestId: undefined,
    entities: [],
    error: null,
    loading: Loading.idle,
  } as StateSlice<Bank[]>,
  name: BANKS,
  reducers: {
    updateNickname: {
      prepare: (nickname = '') => {
        return {
          payload: {
            account_number: '124_ACC',
            default_transaction_fee: '1234',
            ip_address: '198.168.1.1',
            nickname: nickname || '',
            node_identifier: '1234',
            port: 1234,
            protocol: 'http' as ProtocolType,
            trust: '1234',
            version: '1.2.3',
          },
        };
      },
      reducer: (state, action: PayloadAction<Bank>) => {
        state.entities.push(action.payload);
      },
    },
  },
});

export const sampleBanks: StateSlice<Bank[]> = {
  currentRequestId: undefined,
  entities: [
    {
      account_number: '124',
      default_transaction_fee: '1234',
      ip_address: '198.168.1.0',
      nickname: '',
      node_identifier: '1234',
      port: 123,
      protocol: 'http',
      trust: '1234',
      version: '1.2.3',
    },
  ],
  error: null,
  loading: Loading.idle,
};
export const {updateNickname: updateBankNickname} = banksSlice.actions;

export default banksSlice;
