import request from '@/utils/request'
import { IEditForm, IMeta } from './types'

export function reqRows(params: IMeta) {
  return request('api/users', { params })
}

export function editRow({ values, id }: { values: IEditForm, id: number }) {
  return request('api/users/' + id, { method: 'put', params: values })
}

export function delRow({ id }: { id: number }) {
  return request('api/users/' + id, { method: 'DELETE' })
}

export function addRow({ values }: { values: IEditForm }) {
  return request('api/users', { method: 'POST', params: values })
}
