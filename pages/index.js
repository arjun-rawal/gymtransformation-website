import { Amplify } from 'aws-amplify';
import styles from '../styles/Home.module.css'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../src/aws-exports'
import { Storage } from "@aws-amplify/storage"

Amplify.configure(awsExports);

function Home({ signOut, user }) {
  return (
    <>
    <div className={styles.header}>
      <h1>Hello, {user.attributes.name}</h1>
      
    <div  className={styles.signOutButton}>
    <button onClick={signOut}>Sign out</button>
    </div>
    </div>

    <input type="file" />
    </>
  );
}

export default withAuthenticator(Home);