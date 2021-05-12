import { MinusCircleOutlined } from '@ant-design/icons'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, DatePicker, Divider, Drawer, Form, Input, message, notification, Select } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import axios from "axios"
import { axios_config } from "../../utils/networks/axios_config"
import { getToken } from '../../utils/local_data/store_user_info'
import { addMemberUrl } from '../../utils/networks/endpoints'
import { addMember } from '../../redux/actions/members_actions';
import { connect} from 'react-redux'
const AddMemberModal = ({ visible, onCLose, addMmeber_ }) => {
    const [state, setState] = useState({
        isStudent: false,
        isWorker: false,
        isLoading: true,
        date:""
    })
    const toggleLoadingState = () => {
        setState({
            ...state,
            isLoading: !state.isLoading
        })
    }
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

    const getData = (values)=>{
        // console.log(values);
        const data = {
            first_name: values.first_name,
            last_name:values.last_name,
            date_of_birth: state.date,
            sex:values.sex,
            address: values.adress,
            email:values.email,
            phone_numbers:[]
        }
        if(state.isStudent){
            data.student_info_create = {
                school_name:values.school_name,
                school_level:values.school_level,
                year:values.year
            }
        }
        if(state.isWorker){
            data.worker_info_create = {
                work_name: values.work_name,
                position: values.position,
                job_description: values.job_description
            }

        }
        if(values.phone_numbers.length>0){
            values.phone_numbers.map(number=>{
                data.phone_numbers.push({
                    number
                })
            })
        }
        
        return data
    }



    const postData = (values) => {
        const data = getData(values)
        toggleLoadingState()
        const config = axios_config(getToken())
        axios.post(addMemberUrl, data, config).then(res => {
            
            addMmeber_(res.data.data)
            message.success("You have succesfully added a memnber")
            onCLose()
        }).catch(error => {
            if(error.response){
                message.error("Sorry an error")
            }
            else if(error.request){
                notification.error({
                    description:"Check internet connection and try again",
                    message:"Network error"
                })
            }
            console.log(error.response);
         })

    }

    return (
        <Drawer width={600} onClose={onCLose} visible={visible} >
            <h3 className="text-center">Add Member</h3>
            <Divider />
            <h5 className="text-center">Personal Information</h5>
            <Divider />
            <Form
            onFinish = {postData} 
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
                            <DatePicker onChange = {(_,dateString)=>{
                                // console.log(dateString);
                                setState({
                                    ...state,
                                    date:dateString
                                })
                            }}  />
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
                    name="adress"
                    rules={[
                        { required: true }
                    ]}
                    label="ADDRESS" >
                    <Input.TextArea placeholder="Enter address description" rows="4" />
                </Form.Item>

                <Form.List
                    name="phone_numbers"
                    rules={[
                        {
                            validator: async (_, phone_numbers) => {
                                if (!phone_numbers || phone_numbers.length > 2) {
                                    return Promise.reject(new Error('You can only add 2 phone numbers'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    label='PHONE NUMBER '
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Input phone number",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input type="number" placeholder="Phone number" style={{ width: '60%' }} />
                                    </Form.Item>
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                </Form.Item>
                            ))}
                            <Form.Item label="PHONE NUMBERS" >
                                <Button
                                    type="dashed"
                                    onClick={() =>
                                        fields.length < 2 ?
                                            add() : notification.info({
                                                message: "You cannot add more than 2 phone numbers"
                                            })}
                                    style={{ width: '60%' }}
                                    icon={<FontAwesomeIcon className="mr-1" icon={faPlus} />}

                                >
                                    Add Phone number
                                    </Button>

                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
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


const mapDisipatchToProps = dispatch=>{
    return{
        addMmeber_: member => dispatch(addMember(member))
    }
}
const mapStateToProps = dispatch=>{
    return {

    }
}

export default connect(mapStateToProps, mapDisipatchToProps)(AddMemberModal)
