import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, DatePicker, Divider, Drawer, Form, Input, Select } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

const EditMemberDrawer = ({ visible, memberInfo, onCLose }) => {
    const [state, setState] = useState({
        isStudent: false,
        isWorker: false,
        date: ""
    })
    const toggleStudentForm = () => {
        setState({
            ...state,
            isStudent: !state.isStudent
        })
    }
    const toggleJobForm = () => {
        setState({
            ...state,
            isWorker: !state.isWorker
        })
    }
    console.log(memberInfo);

    const editPhonenumber = () => {
        try {
            const
                length = memberInfo.phone_numbers.length
            if (length > 0) {
                return memberInfo.phone_numbers.map((number, index) => (
                    <Form>
                        <Row>



                            <Col sm="8">
                                <Form.Item label={`PHONE NUMBER - ${index + 1}`} >
                                    <Input value={number.number} />

                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item>
                                    <Button htmlType="submit" shape="round" style={{ width: "100%", height: "40px", background: "linear-gradient(to right,royalblue,teal)", color: "#fff" }} >Update number</Button>
                                </Form.Item>
                            </Col>


                        </Row>
                    </Form>
                ))
            } else {
                return <p>Add phone</p>
            }


        } catch (error) {
            return (<p>{String(error)}</p>)

        }
    }

    return (
        <Drawer width={600} onClose={onCLose} visible={visible} >
            <h4 className="text-center">Edit member information --{memberInfo.memberId} </h4>
            <Divider />
            <h5 className="text-center">Personal Information</h5>
            <Divider />
            <Form

                initialValues={{
                    first_name: memberInfo.first_name,
                    last_name: memberInfo.last_name,
                    address: memberInfo.address,
                    email: memberInfo.email,
                    sex: memberInfo.sex,


                }}
            >

                <Form.Item
                    rules={[
                        {
                            required: true
                        }
                    ]}
                    name="first_name" label="FIRST NAME" >
                    <Input placeholder="eg. Emmanuel" />
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true
                        }
                    ]}
                    name="last_name" label="LAST NAME" >
                    <Input placeholder="eg. Sarpong" />
                </Form.Item  >


                <Form.Item name="email" label="EMAIL-ADDRESS" >
                    <Input type="email" placeholder="eg. xxxxx@xxx.xxx" />
                </Form.Item>

                <Row>
                    <Col sm="6" >
                        <Form.Item
                            name="date_of_birth"
                            rules={[
                                { required: true }
                            ]}
                            label="DATE OF BIRTH" >
                            <DatePicker
                                onChange={(_, dateString) => {
                                    console.log(dateString);
                                    setState({
                                        ...state,
                                        date: dateString
                                    })

                                    // console.log(value);
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col sm="6" >
                        <Form.Item
                            name="sex"
                            rules={[
                                { required: true }
                            ]}
                            label="SEX" >
                            <Select  >
                                <Select.Option value="MALE" >Male</Select.Option>
                                <Select.Option value="FEMALE" >Female</Select.Option>

                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name="address"
                    rules={[
                        { required: true }
                    ]}
                    label="ADDRESS" >
                    <Input.TextArea placeholder="Enter address description" rows="4" />
                </Form.Item>

                <Form.Item  >
                    <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }} className="submit-btn">
                        <Button htmlType="submit" shape="round" style={{ width: "50%", height: "40px", background: "linear-gradient(to right,royalblue,teal)", color: "#fff" }} className="text-center" >Update Personal info.</Button>
                    </div>

                </Form.Item>
            </Form>

            <Divider />
            <h5 className="text-center">Phone numbers</h5>
            <Divider />
            <Form>
                {editPhonenumber()}


                <Divider />

                <p className="text-start my-3">
                    <span className="mr-5">  Are you a student? </span> <Button
                        onClick={toggleStudentForm}
                        icon={state.isStudent ? <FontAwesomeIcon className="mr-1" icon={faMinus} /> : <FontAwesomeIcon className="mr-1" icon={faPlus} />} type="dashed" style={{ borderBlockColor: "royalblue", color: "royalblue" }} shape="round" className="mr-2">{!state.isStudent ? "Add School information" : "Remove school information"}</Button>

                </p>
                {
                    state.isStudent ? (<div className="student-from">
                        <Divider />
                        <h4 className="text-center">Student Information</h4>
                        <Divider />
                        <Form.Item
                            name="school_name"
                            rules={[{ required: true }]}
                            label="SCHOOL NAME" >
                            <Input placeholder="eg. University of energy and natural resources" />

                        </Form.Item>
                        <Form.Item
                            name="school_level"
                            rules={[{ required: true }]}

                            label="SCHOOL TYPE">
                            <Select>
                                <Select.Option value="TETIARY" >Tetiary</Select.Option>
                                <Select.Option value="SHS" >SHS</Select.Option>
                                <Select.Option value="ADVANCE" >Advannce</Select.Option>
                                <Select.Option value="SKILL_TRAINING" >skill Training</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="year"
                            rules={[{ required: true }]}
                            label="YEAR/LEVEL" >
                            <Input type="number" placeholder="Enter the year or level as a number" />
                        </Form.Item>
                    </div>) : ""
                }
                <Divider />

                <p className="text-start my-3">
                    <span className="mr-5">  Are you a worker? </span> <Button
                        onClick={toggleJobForm}
                        icon={state.isWorker ? <FontAwesomeIcon className="mr-1" icon={faMinus} /> : <FontAwesomeIcon className="mr-1" icon={faPlus} />} type="dashed" style={{ borderBlockColor: "royalblue", color: "royalblue" }} shape="round" className="mr-2">{!state.isWorker ? "Add job's information" : "Remove job's information"}</Button>

                </p>
                {
                    state.isWorker ? (<div className="student-from ">
                        <Divider />
                        <h4 className="text-center">Work Information</h4>
                        <Divider />
                        <Form.Item
                            help="You can indicate self-employed"
                            name="work_name"
                            rules={[{ required: true }]}
                            label="WORK'S NAME" >
                            <Input placeholder="eg. Kwame Aboagye Cement Shop" />

                        </Form.Item>
                        <Form.Item
                            name="position"
                            rules={[{ required: true }]}

                            label="POSITION HELD">
                            <Input placeholder="eg. CEO" />
                        </Form.Item>
                        <Form.Item
                            name="job_description"
                            help="This field is optional"
                            label="DESCRIPTION" >
                            <Input.TextArea rows="4" placeholder="Enter the year or level as a number" />
                        </Form.Item>
                    </div>) : ""
                }
                <Divider />
                <Form.Item  >
                    <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }} className="submit-btn">
                        <Button htmlType="submit" shape="round" style={{ width: "50%", height: "40px", background: "linear-gradient(to right,royalblue,teal)", color: "#fff" }} className="text-center" >Add Member</Button>
                    </div>

                </Form.Item>

            </Form>
        </Drawer >
    )
}

export default EditMemberDrawer
