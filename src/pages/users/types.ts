import { Effect, Reducer, Subscription } from 'umi';

export interface IDataItem {
  id: number;
  name: string;
  email: string;
  create_time: string;
  update_time: string;
  status: number;
}

export interface IMeta {
  page: number;
  per_page: number;
  total?: number;
}

export interface IUserState {
  name: string;
  data: Array<IDataItem>;
  meta: IMeta;
}

export interface IUserModel {
  namespace: 'users';
  state: IUserState;
  reducers: {
    getList: Reducer;
  },
  effects: {
    reqUserList: Effect;
    editUser: Effect;
    delUser: Effect;
    addUser: Effect;
  },
  subscriptions: {
    setup: Subscription
  }
}

export interface IEditForm {
  name: string
}