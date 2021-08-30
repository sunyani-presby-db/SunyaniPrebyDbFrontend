import React, { useState } from 'react';
import { Form, Input, Button, notification, message, Spin } from 'antd';
import axios from 'axios';
import { groupsUrl } from '../../utils/networks/endpoints';
import { axios_config } from '../../utils/networks/axios_config';
import useAuthToken from '../../utils/hooks/auth_token_hook';
import { postGroupSucess } from '../../state_manager/streamlined/group';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal/Modal';


const {TextArea} = Input;


const AddGroupModal = ({addGroup,closeModal,visible}) => {
  const [from] = Form.useForm()
  const token  = useAuthToken()
  const [loading,setLoading] = useState(false)


  const onFinish = (values) => {
    setLoading(true)
    const headers = axios_config(token)
    axios.post(groupsUrl,values,headers)
    .then(res=>{
      // console.log(res.data);
      addGroup(res.data)
      from.resetFields()
      closeModal()
      setLoading(false)
      message.success("You have successfully added a group");

    }).catch(err=>{
       setLoading(false)
      if(err.response){
        if (err.response.status === 400){

        }else{
          message.error(err.response.data.detail)
        }

      }else if (err.request){
        notification.error({message:"Network error",description:"Check internet connection and try again"})
      }
    })
  };


  return (
    <Modal visible = {visible} onCancel = {()=>{
      from.resetFields()
      closeModal()
      }} footer = {null} >

   
    <Spin spinning = {loading} >

    
    <Form
    form  = {from}
    layout='vertical'
    onFinish={onFinish}
  >
    <Form.Item
      label="Title"
      name="title"
      rules={[{ required: true, message: 'Input the title!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Description"
      name="description"
      rules={[{ required: false, message: 'Input the description!' }]}
    >
      <TextArea rows={6}/>
    </Form.Item>


    <div className="d-flex justify-content-around ">
      <Button shape = "round"  className = "mx-2" style = {{width:"70%"}} type="primary" htmlType="submit">
            Submit
          </Button>
            <Button shape = "round"  className = "mx-2"  style = {{width:"70%",backgroundColor:"red",color:"white"}}  htmlType="submit">
            Cancel
          </Button>
    </div>
        
  </Form>
  </Spin>
   </Modal>

  );
};

const mapStateToProps=state=>{
  return{}
}
const mapDispatchToProps=dispatch=>{
  return {
    addGroup: group=>dispatch(postGroupSucess(group))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddGroupModal);


