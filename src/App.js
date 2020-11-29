import React, { useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Main from './components/main/Main'
import MainAdmin from './components/admin/mainadmin/MainAdmin'
import NewUser from './components/admin/newuser/NewUser'
import { ReactComponent as LogoUser } from './imgs/logoUser.svg'
import Login from './components/login/Login'
import MemberLogin from './components/member/MemberLogin'

function App() {

  const memberConnected = (respUserName) => {
    setMemberSpace(<MemberLogin userName={respUserName}/>)
  }

  let [MemberSpace, setMemberSpace] = useState(<Login memberConnected = {(memberConnected)} />)
  let [memberOpen, setMemberOpen] = useState(false)

  useEffect(() => {
    let token = localStorage.getItem('Token') || sessionStorage.getItem('Token')
    let userName = localStorage.getItem('UserName') || sessionStorage.getItem('UserName')
    if (token) {
      fetch('http://localhost:5000/api/users/verifytoken', {
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'authorization': token }
      })
        .then(res => res.json())
        .then(data => {
          if (data.state === 'success') { setMemberSpace(<MemberLogin userName={userName} />) }
        })
    }

  }, [])

  const openMember = () => {
    memberOpen?setMemberOpen(false):setMemberOpen(true)
  }

  return (
    <div className="App">

      <header>
        <h1>MEDELI PLATEFORME</h1>
        <div id="member" onClick={openMember}><LogoUser/></div>
      </header>
      {memberOpen && <div>{MemberSpace}</div>}
      <BrowserRouter><Switch>

        <Route path="/" exact component={Main}></Route>
        <Route path="/admin/ajout_utilisateur" exact component={NewUser}></Route>
        {/* <Route path="/signup" exact component={Signup}></Route> */}
        <Route path="/admin" exact component={MainAdmin}></Route>
        <Redirect to="/" />

      </Switch></BrowserRouter>

      <footer>

      </footer>

    </div>
  );
}

export default App;
