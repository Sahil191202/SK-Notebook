import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom'

function Login() {
    const host = "https://sk-inotebook.onrender.com";
    const [credentials, setcredentials] = useState("")
    let history = useHistory();
    const handleclick = async (e) =>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken);
            history.push('/');
            alert("Logged In Sucessfully")
        }
        else{
            alert("Invaild Credentials Entered")
        }
    }

    const handlechange =(e)=>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }        

    return (
        <>
            <div className='container'>
                <form onSubmit={handleclick}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' onChange={handlechange}  id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name='password' onChange={handlechange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}
export default Login
