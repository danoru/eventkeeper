import { Fragment } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <title>Party!</title>
      <meta name="description" content="Party" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
