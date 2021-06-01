import React, { useState } from "react"
import styles from './styles.less'
import ProForm, { ProFormText, ProFormCaptcha, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form'
import { useIntl, connect, FormattedMessage } from 'umi'
import { Tabs } from 'antd'

const User: React.FC<{}> = () => {
  const [type, setType] = useState<string>("account")
  const intl = useIntl()

  const handleSubmit = () => { }
  const handleType = (val: string) => {
    setType(val)
  }

  return <>
    <div className={styles.main}>
      <ProForm
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: true,
            size: "large",
            style: { width: "100%" }
          }
        }}
      // onFinish={(values) => {
      //   handleSubmit(values)
      //   return Promise.resolve()
      // }}
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
              name="userName"
              placeholder={intl.formatMessage({
                id: "pages.login.username.placeholder",
                defaultMessage: 'Account password login',
              })}
            />
            <ProFormText.Password
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
              name="phone"
              placeholder={intl.formatMessage({
                id: "pages.login.username.placeholder",
                defaultMessage: 'Account password login',
              })}
            />
            <ProFormCaptcha
              name="captcha"
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
                id: "pages.login.password.placeholder",
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

export default User
