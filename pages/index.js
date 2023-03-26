import { Amplify, DataStore } from "aws-amplify";
import styles from "../styles/Home.module.css";
import { Icon, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../src/aws-exports";
import { Storage } from "@aws-amplify/storage";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import {
  Button,
  IconButton,
  Popover,
  Box,
  Stack,
  Input,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import { Days } from "@/src/models";


Amplify.configure(awsExports);

function Home({ signOut, user }) {
  const [images, setImages] = useState([]);
  const [imageKeys, setImagekeys] = useState([]);
  const [pastImages, setPastImages] = useState(false);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [properties, setProperties] = useState(["weight"]);
  const [textInputs, setTextInput] = useState();
  const day = new Object();
  // retrieveImages();
  async function uploadFile(e) {
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
      results.sort((a, b) => {
        let da = new Date(a.lastModified),
          db = new Date(b.lastModified);
        return da - db;
      });
      var imageList = [];
      for (var i = 0; i < results.length; i++) {
        imageList.push(await Storage.get(results[i].key, { level: "private" }));
      }

      // get key from Storage.list
      setImagekeys(results);
      setImages(imageList);
    }
  }
  async function deleteImage(index) {
    await Storage.remove(imageKeys[index].key, { level: "private" });
    retrieveImages();
  }

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? "simple-popover" : undefined;

  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;

  async function sendProperties(){
    await DataStore.save(
      new Days({
        properties: day, 
        index: images.length,
      
      })
    );
  }
  return (
    <>
      <div className={styles.header}>
        <h1>Hello, {user.attributes.name}</h1>

        <div className={styles.signOutButton}>
          <button onClick={signOut}>Sign out</button>
        </div>
      </div>
      <button onClick={retrieveImages}>Load Images</button>
      Properties: {properties.join(", ")}
      <IconButton
        aria-describedby={id2}
        onClick={handleClick2}
        size="small"
        style={{
          border: "1px solid black",
          borderRadius: "2px",
          marginLeft: "3px",
        }}
      >
        <Add sx={{ fontSize: "15px" }} />
      </IconButton>
      <Popover
        id={id2}
        open={open2}
        anchorEl={anchorEl2}
        onClose={handleClose2}
        anchorOrigin={{
          horizontal: "right",
          vertical:'bottom'
        }}
      >
        <Input
          type="text"
          onChange={() => {
            setTextInput(event.target.value);
          }}
        />
        <Button
          onClick={() => {
            handleClose2();
            if (textInputs.length > 0) {
              setProperties([...properties, textInputs]);
            }
            setTextInput("");
          }}
        >
          Submit
        </Button>
      </Popover>
      <div className={styles.imageGrid}>
        {images[0] != undefined &&
          images.map((image, index) => (
            <div key={index}>
              <div style={{ textAlign: "center" }}>
                Day {index + 1}
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    deleteImage(index);
                  }}
                  style={{ marginRight: "2px" }}
                >
                  <DeleteIcon />{" "}
                </IconButton>
              </div>

              <img
                style={{ borderRadius: "10px", border: "2px solid black" }}
                alt="a"
                src={image}
                width={200}
                height={200}
              />
            </div>
          ))}
      </div>
      <IconButton
        aria-describedby={id1}
        variant="contained"
        onClick={handleClick1}
        style={{ marginTop: "20px", borderRadius: "10px" }}
      >
        <Add sx={{ fontSize: 200 }} />
      </IconButton>
      <Popover
        id={id1}
        open={open1}
        anchorEl={anchorEl1}
        onClose={handleClose1}
        anchorOrigin={{
          horizontal: "right",
          vertical:'bottom'
        }}
      >
        <Input
          type="file"
          onChange={() => {
            day.file = event.target.files[0];
          }}
        />
        <p>Properties</p>
        <div className={styles.propertiesColumn}>
          {true &&
            properties.map((property, index) => (
              <div key={index} className={styles.propertiesRow}>
                <TextField
                  onChange={() => {
                    console.log(day);
                    day[property] = event.target.value;
                  }}
                  size="small"
                  label={property}
                  type="number"
                />
              </div>
            ))}
        </div>
        <Button onClick={sendProperties}>Submit</Button>
      </Popover>
    </>
  );
}

export default withAuthenticator(Home);
