import React, { useState } from 'react'
import { Button, Input } from "@mui/material";
import {storage , db} from './firebase'
import firebase from '@firebase/app-compat';

function ImageUpload({username}) {

    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot) =>{
                const progress = Math.round(
                    (snapshot.bytesTransferred/ snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (error) => {
                console.log(error);
                error(error.message)
            },
            () =>{
                storage.ref("images").child(image.name).getDownloadURL().then(url => {
                    db.collection("posts").add({
                        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imgUrl : url,
                        username : username
                    })
                    setProgress(0);
                    setImage(null);
                    setCaption("");
                    console.log(username);
                })
            }
        )
    }
    return (
        <div style={{position: 'relative', top: '90px'}} className="img__upload">
            <progress value={progress} max="100" />
            <Input type="text" placeholder="Enter a caption" onChange={e => setCaption(e.target.value)} value={caption} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload} style={{
                  backgroundColor: "lightpink",
                  color: "#000",
                }}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
