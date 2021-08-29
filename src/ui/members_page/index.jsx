import { DeleteOutlined } from '@ant-design/icons'
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Divider, Drawer, Form, Input, List, message, Modal, notification, Row, Statistic, Tooltip } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { toggleLoadingOverley } from '../../redux/actions/components_actions'
import { deleteMemberSuccess, searchForMember } from '../../redux/actions/members_actions'
import { getToken } from '../../utils/local_data/store_user_info'
import { axios_config } from '../../utils/networks/axios_config'
import { memberDetailedUrl } from '../../utils/networks/endpoints'
import AddMemberModal from './add_member_modal'
import EditMemberDrawer from './edit_drawer'

const MembersPage = ({ membersData, searchMember, delteMember, showLoadingOverlay }) => {
    const [state, setState] = useState({
        drawerVisible: false,
        delteLoading: false,
        delteModalVisible: false,
        addMemberDrawer:false,
        editMemberDrawer:false
    })
    const toggleEditMemberDrawer = () => {
        setState({
            ...state,
            editMemberDrawer: !state.editMemberDrawer
        })
    }
    const toggleAddMemberDrawer = ()=>{
        setState({
            ...state,
            addMemberDrawer:!state.addMemberDrawer
        })
    }
    const [infoState, setInfoState] = useState({
        currentData: {}

    })
    const toggelDrawer = () => {
        setState({
            ...state,
            drawerVisible: !state.drawerVisible
        })

    }

    const deleteMember = () => {
        // showLoadingOverlay()
        // closeDeleteModal()

        setState({
            ...state,
            delteLoading: true
        })
        const config = axios_config(getToken())
        axios.delete(memberDetailedUrl(infoState.currentData.id), config).then(res => {
            delteMember(infoState.currentData)
            closeDeleteModal()
            message.success("You have succesfully delted a member")
        }).catch(error => {
            if (error.response) {
                console.log(error.response);
                message.error(error.response.data.detail)
            } else if (error.request) {
                notification.error({
                    message: "Network error",
                    description: "Check internet connection and try again"
                })
            }
        })


    }

    const getStudentInfo = (info) => {
        try {
            const length = info.length

            return length === 0 ? <p style={{ color: "royalblue" }} className="text-center">Not a student</p> : <>
                <Row >
                    <Col sm="4" > <p>SCHOOL NAME:</p> </Col>
                    <Col sm="8" > <p>{`${info[0].school_name}`}L</p> </Col>
                </Row>
                <Divider />
                <Row >
                    <Col sm="2" > <p>type:</p> </Col>
                    <Col sm="3" > <p>{`${info[0].school_level}`}</p> </Col>
                    <Col sm="3" > <p>Year/Level:</p> </Col>
                    <Col sm="3" > <p> {`${info[0].year}`}</p> </Col>

                </Row>
                <Divider />

            </>
        } catch (error) {
            return <p style={{ color: "red" }} className="text-center">Not a student</p>

        }
    }

    const displayPhoneNumbers = (phone_number) => {
        try {
            const length = phone_number.length

            return length === 0 ? <p style={{ color: "royalblue" }} className="text-center">No phone number added</p> : phone_number.map((number,index)=>(<>
                <Row>
                    <Col sm="1" > <p>{index +1 }.</p> </Col>
                    <Col sm="11" > <p>{number.number}</p> </Col>
                </Row>
                
            </>))
        } catch (error) {
            return <p style={{ color: "red" }} className="text-center">No Phone number added</p>

        }
    }


    const showWorkInfo = (info) => {
        
        try {
            const length = info.length
            return length === 0 ? <p style={{ color: "royalblue" }} className="text-center">Not Wroker</p> : <>


                <Divider />
                <Row >
                    <Col sm="4" > <p>WORK NAME:</p> </Col>
                    <Col sm="8" > <p>{info[0].work_name}</p> </Col>
                </Row>
                <Divider />
                <Row >
                    <Col sm="4" > <p>Position:</p> </Col>
                    <Col sm="8" > <p>{info[0].position}</p> </Col>

                </Row>
                <Divider />
                <Row >
                    <Col sm="4" > <p>Job Description:</p> </Col>
                    <Col sm="8" > <p>{info[0].job_description}</p> </Col>

                </Row></>
        } catch (error) {
            return <p style={{ color: "royalblue" }} className="text-center">Not Wroker</p>

        }
    }
    const openeDeleteModal = () => {
        setState({
            ...state,
            delteModalVisible: true
        })
    }
    const closeDeleteModal = () => {
        setState({
            ...state,
            delteModalVisible: false
        })
    }
    const deleteModal = <Modal onCancel={closeDeleteModal} title={<p className="text-center" >Delete Member</p>} visible={state.delteModalVisible} footer="" >
        <p> By clicking on ok, you will completely delete <b>{`${infoState.currentData.first_name} ${infoState.currentData.last_name}`}</b>  from the church's database. This action can not be undone. </p>
        Type <b><i>{infoState.currentData.memberId}</i></b> in the input field below to complete the action.
        <Form onFinish={deleteMember} className="mt-4" >
            <Row>
                <Col sm="7" >
                    <Form.Item name="input" rules={[
                        {
                            required: true, message: "Cannot be left blank"
                        }, {
                            validator: (rule, value, callback) => {
                                if (value.trim() !== infoState.currentData.memberId) {
                                    callback("Input is not correct")
                                } else {
                                    callback()
                                }
                            }
                        }
                    ]} >
                        <Input placeholder={infoState.currentData.memberId} />
                    </Form.Item>
                </Col>
                <Col sm="2" >
                    <Form.Item   >
                        <Button htmlType="submit" style={{ color: "royalblue", borderColor: "royalblue" }} shape="round"  >Delete</Button>
                    </Form.Item>

                </Col>
                <Col sm="2" >
                    <Form.Item>
                        <Button onClick={closeDeleteModal} htmlType="reset" style={{ color: "red", borderColor: "red" }} shape="round" > Cancel</Button>
                    </Form.Item>

                </Col>
            </Row>

        </Form>


    </Modal>
    return (
        <div >
            <AddMemberModal onCLose = {toggleAddMemberDrawer} visible = {state.addMemberDrawer} />
            <EditMemberDrawer onCLose={toggleEditMemberDrawer} memberInfo = {infoState.currentData} visible = {state.editMemberDrawer} />
            {deleteModal}
            <Drawer onClose={toggelDrawer} visible={state.drawerVisible} width={600}>
                <h3 className="text-center">
                    Detailed information -- {membersData.memberId}
                </h3>
                <Divider />
                <h4 className="text-start mb-5">
                    Personal Information --
                    {infoState.currentData.memberId}
                </h4>
                <Divider />

                <Row  >
                    <Col sm="3" > <p>FULL NAME:</p> </Col>
                    <Col sm="4" > <p>{`${infoState.currentData.first_name} ${infoState.currentData.last_name}`}</p> </Col>
                    <Col sm="3" > <p>OTHER NAME:</p> </Col>
                    <Col sm="2" > <p>-----</p> </Col>

                </Row>
                <Divider />
                <Row >
                    <Col sm="2" > <p>AGE:</p> </Col>
                    <Col sm="3" > <p>{`${infoState.currentData.age} years`}</p> </Col>
                    <Col sm="2" > <p>SEX:</p> </Col>
                    <Col sm="3" > <p>{infoState.currentData.sex}</p> </Col>

                </Row>
                <Divider />
                <Row >
                    <Col sm="4" > <p>ADDRESS:</p> </Col>
                    <Col sm="8" > <p>{infoState.currentData.address === null ? <p style={{ color: "red" }} >Not set</p> : infoState.currentData.address}</p> </Col>

                </Row>
                <Divider />
                <Row >
                    <Col sm="4" > <p>EMAIL-ADDRESS:</p> </Col>
                    <Col sm="8" > <p>{infoState.currentData.email === null ? <p style={{ color: "red" }} >Not set</p> : infoState.currentData.email}</p> </Col>


                </Row>
                
                <Divider/>

                <h4 className="text-start">
                    Phone Numbers
                </h4>
                {displayPhoneNumbers(infoState.currentData.phone_numbers)}
                <Divider/>

                <h4 className="text-start mb-5">
                    School Information
                </h4>

                <Divider />
                {getStudentInfo(infoState.currentData.student_info)}

                <h4 className="text-start mb-5">
                    Work Information
                </h4>

                {showWorkInfo(infoState.currentData.worker_info)}
                <Divider />


                <h4 className="text-start mb-5">
                    Associated Groups
                </h4>
                <List
                    dataSource={infoState.currentData.groups ? infoState.currentData.groups : []}

                    renderItem={(item, key) => <List.Item>
                        <Row>
                            <Col>
                                <p>{key + 1} </p>
                            </Col>
                            <Col>
                                <p>{item.name} </p>
                            </Col>
                        </Row>
                    </List.Item>}
                />

            </Drawer>
            <Container>
                <Row>
                    <Col sm="4">
                        <Card style={{ height: "180px" }}>
                            <div className="text-center">
                                <Statistic title="Total Members" value={membersData.data.length} />
                            </div>
                        </Card>
                    </Col>
                    <Col sm="8">
                        <Card style = {{height:"180px"}} >
                            <h5 className="text-center">Add Church Member</h5>
                            <Divider />
                            <Row  >
                                <Col className = "mb-1" sm="6" >
                                    <Button onClick = {toggleAddMemberDrawer} shape="round" style={{ background: "royalblue", color: "#fff", width:"100%", textAlign: "center" }} >Add a Account</Button>
                                </Col>
                                <Col className = "my-1" sm="6">
                                    <Button shape="round" style={{ background: "green", color: "#fff", width:"100%", textAlign: "center" }} >Create Bulk Account</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

             
                <div className="my-4" />
                <Card>
                    <Row>
                        <Col sm="4" >
                            <h4 className="text-center">
                                List of Members
                    </h4>
                        </Col>
                        <Col>
                            <Form.Item label="Search" >
                                <Input.Search onChange={e => {
                                    searchMember(e.target.value)
                                }} placeholder="Search by ID,Name,Group,skill,school or email" />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Divider />

                    <List
                        pagination={{
                            pageSize: 10
                        }}
                        itemLayout="vertical"
                        dataSource={membersData.initData}
                        renderItem={(item, key) => (
                            <List.Item key={key} >
                                <Row>
                                    <Col sm="1" >
                                        <p>{key + 1} </p>
                                    </Col>
                                    <Col sm="4" >
                                        <p>{`${item.last_name} ${item.first_name}`} </p>
                                    </Col>
                                    <Col sm="4" >
                                        <p>{item.memberId} </p>
                                    </Col>
                                    <Col sm="1" >
                                        <Tooltip title="View detailed information" >
                                            <Button
                                                onClick={e => {
                                                    setInfoState({
                                                        ...infoState,
                                                        currentData: item
                                                    })
                                                    toggelDrawer()
                                                }}
                                                shape="circle" style={{
                                                    border: "1px solid yellow"
                                                }} >
                                                <FontAwesomeIcon color="yellow" icon={faEye} />
                                            </Button>
                                        </Tooltip>

                                    </Col>
                                    <Col sm="1" >
                                        <Tooltip title="Edit member's information" >
                                            <Button 
                                            onClick  = {()=>{
                                                setInfoState({
                                                    ...infoState,
                                                    currentData:item
                                                })
                                                    toggleEditMemberDrawer()
                                            }}
                                            shape="circle" >
                                                <FontAwesomeIcon color="royalblue" icon={faEdit} />
                                            </Button>
                                        </Tooltip>

                                    </Col>
                                    <Col sm="1" >
                                        <Tooltip title="Delete Member" >
                                            <Button
                                                onClick={e => {
                                                    setInfoState({
                                                        ...infoState,
                                                        currentData: item
                                                    })
                                                    openeDeleteModal()
                                                }}
                                                shape="circle" >
                                                <DeleteOutlined style={{ color: "red" }} />
                                            </Button>
                                        </Tooltip>

                                    </Col>
                                </Row>

                            </List.Item>
                        )}
                    />

                </Card>
            </Container>


        </div>
    )
}

const mapStateToProps = state => {
    return {
        membersData: state.members,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        searchMember: search => dispatch(searchForMember(search)),
        delteMember: member => dispatch(deleteMemberSuccess(member)),
        showLoadingOverlay: status => dispatch(toggleLoadingOverley(status))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MembersPage)
