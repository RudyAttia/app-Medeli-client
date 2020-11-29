import React, { useState } from 'react'

export default function NewUser() {
    let [inputs, setInputs] = useState({ auth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] })

    const handleChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
    }

    const authHandleChange = (event) => {
        event.persist();
        let oldAuth = inputs.auth
        switch (event.target.name) {
            case 'admin':
                if (oldAuth[0]) oldAuth[0] = 0
                else oldAuth[0] = 1
                break;
            case 'anglais':
                if (oldAuth[1]) oldAuth[1] = 0
                else oldAuth[1] = 1
                break;
            case 'francais':
                if (oldAuth[2]) oldAuth[2] = 0
                else oldAuth[2] = 1
                break;
            case 'espagnol':
                if (oldAuth[3]) oldAuth[3] = 0
                else oldAuth[3] = 1
                break;
            case 'italien':
                if (oldAuth[4]) oldAuth[4] = 0
                else oldAuth[4] = 1
                break;
            case 'allemand':
                if (oldAuth[5]) oldAuth[5] = 0
                else oldAuth[5] = 1
                break;
            case 'word':
                if (oldAuth[6]) oldAuth[6] = 0
                else oldAuth[6] = 1
                break;
            case 'excel':
                if (oldAuth[7]) oldAuth[7] = 0
                else oldAuth[7] = 1
                break;
            case 'outlook':
                if (oldAuth[8]) oldAuth[8] = 0
                else oldAuth[8] = 1
                break;
            case 'powerpoint':
                if (oldAuth[9]) oldAuth[9] = 0
                else oldAuth[9] = 1
                break;
            default:
                return
        }
        setInputs({ ...inputs, auth: oldAuth })
    }


    const submitSignUp = (event) => {
        event.preventDefault();
        console.log(inputs)
        let { first_name, last_name, mail, tel, password } = inputs;
        if (first_name && last_name && password && mail && tel) {
            fetch('http://localhost:5000/api/users/add', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs)
            }).then(res => res.json())
                .then(resp => {
                    if (resp.state === 'error') {
                        console.log(resp)
                    }
                    else { console.log('utilisateur ajouter avec succes') }
                })
        }
        else { console.log("not all inputs") }
    }

    return (
        <>
            <div id="divsignup">
                <h2>CREER UN UTILISATEUR</h2>
                <form onSubmit={submitSignUp}>
                    <input type="text" placeholder="Prenom" name="first_name" onChange={handleChange} value={inputs.first_name} autoComplete="off" autoFocus /><br /><br />
                    <input type="text" placeholder="Nom" name="last_name" onChange={handleChange} value={inputs.last_name} autoComplete="off" /><br /><br />
                    <input type="mail" placeholder="Mail" name="mail" onChange={handleChange} value={inputs.mail} autoComplete="off" /><br /><br />
                    <input type="tel" placeholder="Tel" name="tel" onChange={handleChange} value={inputs.tel} autoComplete="off" /><br /><br />
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} value={inputs.password} autoComplete="off" /><br /><br />
                    <div>
                        <p>AUTORISATIONS:</p>
                        <input type="checkbox" name="admin" onChange={authHandleChange} value={inputs.auth[0]} /><label htmlFor="admin">admin</label><br />
                        <input type="checkbox" name="anglais" onChange={authHandleChange} value={inputs.auth[1]} /><label htmlFor="anglais">anglais</label><br />
                        <input type="checkbox" name="francais" onChange={authHandleChange} value={inputs.auth[2]} /><label htmlFor="francais">francais</label><br />
                        <input type="checkbox" name="espagnol" onChange={authHandleChange} value={inputs.auth[3]} /><label htmlFor="espagnol">espagnol</label><br />
                        <input type="checkbox" name="italien" onChange={authHandleChange} value={inputs.auth[4]} /><label htmlFor="italien">italien</label><br />
                        <input type="checkbox" name="allemand" onChange={authHandleChange} value={inputs.auth[5]} /><label htmlFor="allemand">allemand</label><br />
                        <input type="checkbox" name="word" onChange={authHandleChange} value={inputs.auth[6]} /><label htmlFor="word">word</label><br />
                        <input type="checkbox" name="excel" onChange={authHandleChange} value={inputs.auth[7]} /><label htmlFor="excel">excel</label><br />
                        <input type="checkbox" name="outlook" onChange={authHandleChange} value={inputs.auth[8]} /><label htmlFor="outlook">outlook</label><br />
                        <input type="checkbox" name="powerpoint" onChange={authHandleChange} value={inputs.auth[9]} /><label htmlFor="powerpoint">power point</label><br /><br />
                    </div>
                    <input type="submit" value="CREER"/><br /><br />
                </form>
            </div>
        </>
    );
}