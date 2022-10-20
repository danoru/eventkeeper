import Head from "next/head";
import Layout from "../components/layout/layout";

import "../styles/global.css";

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>EventKeeper</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
