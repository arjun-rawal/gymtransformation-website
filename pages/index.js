import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../src/aws-exports'
Amplify.configure(awsExports);

function Home({ signOut, user }) {
  return (
    <>
      <h1>Hello {user.attributes.name}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(Home);