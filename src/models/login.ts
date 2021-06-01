import type { Effect, Reducer } from 'umi'

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
      console.log(payload, '這裏是登錄')
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
