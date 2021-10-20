import React, {useState} from 'react'
import './App.css';
import Post from './Post'

function App() {
  const [posts, setPosts] = useState([
    {
      userName : "farishjamal_",
      caption : "Lets Gooo!!",
      imgUrl: "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/1:1/w_722,h_722,c_limit/phonepicutres-TA.jpg"
    },
    {
      userName : "faisaleqbal",
      caption : "safarnama;)",
      imgUrl: "https://www.blog.motifphotos.com/wp-content/uploads/2020/01/girl-taking-a-picture-of-the-sunset-over-the-amsterdam-canal_t20_x6PYVl-250x250.jpg"
    },{
      userName : "ehtesham01",
      caption : "wasssuppppp",
      imgUrl: "https://lh3.googleusercontent.com/proxy/1beKEJfKCZea1TDfmek1TGPMG0IW8P4wZNbfkwZ8TecSECNY1hylFlrV2rzDynPb7cln7_dmlp-TaqCPSDigEPxiR6KefFwfEP44qeCTbO09k06KhQpUy00_xv7OnXkp4sYRQuT2QYKNAiqBZ1ajVO36T102KRV0XYkD80ZFgY9A9gnh17hugTbHa3creLDzECoKU28etsMWIkjvwgQ"
    }
  ])
  return (
    <div className="app">
       <div className="app__header">
         <img className="app__headerImage" src="https://clipart.info/images/ccovers/1522452762Instagram-logo-png-text.png" alt="Logo-main" />
       </div>
       <div className="app__body">
         {
           posts.map(element => (
             <Post 
               userName={element.userName}
               caption={element.caption}
               imgUrl={element.imgUrl}
             />
           ))
         }
         
       </div>
    </div>
  );
}

export default App;
