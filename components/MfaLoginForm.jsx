import React, {useState} from "react";

const MfaLoginForm = ({handleSubmit}) => {
    const [input, setInput] = useState({}) 
    const handleInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
      }
    console.log("input is ", input)
    return(
    <>
    <p>Please enter your credentials to continue</p>
    <form onSubmit={(e)=>handleSubmit(e, input)}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' onChange={handleInput}/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' onChange={handleInput}/>
        </div>
 
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </>


    )
}
export default MfaLoginForm