import React , {useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const LOGIN_URL = `${process.env.REACT_APP_BASE_URL}/login`;
    const [inputData , setInputData] = useState({userEmail : '' , userPassword : ''});
    

    const handleChange = (e) => {
        const { name , value } = e.target;
        setInputData({ ...inputData , [name] : value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for(let key in inputData){
            formData.append(key , inputData[key]);
        }

        const response = await fetch( LOGIN_URL , {
            method : "POST",
            body : formData,
            credentials: 'include',
        });
        const responded = await response.json();
        if(responded.Result === true){
            navigate('/');
        }else{
        
        }
    }
  return (
    <div>
      <section className='container-fluid'>
        
        <div className="row vh-100 d-flex justify-content-center align-items-center ">

            <div className="col-4 rounded text-bg-secondary p-3">
                <h2 className="text-center">Admin Login</h2>
                <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label">UserEmail</label>
                    <input type="text" className="form-control" id="userEmail" name="userEmail" placeholder="Please Enter User Email" value={inputData.userEmail} onChange={(e) => handleChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="userPassword" className="form-label">UserPassword</label>
                    <input type="text" className="form-control" id="userPassword" name="userPassword" placeholder="Please Enter User Password" value={inputData.userPassword} onChange={(e) => handleChange(e)}/>
                </div>
                <div className="mb-3 d-flex justify-content-between">
                    <button className="btn btn-primary" type="submit" onClick={(e) => handleSubmit(e)}>LogIn</button>
                </div>
            </div>

        </div>

    </section>
    </div>
  )
}

export default Login
