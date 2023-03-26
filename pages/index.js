import { Amplify } from "aws-amplify";
import styles from "../styles/Home.module.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../src/aws-exports";
import { Storage } from "@aws-amplify/storage";
import Image from "next/image";
import React, { useRef } from "react";
import { useState } from "react";
import {
  Backdrop,
  Button,
  IconButton,
  Input,
  Popover,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
Amplify.configure(awsExports);

function Home({ signOut, user }) {
  const [images, setImages] = useState([]);
  const [imageKeys, setImagekeys] = useState([]);
  const [pastImages, setPastImages] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const hiddenFileInput = useRef(null);
  const handleFileClick = (event) => {
    hiddenFileInput.current.click();
  };

  const [backdropOpen, setBackdropOpen] = useState(false);
  function toggleBackdrop() {
    setBackdropOpen(!backdropOpen);
  }
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();

  return (
    <>
      <div className={styles.header}>
        <h1>Hello, {user.attributes.name}</h1>

        <div className={styles.signOutButton}>
          <button onClick={signOut}>Sign out</button>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
        onClick={()=>{toggleBackdrop();}}
      >
        <img
          style={{ borderRadius: "10px", border: "2px solid black" }}
          alt="a"
          src={images[num1-1]}
          width={800}
          height={800}
        />
        <img
          style={{ borderRadius: "10px", border: "2px solid black" }}
          alt="a"
          src={images[num2-1]}
          width={800}
          height={800}
        />
      </Backdrop>

      <button onClick={retrieveImages}>Load Images</button>
      <button
        aria-describedby={id}
        style={{ marginLeft: "3px" }}
        onClick={handleClick}
      >
        Compare Images
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <TextField
          type="number"
          label="image 1 number"
          onChange={() => {
            setNum1(event.target.value);
          }}
        />
        <TextField
          type="number"
          label="image 2 number"
          onChange={() => {
            setNum2(event.target.value);
          }}
        />
        <Button onClick={toggleBackdrop}>Next</Button>
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

        <IconButton
          aria-describedby={id}
          onClick={handleFileClick}
          variant="contained"
          style={{ marginTop: "20px", borderRadius: "10px" }}
        >
          <Add sx={{ fontSize: 200 }} />
        </IconButton>
      </div>

      <input
        type="file"
        onChange={handleFileSubmit}
        ref={hiddenFileInput}
        style={{ display: "none" }}
      />
    </>
  );
}

export default withAuthenticator(Home);
