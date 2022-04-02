import '../styles/globals.css'
import {Provider} from "react-redux";
import store from "../ReduxStore/Store";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
       <SessionProvider session={session}>
            <Provider store={store}>
                 <Component {...pageProps} />
            </Provider>
       </SessionProvider>

  )
}

export default MyApp
