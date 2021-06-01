import { Loading } from 'umi'
import type { StateType } from './login'

export type ConnectState = {
  login: StateType
  loading: Loading
}
