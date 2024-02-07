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
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" name='email' onChange={handleInput}/>
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" name='password' onChange={handleInput}/>
        </div>
 
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </>


    )
}
export default MfaLoginForm