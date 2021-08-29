import { Button, Divider, Form, Input, message, Modal, notification, Spin } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { addUsersSuccess } from '../../state_manager/streamlined/users';
import { getToken } from '../../utils/local_data/store_user_info';
import { axios_config } from '../../utils/networks/axios_config';
import { addUserUrl } from '../../utils/networks/endpoints';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};


const AddUserModal = ({ visible, onClose, addUser }) => {
    const [state, setState] = useState({
        loading: false,

        fieldErrors: {
            username: [],
            email: [],
            password: []

        }

    })
    const openLoading = () => {
        setState({
            ...state,
            loading: true
        })
    }
    const closeLoading = () => {
        setState({
            ...state,
            loading: false
        })
    }
    const onSubmit = (values) => {
        const config = axios_config(getToken())
        openLoading()
        axios.post(addUserUrl, values, config).then(res => {
            console.log(res.data.data);
            addUser(res.data.data)

            closeLoading()
            message.success("You have successfully added a user")
            onClose()
        }).catch(error => {
            closeLoading()
            if (error.response) {
                console.log(error.response);
                if (error.response.status !== 400) {
                    message.error(error.response.data.detail)


                } else {
                    const errors = error.response.data
                    setState({
                        ...state,
                        fieldErrors: {
                            ...state.fieldErrors,
                            ...errors

                        }
                    })
                }
            } else if (error.request) {
                notification.error({
                    message: "Detete user failed",
                    description: "Network error. Check internet connection"
                })
            }
        })

    }


    return (
        <Modal closable={false} visible={visible} onCancel={onClose} footer={null} >
            <Spin spinning={state.loading} >
                <h4 className="text-center">Add User</h4>
                <p><span style={{ color: "red" }} >Note: </span> only user with super-user previlliges can perform this actoion </p>
                <Divider />
                <Form

                    onFinish={onSubmit}  {...formItemLayout} >
                    <Form.Item

                        rules={[
                            {
                                required: true,
                                message: "Username must not be empty"
                            },
                            {
                                min: 6
                            }
                        ]}
                        name="username" label="Username" >
                        <Input placeholder="Enter valid username" />
                    </Form.Item>
                    <div style={{ marginLeft: "7em", color: 'red' }} className="text-center">
                        {state.fieldErrors.username.length > 0 && state.fieldErrors.username.map((error, index) => <p key={index} >{error}</p>)}

                    </div>
                    <Form.Item

                        label="Email Address" name="email" rules={[{ type: "email" }, { required: true, message: "Must provide email" }]} >
                        <Input type="email" placeholder="Enter email address" />
                    </Form.Item>
                    <div style={{ marginLeft: "7em", color: 'red' }} className="text-center">
                        {state.fieldErrors.email.length > 0 && state.fieldErrors.email.map((error, index) => <p key={index} >{error}</p>)}

                    </div>
                    <Form.Item label="First name" name="first_name" rules={[{ required: true, message: "Must provide first name" }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Last name" name="last_name" rules={[{ required: true, message: "Must provide last name" }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item hasFeedback rules={[{ required: true, message: "Must provide password", min: 6 }]} label="Password" name="password">
                        <Input.Password />

                    </Form.Item>
                    <div style={{ marginLeft: "7em", color: 'red' }} className="text-center">
                        {state.fieldErrors.password.length > 0 && state.fieldErrors.username.map((error, index) => <p key={index} >{error}</p>)}

                    </div>
                    <Form.Item
                        hasFeedback dependencies={['password']} rules={[
                            { required: true, message: "Must provide password" },
                            { min: 6 },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));

                                }
                            })

                        ]} label="Password Confirm" name="password_confirm">
                        <Input.Password />
                    </Form.Item>

                    <div className="mt-3 ml-5" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                        <Button htmlType="submit" style={{ width: "50%", color: "#fff", background: "linear-gradient(to right,royalblue,teal)" }} shape="round" >Submit</Button>

                    </div>

                </Form>
            </Spin>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = dispatch => {
    return {
        addUser: user => dispatch(addUsersSuccess(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserModal)
