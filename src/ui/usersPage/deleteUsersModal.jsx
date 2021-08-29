import { Button, Form, Input, message, Modal, notification, Spin } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { deleteUser } from '../../redux/streamlined/users'
import { getToken } from '../../utils/local_data/store_user_info'
import { axios_config } from '../../utils/networks/axios_config'
import { userDetailedUrl } from '../../utils/networks/endpoints'

const DeleteUsersModal = ({ visible, onclose, info, deleteUserInfo }) => {
    const [state, setState] = useState({
        loading: false
    })
    const openLOading = () => {
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
    const handleDelete = () => {
        openLOading()
        const config = axios_config(getToken())
        axios.delete(userDetailedUrl(info.id), config).then(res => {
            deleteUserInfo(info)
            message.success("User deleted successfully")
            closeLoading()
            onclose()
        }).catch(error => {

            if (error.response) {
                closeLoading()
                message.error(error.response.data.detail)
            } else if (error.request) {
                notification.error({
                    message: "Detete user failed",
                    description: "Network error. Check internet connection"
                })
            }

        })
    }
    return (

        <Modal closable={false} visible={visible} onCancel={onclose} footer={null} >
            <Spin spinning={state.loading} >


                <h4 className="text-center">
                    Delete User
            </h4>
                <p>This action will delete <b> <i> {`${info.username}`}</i> </b>  permanently from the database. User will not be able to login to this software any more. <br /><span style={{ color: "red" }} >Note:</span> that only users with super-user previlages can perform this action </p>
                <p>Type<b> <i> {`${info.username}`} </i> </b> in the in the input field below to confirm action.</p>
                <Form
                    onFinish={handleDelete}
                >
                    <Row>
                        <Col sm="7" >
                            <Form.Item
                                name="input"
                                rules={[
                                    {
                                        required: true,
                                        message: "The field should not be empty"
                                    },
                                    {
                                        validator: (rules, value, callback, source, option) => {
                                            if (value !== info.username) {
                                                callback("Input is not valid")
                                            } else {
                                                callback()
                                            }

                                        }
                                    }
                                ]}
                            >
                                <Input placeholder={`${info.username}`} />
                            </Form.Item>
                        </Col>
                        <Col sm="2">
                            <Button htmlType="submit" shape="round" style={{ borderColor: "blue", color: "blue" }} >Delete</Button>
                        </Col>
                        <Col sm="2">
                            <Button onClick={onclose} htmlType="reset" shape="round" style={{ borderColor: "red", color: "red" }} >Cancel</Button>
                        </Col>
                    </Row>

                </Form>
            </Spin>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {}
}
const mapDispatch = dispatch => {
    return {
        deleteUserInfo: info => dispatch(deleteUser(info))
    }
}
export default connect(mapStateToProps, mapDispatch)(DeleteUsersModal)
