import React from 'react'
// import  { Redirect } from 'react-router-dom'
import './memberLogin.css'

export default function MemberLogin(props) {

    const Disconnected = () => {
        if (localStorage.getItem('Token')) { localStorage.removeItem('Token') }
        if (sessionStorage.getItem('Token')) { sessionStorage.removeItem('Token') }
        if (localStorage.getItem('UserName')) { localStorage.removeItem('UserName') }
        if (sessionStorage.getItem('UserName')) { sessionStorage.removeItem('UserName') }
        window.location.reload(false);
    }

    return (
        <div id="divMember">
            <div>{props.userName}</div>
            <div>vous etes connecte</div><br /><br />
            <div id="disconnectMember" onClick={Disconnected}>DECONNEXION</div>
        </div>
    )
}