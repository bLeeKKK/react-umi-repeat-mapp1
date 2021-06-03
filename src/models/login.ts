import type { Effect, Reducer } from 'umi'
import { fakeAccountLogin } from '@/services/login'

export type StateType = {
  status?: string,
  type?: string,
}

type LoginModelType = {
  namespace: string
  state: StateType
  effects: {
    login: Effect
    logout: Effect
  },
  reducers: {
    changeLoginStatus: Reducer<StateType>
  }
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(fakeAccountLogin, payload)
      console.log(res, '這裏是登錄')
    },
    *logout({ payload }, { call, put }) { }
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state
      }
    }
  }
}

export default Model
