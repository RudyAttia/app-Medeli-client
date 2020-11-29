import React, { useState } from 'react'
import './login.css'

export default function Login(props) {

    let [inputs, setInputs] = useState({ keepme: true, mail: "", password: "" })

    const handleChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
    }

    const handleCkeckChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, keepme: event.target.checked }))
    }

    const submitLogin = (event) => {
        event.preventDefault();
        let { mail, password } = inputs;
        if (mail && password) {
            fetch('http://localhost:5000/api/users/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs)
            }).then(res => res.json())
                .then(resp => {
                    if (resp.state === "error") {
                        console.log("error: " + resp.message)
                    }
                    else if(resp.state === "success"){
                        if (localStorage.getItem('Token')) { localStorage.removeItem('Token') }
                        if (sessionStorage.getItem('Token')) { sessionStorage.removeItem('Token') }
                        if (localStorage.getItem('UserName')) { localStorage.removeItem('UserName') }
                        if (sessionStorage.getItem('UserName')) { sessionStorage.removeItem('UserName') }
                        if (inputs.keepme) {
                            localStorage.setItem('Token', resp.message.token)
                            localStorage.setItem('UserName', resp.message.first_name+' '+resp.message.last_name)
                        }
                        else {
                            sessionStorage.setItem('Token', resp.message.token)
                            sessionStorage.setItem('UserName', resp.message.first_name+' '+resp.message.last_name)
                        }
                        console.log(resp.message)
                        props.memberConnected(resp.message.first_name+' '+resp.message.last_name)
                        if(JSON.parse("[" + resp.message.auth + "]")[0]){
                            window.location.href = "/admin"
                        }
                        
                    }
                })
        }
        else { console.log("not all inputs") }
    }

    return (
        <div id="divlogin">
            <h3>LOGIN</h3><br/>
            <form onSubmit={submitLogin}>
                <input type="mail" placeholder="Mail" name="mail" id="loginMail" onChange={handleChange} value={inputs.mail} autoComplete="off" autoFocus /><br /><br />
                <input type="password" placeholder="Mot de passe" name="password" id="LoginPassword" onChange={handleChange} value={inputs.password} /><br /><br />
                <input type="checkbox" name="keepme" id="keepme" onChange={handleCkeckChange} checked={inputs.keepme} /><label htmlFor="keepme"> Resté connecté</label><br /><br />
                <input id="loginSubmit" type="submit" value="CONNEXION"/><br /><br />
            </form>
            <a href="https://medeli-formation.com/inscription">Pas encore membre</a>
        </div>
    )
}