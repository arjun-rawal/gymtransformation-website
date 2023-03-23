import { Amplify } from 'aws-amplify';
import styles from '../styles/Home.module.css'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../src/aws-exports'
import { Storage } from "@aws-amplify/storage"
import Image from 'next/image';

Amplify.configure(awsExports);

function Home({ signOut, user }) {
  async function handleFileSubmit(e) {
    const file = e.target.files[0];
    try {
      await Storage.put(file.name, file, {
        contentType: "image/png", // contentType is optional
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    var signedURL;
    Storage.list('') // for listing ALL files without prefix, pass '' instead
      .then(({ results }) => getImage(results))
      .catch((err) => console.log(err));
    async function getImage(results){
    const signedURL = await Storage.get(results[0].key); // get key from Storage.list
    console.log(signedURL);
    }
  }


  return (
    <>
    <div className={styles.header}>
      <h1>Hello, {user.attributes.name}</h1>
      
    <div  className={styles.signOutButton}>
    <button onClick={signOut}>Sign out</button>
    </div>
    </div>


    <input type="file" onChange={handleFileSubmit}/>
    
    {/* <img alt="a" width={200} height={200} src='https://progress-pics20913-staging.s3.us-east-1.amazonaws.com/public/IMG_5949%20%281%29%20%281%29.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZ4VINROVYEPCSOUP%2F20230323%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230323T005646Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCjFNlkOb8rW7BnfNuIjro3Dw1UZpBp1jmMymjEFWGpxAIhAKobbJpiE5X2qyCjm5bWkplWoxD3FI3uKrQYR0QOrd6FKs0ECLL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjgwMDMxNzgzODUxIgyog1BfCz44pWT32xcqoQSY7%2BGi1SRjgx4DNMAeC05C3XAxMfX08ozMlMt2OVxyGgIpJ1jPcZsZbtstLXPT0DKQlxJJZ4A5AzmFcShH5fLhSV5WqT%2BP4fMJFlkNof39EP99CNtqQKOkqWscM8QzwTLOQIks0HBlqrIXnI70x5YpI4NHac1Wx0rMXGum%2BEuo%2FHeWysYr0%2FgtN6VAqAxQfc0zrcObVcNKStgmRAnUSeL%2BKH%2BNuGrS77BPisutuoOp1Wm0nbBtKIC8EwNcYJV4fs9fKhQkiXDyDdVXwkKTGLq135f6sVfyaIVStbQ6kgpr4V90g5yfA8pZ3Yw7rALjmYqA1IDOJRLobUIE9Vh7uqB1Ie87BQLRuwxHHpDmjs85thguPS4C4y9BgIeoWlxkPjf7QtNTmjq5W40ZVUJI4a3M8UpdPUiwExKgEbZrKpEcYkkNaMBsrzhrsFp4Qy4syZZOAYQtzRzWfVsP5bldlm%2BWK3Vu%2FesyIzD91hcHS0MZiIB7tgn%2Bg%2FTX2%2FIVgOHTMa9qw%2FFuaFKitxN8nfg%2F75KxIZoQJz1nuqlnXfjHFiXpwlUIjsxScdzmnWVKx90sDzZSXToMfa6MCNZvVFQ%2B1sAr9PtxC3dA%2BBTr8Uolqpifcnkf4OY66qMbRBp7m%2FxLeD8ehBzZ8OeGX1akKJDjVeQOK7j62HU9Rbs5KcT8zUF1JflA2UoikEGy6qUJGlRsHsc8qlL%2BECBfy%2FyIKs2LrHEqfTDSx%2B6gBjqEAqPGp6Tu97BSGn9qgwoNLJwx%2B3jSlBAHnSYZaZmU4kOSWNOu7Vkf5II9G4DiCTBlihllnqdp%2Bjk2v7A2qDvRPWobtqGXcpf3qBPWURaZDFGGOG6ovo9yUV5Ib8R8zr0JZO0jvZg9NLuRtWhnUjXt8yaG%2FiEyi0%2Fb8N2JOxo%2FGiEJ90FbfQrAsPhjkDqNUg2zf2m%2BDsvAigi50No74%2F%2F7Nkwm7mq9%2FM9J3t5ZW75lqnKZEEDEulscceV7oUSUWvqarw5Gbq3l4vSNPl5lVO9YfZxAWZCx6ekfob36mCqerhTK53S7%2B4hhZyfG7DdnUDjK%2F75OTVqsKwF1kwFVYz6HJU5bXnRb&X-Amz-Signature=898e1ee340abac8887ae0bda3088063853e91b71c15904001483d9050f5b9513&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js%2F3.6.1%20os%2FWindows%2FNT_10.0%20lang%2Fjs%20md%2Fbrowser%2FChrome_111.0.0.0%20api%2Fs3%2F3.6.1%20aws-amplify%2F5.1.3_js&x-id=GetObject'/> */}
    </>
  );
}

export default withAuthenticator(Home);