import logo from './logo.svg';
import './App.css';
import { Login } from './Pages/Login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { CreatePage } from './Pages/CreatePage';
import { MoviesPage } from './Pages/MoviesPage';
import { SubscriptionsPage } from './Pages/SubscriptionsPage';
import { UsersPage } from './Pages/UsersPage';
import { UserViewPage } from './Pages/Users/UserViewPage';
import { UserAddPage } from './Pages/Users/UserAddPage';
import { UserEditPage } from './Pages/Users/UserEditPage';
import { MemberViewPage } from './Pages/Members/MemberViewPage';
import { MemberEditPage } from './Pages/Members/MemberEditPage';
import { MemberAddPage } from './Pages/Members/MemberAddPage';
import { ErrorPage } from './Pages/ErrorPage';
import { MovieViewPage } from './Pages/Movies/MovieViewPage';
import { MovieAddPage } from './Pages/Movies/MovieAddPage';
import { MovieEditPage } from './Pages/Movies/MovieEditPage';
function App() {
  return (
    <div className="App">
      <div style={{textAlign:"left", marginLeft:"10px"}}>
        <hr></hr>
            <h1>Movies Subscriptions Web Site</h1>
      {/* <Login/> */}
      <Router>
      <Routes>
      
        <Route exact path="/" element={<Login />} />
        <Route exact path="/homepage" element={<HomePage />} >
          <Route exact path="users" element={<UsersPage />} >
            <Route exact path="" element ={<UserViewPage/>}/>
            <Route exact path="add user" element={<UserAddPage/>}/>
          </Route>
          <Route exact path="edituser/:id" element={<UserEditPage/>}/>

          <Route exact path="movies" element={<MoviesPage />} >
              <Route exact path="" element={<MovieViewPage/>}/>
              <Route exact path="add movie" element={<MovieAddPage/>}/>
            </Route>
          <Route exact path="editmovie/:id" element={<MovieEditPage/>}/>
          
          <Route exact path="subscriptions" element={<SubscriptionsPage />} >
              <Route exact path="" element={<MemberViewPage/>}/>
              <Route exact path="add member" element={<MemberAddPage/>}/>
          </Route>

          <Route exact path="editmember/:id" element={<MemberEditPage/>}/>
        </Route>
        <Route exact path="/create" element={<CreatePage />} />
        <Route exact path="/error/:errorstr" element={<ErrorPage/>}/>
      </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
