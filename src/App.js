import './App.css';
import Post from './Post'

function App() {
  return (
    <div className="app">
       <div className="app__header">
         <img className="app__headerImage" src="https://clipart.info/images/ccovers/1522452762Instagram-logo-png-text.png" alt="Logo-main" />
       </div>
       <div className="app__body">
       <Post />
       <Post />
       <Post />
       </div>
    </div>
  );
}

export default App;
