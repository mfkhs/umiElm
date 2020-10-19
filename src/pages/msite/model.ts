import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { resCityGuess } from '@/until/api';

export interface MisteModelState {
  abbr: string;
  area_code: string | number;
  id: number;
  is_map: boolean;
  latitude: number;
  longitude: number;
  name: string;
  pinyin: string;
  sort: number;
}
export interface MisteModelType {
  namespace: 'miste';
  state: MisteModelState;
  effects: {
    reqMsite: Effect;
  };
  reducers: {
    // getMsite: Reducer<MisteModelState>;
    // 启用 immer 之后
    getMsite: ImmerReducer<MisteModelState>;
  };
  subscriptions: { setup: Subscription };
}

const initialMsiteState = {
  abbr: '',
  area_code: '',
  id: 0,
  is_map: true,
  latitude: 0,
  longitude: 0,
  name: '',
  pinyin: '',
  sort: 0,
};
const MsiteModle: MisteModelType = {
  namespace: 'miste',
  state: initialMsiteState,
  reducers: {
    getMsite(state, { payload }) {
      console.log(state, payload);
      return payload;
    },
  },
  effects: {
    *reqMsite({ payload }, { call, put }) {
      const data = yield call(resCityGuess);
      yield put({
        type: 'getMsite',
        payload: data,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/msite') {
          dispatch({
            type: 'reqMsite',
          });
        }
      });
    },
  },
};

export default MsiteModle;
