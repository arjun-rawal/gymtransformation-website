import { Amplify } from 'aws-amplify';
import styles from '../styles/Home.module.css'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../src/aws-exports'
import { Storage } from "@aws-amplify/storage"
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';

Amplify.configure(awsExports);

function Home({ signOut, user }) {
  const [images, setImages] = useState([""]);

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
    setImages([...images,signedURL]);
    console.log(images);
    }
  }

  const ProgressImages = images.map((image) => (
     <img key={"image"} alt="a" src={image} width={200} height={200} /> 

  ));
console.log(images);

  return (
    <>
    <div className={styles.header}>
      <h1>Hello, {user.attributes.name}</h1>
      
    <div  className={styles.signOutButton}>
    <button onClick={signOut}>Sign out</button>
    </div>
    </div>


    <input type="file" onChange={handleFileSubmit}/>
    <ProgressImages/>
    </>
  );
}

export default withAuthenticator(Home);