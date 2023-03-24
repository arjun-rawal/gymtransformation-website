import {Amplify} from "aws-amplify"
import awsconfig from "../src/aws-exports"
import '@aws-amplify/ui-react/styles.css'

Amplify.configure({...awsconfig,ssr:true})

function MyApp({ Component, pageProps }) {
      return <Component {...pageProps} />
}

export default MyApp