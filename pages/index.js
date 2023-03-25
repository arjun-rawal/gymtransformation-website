import { Amplify } from "aws-amplify";
import styles from "../styles/Home.module.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../src/aws-exports";
import { Storage } from "@aws-amplify/storage";
import Image from "next/image";
import React from "react";
import { useState } from "react";

Amplify.configure(awsExports);

function Home({ signOut, user }) {
  const [images, setImages] = useState([]);
  const [pastImages, setPastImages] = useState(false);
  // retrieveImages();
  async function handleFileSubmit(e) {
    const file = e.target.files[0];
    try {
      await Storage.put(file.name, file, {
        level: "private",
        contentType: "image/png",
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    retrieveImages();
  }

  async function retrieveImages() {
    Storage.list("", { level: "private" }) // for listing ALL files without prefix, pass '' instead
      .then(({ results }) => getImage(results))
      .catch((err) => console.log(err));
    async function getImage(results) {
      if (results.length > 0) {
        setPastImages(true);
      }
      results.sort((a,b) =>{
        let da = new Date(a.lastModified),
        db = new Date(b.lastModified);
        return da-db;
      })
      var imageList = [];
      for (var i = 0; i < results.length; i++) {
        console.log(new Date(results[i].lastModified).getTime())
        imageList.push(await Storage.get(results[i].key, { level: "private" }));
      }

      // get key from Storage.list
      setImages(imageList);

    }
  }

  return (
    <>
      <div className={styles.header}>
        <h1>Hello, {user.attributes.name}</h1>

        <div className={styles.signOutButton}>
          <button onClick={signOut}>Sign out</button>
        </div>
      </div>

      <input type="file" onChange={handleFileSubmit} />
      <button onClick={retrieveImages}>Load Images</button>

      <div className={styles.imageGrid}>
      {images[0] != undefined &&
        images.map((image, index) => (
          <div key={index}>
            <p style={{textAlign:'center'}}> {index+1} </p>
            <img style={{borderRadius:'10px',border:'2px solid black'}} alt="a" src={image} width={200} height={200} />
          </div>
        ))}
      </div>
    </>
  );
}

export default withAuthenticator(Home);
