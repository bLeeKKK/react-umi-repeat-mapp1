import request from '@/utils/request'

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export const fakeAccountLogin = (params: LoginParamsType) => {
  return request('/api/login/account', {
    method: "POST",
    data: params
  })
}