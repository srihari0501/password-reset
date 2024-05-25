import React, { useState } from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import AxiosService from '../common/ApiService';
import { toast } from 'react-toastify';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  const [email,setEmail]  = useState("")
  const [password,setPassword] = useState("")
  let navigate = useNavigate();

  const existUser  = async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      let res = await AxiosService.post('/user/login',{
        email,
        password
      })
      if(res.status==201){
       toast.success("Login successfully")
       
       sessionStorage.setItem("userName",res.data.user.userName)
       sessionStorage.setItem('email',res.data.user.email)
       navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
      toast.error("Incorrct email or password")
    }
    finally{
      setLoading(false)
    }
  }

  

  return (
    <>
    {loading && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="login">
  
        <h2>Login</h2>
        <h3>Welcome back!</h3>

        <form className="login-form">
          <div className="textbox">
            <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <span className="material-symbols-outlined"> email </span>
          </div>

          <div className="textbox">
            <input
              type={showPassword ? 'text' : 'password'} // Here is the change
              placeholder="Password" onChange={(e)=>setPassword(e.target.value)}
            />
            <span  className="material-symbols-outlined">
              {' '}
              lock{' '}
            </span>
           </div>

           <div  id='ch' style={{display:'flex',marginTop:"px"}}>
            <input style={{width:"15px",margin:"-18px 6px 0px 0px"}}
              type="checkbox"
              checked={showPassword}
              onChange={togglePasswordVisibility}
              
            /> 
            
            <span id='sp' style={{marginRight:"45px",color:'white' }}>
              Show Password
            </span>
            &nbsp; &nbsp;
            <span id='sp' style={{ color: 'white', cursor: 'pointer' }} onClick={()=>navigate('/forgetpassword')}>
              Forgot Password ?{' '}
            </span>

</div>

          <button type="submit"  onClick={(e)=>existUser(e)} > LOGIN</button>

          <p style={{ color: 'white', fontSize: '18px' }}>
            Create Account ?&nbsp; &nbsp;{' '}
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/signup')}>
              {' '}
              Signup
            </span>{' '}
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;