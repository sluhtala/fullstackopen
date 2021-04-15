import { useState } from 'react'
const LoginForm = ({user, submit, username, password, setUsername, setPassword})=>{
    if (user)
    return (null);
    return (
        <div>
            <h2>login to application</h2>
            <form onSubmit={(e)=>submit(e)}>
                <div>
                    username
                    <input value={username} onChange={({target})=>setUsername(target.value)}></input>
                </div>
                <div>
                    password
                    <input value={password} onChange={({target})=>setPassword(target.value)}></input>
                </div>
                <input type='submit' value='login'></input>
            </form>
        </div>
    )
}

export default LoginForm;