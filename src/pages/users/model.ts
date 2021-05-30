
import { reqRows, editRow, delRow, addRow } from './service'
import { IUserModel } from './types'

const UserModel: IUserModel = {
  namespace: 'users',
  state: {
    name: '用户列表',
    data: [],
    meta: {
      page: 1,
      per_page: 5,
      total: 0
    }
  },
  reducers: {
    getList(state, { payload }) {
      return {
        ...state,
        data: payload.data,
        meta: payload.meta,
      }
    }
  },
  effects: {
    *reqUserList({ payload }, { call, put }) {
      const data = yield call(reqRows, {
        page: 1,
        per_page: 50,
      })
      yield put({
        type: 'getList',
        payload: data
      })
    },
    *editUser({ payload }, { call, put }) {
      yield call(editRow, payload)
      yield put({
        type: 'reqUserList'
      })
    },
    *delUser({ payload }, { call, put }) {
      yield call(delRow, payload)
      yield put({
        type: 'reqUserList'
      })
    },
    *addUser({ payload }, { call, put }) {
      yield call(addRow, payload)
      yield put({
        type: 'reqUserList'
      })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'reqUserList',
          })
        }
      })
    }
  }
}

export default UserModel
