import React, { useState } from "react"
import styles from './styles.less'
import ProForm, { ProFormText, ProFormCaptcha, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form'
import { useIntl, connect, FormattedMessage, ConnectProps } from 'umi'
import { Tabs } from 'antd'
import {
  AlipayCircleOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons'
import { ConnectState } from "@/models/connect"
import type { LoginParamsType } from '@/services/login'

const Login: React.FC<ConnectProps> = ({ dispatch }) => {
  const [type, setType] = useState<string>("account")
  const intl = useIntl()

  const handleSubmit = (val: LoginParamsType) => {
    dispatch!({
      type: 'login/login',
      payload: { ...val, type }
    })
  }
  const handleType = (val: string) => {
    setType(val)
  }

  return <>
    <div className={styles.main}>
      <ProForm
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            // loading: true,
            size: "large",
            style: { width: "100%" }
          }
        }}
        onFinish={(values: LoginParamsType) => {
          handleSubmit(values)
          return Promise.resolve()
        }}
      >
        <Tabs activeKey={type} onChange={handleType}>
          <Tabs.TabPane
            key="account"
            tab={intl.formatMessage({
              id: "pages.login.accountLogin.tab",
              defaultMessage: "默认值"
            })}
          ></Tabs.TabPane>
          <Tabs.TabPane
            key="mobile"
            tab={intl.formatMessage({
              id: "pages.login.phoneLogin.tab",
              defaultMessage: "默认值"
            })}
          ></Tabs.TabPane>
        </Tabs>

        {
          type === "account" && <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />
              }}
              name="userName"
              placeholder={intl.formatMessage({
                id: "pages.login.username.placeholder",
                defaultMessage: 'Account password login',
              })}
            />
            <ProFormText.Password
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />
              }}
              name="password"
              placeholder={intl.formatMessage({
                id: "pages.login.password.placeholder",
                defaultMessage: 'Account password login',
              })}
            />
          </>
        }

        {
          type === "mobile" && <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={styles.prefixIcon} />,
              }}
              name="phoneNumber"
              placeholder={intl.formatMessage({
                id: "pages.login.phoneNumber.placeholder",
                defaultMessage: 'phone number',
              })}
            />
            <ProFormCaptcha
              name="captcha"
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={styles.prefixIcon} />,
              }}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${intl.formatMessage({
                    id: 'pages.getCaptchaSecondText',
                    defaultMessage: 'Get verification code',
                  })}`;
                }
                return intl.formatMessage({
                  id: 'pages.login.phoneLogin.getVerificationCode',
                  defaultMessage: 'Get verification code',
                });
              }}
              placeholder={intl.formatMessage({
                id: "pages.login.captcha.placeholder",
                defaultMessage: 'Account password login',
              })}

              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.captcha.required"
                      defaultMessage="Please enter verification code！"
                    />
                  ),
                },
              ]}
              onGetCaptcha={async (mobile) => {
                console.log(mobile)
              }}
            />
          </>
        }
      </ProForm>
    </div>
  </>
}

export default connect(({ login, loading }: ConnectState) => ({
  useLogin: login,
  submitting: loading.effects['login/login'],
}))(Login)
