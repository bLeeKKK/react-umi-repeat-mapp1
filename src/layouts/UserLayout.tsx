import React from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { getPageTitle, getMenuData, DefaultFooter } from "@ant-design/pro-layout"
import { useIntl, SelectLang, Link, FormattedMessage } from 'umi'
import type { ConnectProps } from 'umi'
import styles from "./UserLayout.less"
import logo from "../assets/logo.svg"

export type UserLyoutProps = Partial<ConnectProps>

const UserLyout: React.FC<UserLyoutProps> = (props) => {

  const {
    route = {
      routes: []
    }
  } = props
  const { routes = [] } = route
  const {
    children,
    location
  } = props
  const { formatMessage } = useIntl()
  const { breadcrumb } = getMenuData(routes)

  const title = getPageTitle({
    pathname: location?.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  })

  return <>
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <Link to="\">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>Ant Design</span>
            </Link>
            <div className={styles.desc}>
              <FormattedMessage
                id="pages.layouts.userLayout.title"
                defaultMessage="默认消息"
              />
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter />
      </div>
    </HelmetProvider>
  </>
}

export default UserLyout
