import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { resCurrentcity, reqSearchplace } from '@/until/api';
import { cityInfo } from '@/until/tsinfarfance'

export interface CityModelType {
  namespace: 'city';
  state: cityParps;
  effects: {
    cityName: Effect;
    searchCity: Effect;
    saveHisyoryList: Effect
  };
  reducers: {
    // getMsite: Reducer<MisteModelState>;
    // 启用 immer 之后
    getCityName: ImmerReducer<cityInfo>;
    getSearchCity: ImmerReducer<cityInfo>
    gethistoryList: ImmerReducer<cityInfo>;

  };
  subscriptions: { setup: Subscription };
}

export interface cityParps {
  cityInfo: cityInfo;
  citySearch: cityInfo[];
  historyList: cityInfo[];
  showClearAll: boolean;
  showSearchData: boolean;
}
const initialCityState: cityParps = {
  cityInfo: {
    abbr: '',
    area_code: '',
    id: 1,
    is_map: true,
    latitude: 0,
    longitude: 0,
    name: '',
    geohash: 0,
    pinyin: '',
    sort: 0,
  },
  citySearch: [],
  historyList: [],
  showClearAll: false,
  showSearchData: false,
};


const CityModle: CityModelType = {
  namespace: 'city',
  state: initialCityState,
  reducers: {
    getCityName(state, { payload }) {
      const newState = {
        ...state,
        ...payload,
      };
      return newState;
    },
    getSearchCity(state, { payload }) {
      const newState = {
        ...state,
        ...payload,
      };
      return newState;
    },
    gethistoryList(state, { payload }) {
      const newState = {
        ...state,
        ...payload,
      };
      return newState;
    }
  },
  effects: {
    *cityName({ payload }, { call, put }) {
      const data = yield call(resCurrentcity, payload);
      yield put({
        type: 'getCityName',
        payload: {
          cityInfo: data
        },
      });
    },
    *searchCity({ payload }, { call, put }) {
      let showSearch = false
      let data = payload.data
      if (payload.value) {
        data = yield call(reqSearchplace, payload);
        if (data.length === 0) {
          showSearch = true
        }
      }
      yield put({
        type: 'getCityName',
        payload: {
          citySearch: data,
          showClearAll: payload.showClearAll,
          showSearchData: showSearch
        },
      });
    },
    *saveHisyoryList({ payload }, { call, put }) {
      yield put({
        type: 'gethistoryList',
        payload: {
          historyList: payload
        },
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      const id = history.location.pathname.substring(6)
      return history.listen(({ pathname }) => {
        if (pathname === `/city/${id}`) {
          dispatch({
            type: 'cityName',
            payload: id
          });
        }
      });
    },
  },
};

export default CityModle;
