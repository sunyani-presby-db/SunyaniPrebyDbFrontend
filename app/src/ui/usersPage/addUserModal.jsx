import { Button, Divider, Form, Input, Modal } from 'antd'
import React from 'react'

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


const AddUserModal = ({ visible, onClose }) => {
    return (
        <Modal closable={false} visible={visible} onCancel={onclose} footer={null} >
            <h4 className="text-center">Add User</h4>
            <p><span style={{ color: "red" }} >Note: </span> only user with super-user previlliges can perform this actoion </p>
            <Divider />
            <Form   {...formItemLayout} >
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
                <Form.Item label="Email Address" name="email" rules={[{ type: "email" }, { required: true, message: "Must provide email" }]} >
                    <Input type="email" placeholder="Enter email address" />
                </Form.Item>
                <Form.Item label="First name" name="first_name" rules={[{ required: true, message: "Must provide first name" }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Last name" name="last_name" rules={[{ required: true, message: "Must provide last name" }]} >
                    <Input />
                </Form.Item>
                <Form.Item hasFeedback rules={[{ required: true, message: "Must provide password", min: 6 }]} label="Password" name="password">
                    <Input.Password />
                </Form.Item>

                <Form.Item hasFeedback dependencies={['password']} rules={[
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

                    <div className = "mt-3 ml-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" ,width:"100%"}}>
                        <Button htmlType = "submit" style = {{width:"50%",color:"#fff",background:"linear-gradient(to right,royalblue,teal)"}} shape = "round" >Submit</Button>

                    </div>

            </Form>
        </Modal>
    )
}

export default AddUserModal
