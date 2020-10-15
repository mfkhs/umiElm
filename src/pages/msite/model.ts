import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getMistedata } from '@/until/api';

export interface MisteModelState {
  miste: object;
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

const MsiteModle: MisteModelType = {
  namespace: 'miste',
  state: {
    miste: {},
  },
  reducers: {
    getMsite(state, { payload }) {
      console.log(payload);
      return payload;
    },
  },
  effects: {
    *reqMsite({ payload }, { call, put }) {
      const data = yield call(getMistedata);
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
