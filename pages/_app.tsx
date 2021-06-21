import type { AppProps } from 'next/app'
import Head from 'next/head'
import {
  ChakraProvider,
  extendTheme
} from '@chakra-ui/react'
import Layout from 'components/Layout'
import { Web3Provider } from 'context/AppContext'

const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif"
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Poppins:ital,wght@0,500;1,500&amp;display=swap" rel="stylesheet"></link>
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐰</text></svg>`}
        />
      </Head>

      <Web3Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3Provider>
    </ChakraProvider>
  );
}

export default App;