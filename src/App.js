import './App.css';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import User from './Components/Users/User';
import PrivateRoutes from './Components/PrivateRoutes';
import NavBar from './Components/NavBar/NavBar';
import Homepage from './Components/Homepage/Homepage';
import Quiz from './Components/Quiz/Quiz';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import ShowUser from './Components/Users/ShowUser';
import UserSignup from './Components/Users/UserSignup/UserSignup';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import UserLogin from './Components/Users/UserLogin/UserLogin';
import Posts from './Components/Posts/Posts/Posts';
import ShowUserPosts from './Components/Users/ShowUserPosts';
import UserAccountDelete from './Components/Users/UserAccountDelete';
import UserAccountUpdate from './Components/Users/UserAccountUpdate';
import UserDeleteSuccess from './Components/Users/UserDeleteSuccess';
import CreatePostForm from './Components/Posts/CreatePostForm';
import UserLogOut from './Components/Users/UserLogOut/UserLogOut';
import axios from 'axios';
import Users from './Components/Users/Users/Users';
import { useEffect, useState } from 'react';


const API_URL = "http://localhost:3000/api/v1/users";

// This function is used to get the data from the API
function getAPIData() {
  return axios.get(API_URL).then((response) => response.data)
}

// This is the main function that is called when the app is run
function App() {

  // This is the state that is used to store the data from the API
  const [users, setUsers] = useState([]);

  // This is the state that is used to store the current user
  const [currUser, setCurrUser] = useState(null);

  // This is the state that is used to store the posts
  const [posts, setPosts] = useState([]);

  // This is the state that is used to store the show state
  const [show, setShow] = useState(true);

  // This is a hook that is called when the app is run
  useEffect(() => {
    let mounted = true;
    getAPIData().then((data) => {
          if (mounted) {
            setUsers(data);
          }
        });
    return () => mounted = false;
  }, []);

  // This is the HTML that is rendered
  return (
    <div className="App">
      <Header />
      <NavBar />

      <Routes>

        {/* PUBLIC ROUTES */}
          {/* HOME */}
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/Quiz" element={<Quiz />}></Route>

          {/* SIGNUP & LOGIN */}
          <Route path="/api/v1/login" element={<UserLogin setCurrUser={setCurrUser} setShow={setShow} />}></Route>
          <Route path="/api/v1/signup" element={<UserSignup setCurrUser={setCurrUser} />}></Route>

          <Route path="/api/v1/current_user" element={<User currUser={currUser} setCurrUser={setCurrUser} />}></Route>

          {/* OTHER */}
          <Route path='*' element={<PageNotFound />}></Route>

          {/* PRIVATE ROUTES */}
          <Route element={<PrivateRoutes />} >

            {/* QUIZZES */}

            {/* SIGNUP & LOGIN */}
            <Route path="/api/v1/logout" element={<UserLogOut setCurrUser={setCurrUser} t/>} ></Route>
            <Route path="/api/v1/posts/" element={<Posts posts={posts} setPosts={setPosts} />}></Route>

            {/* USERS */}

            <Route path="/api/v1/users" element={<Users users={users} setUsers={setUsers} />}></Route>
            <Route path="/api/v1/users/:id" element={<ShowUser />}></Route>
            <Route path="/api/v1/users/:id/update" element={<UserAccountUpdate setUsers={setUsers} />}></Route>
            <Route path="/api/v1/users/:id/delete" element={<UserAccountDelete />}></Route>
            <Route path="/api/v1/users/:id/delete/success" element={<UserDeleteSuccess />}></Route>

            {/* POSTS */}
            <Route path="/api/v1/posts/" element={<Posts posts={posts} setPosts={setPosts} />}></Route>
            <Route path="/api/v1/users/:id/posts" element={<ShowUserPosts />}></Route>
            <Route path="/api/v1/posts/new" element={<CreatePostForm />}></Route>
          </Route>

      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
