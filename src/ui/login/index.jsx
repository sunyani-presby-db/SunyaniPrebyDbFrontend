import "./styles/index.scss"

import React, { useState } from 'react'
import { Button, Card, Form, Input, message, notification } from "antd"
import logo from "../../assets/images/logo.png"
import Password from "antd/lib/input/Password"
import axios from "axios"
import { loginUrl } from "../../utils/networks/endpoints"
import { axios_config } from "../../utils/networks/axios_config"
import { useHistory } from "react-router"
import LoadingOverlay from 'react-loading-overlay';
import RotateLoader from 'react-spinners/RotateLoader'
import { setAccessToken, setIsAuthenticated, setUserInfo } from "../../utils/local_data/store_user_info"


const LoginPage = () => {
    const history = useHistory()
    const [state,setState] = useState({
        loading:false
    })
    const [form]  = Form.useForm()
    const handleSubmit = (values)=>{
       
        setState({
            ...state,
            loading:true
        })
        // console.log(values.username);
        const config = axios_config()
        axios.post(loginUrl, values, config).then(res=>{
            setState({
                ...state,
                loading: false
            })
            console.log(res.data);
            setUserInfo(res.data.user)
            setAccessToken(res.data.token)
            setIsAuthenticated(true)
            message.success("Logged in succesful")
            history.push("/")
        }).catch(error=>{
            // console.log(error);
            setState({
                ...state,
                loading: false
            })
            if(error.response){
                // console.log(error.response);
                message.error(error.response.data)
            }else if (error.request){
                notification.error({
                    message:"Network error!",
                    description:"Check internet connection"
                })
            }
        })

    }
  
    return (
        <LoadingOverlay  active = {state.loading} spinner={<RotateLoader color = "#ffffff" />} >
        <div  className = "login-page" >
           

            
            
            <Card id = "mainCard" >
                <div className="top">
                    <h1>Welcome Back!</h1>

                </div>
                <div className="log">
                    <img width = "20%" src={logo}  alt="" srcset="" />
                </div>
                <div className="login-title my-5">
                    <h3>Administrator Login  </h3>
                </div>
                <div className="form">
                    <Form
                    form = {form}
                    name  = "login-form"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                        rules = {[{
                            required:true
                        }]}
                        name = "username" label = "User name" >
                            <Input placeholder = "Enter username" />

                        </Form.Item>
                        <Form.Item name = "password" rules = {[{
                            required:true
                        },
                        {
                            min:6
                        }
                        ]} label = "Password" >
                            <Password/>



                        </Form.Item>
                        <Form.Item>
                            <Button htmlType = "submit" id = "submitButton" shape = "round" >
                                Login
                            </Button>
                    
                        </Form.Item>
                    </Form>
                </div>
            </Card>
         
        </div>
        </LoadingOverlay>
    )
}

export default LoginPage
