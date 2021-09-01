import { Button, Form, message, Modal, notification, Select, Spin } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addChurchMember } from '../../state_manager/streamlined/group'
import useAuthToken from '../../utils/hooks/auth_token_hook'
import { axios_config } from '../../utils/networks/axios_config'
import { addMemberToGroupUrl } from '../../utils/networks/endpoints'

const AddMemberDrawer = ({members,group, visible,onClose,addMember,onCloseDrawer}) => {
    const [loading,setLoading]=useState(false)
    const [form] = Form.useForm()
    const token = useAuthToken()

    const onFinish=({member})=>{
        setLoading(true)
        const config = axios_config(token)
        const memberId = members.data.find((item)=>item.memberId===member).id
        console.log(memberId);
        axios.get(addMemberToGroupUrl(group.id,memberId),config)
        .then(res=>{
            
            setLoading(false)
            
            addMember(res.data.data)
            onClose()
            setTimeout(()=>{
            onCloseDrawer()
            },500)
            
            form.resetFields()

            console.log(group);
            message.success("You have successfully added a member to this group")
        }).catch(err=>{
            setLoading(false)
            if(err.response){
                console.log(err.response);
                if (err.response.status <500){
                    message.error(err.response.data.detail)
                }else{
                    message.error("Server error")
                }


            }else if(err.request){
                notification.error({message:"Network error",description:"Check internet connection"})
            }
        })
    }

    return (

        <Modal  title  = "Add Member"  visible = {visible} onCancel = {()=>{
            form.resetFields()
            onClose()
        }}  footer = {null} >
            <Spin spinning = {loading} >
            <Form 
            onFinish = {onFinish}
            form = {form} >
                
                <Form.Item extra = "You can search member by member ID"  name = "member" rules = {[{required:true,message:"Select a member"}]}  label = "Members" >
                    <Select  style = {{width:""}} showSearch >
                        {(members.data && members.data.length>0) && members.data.map(member=><Select.Option  value = {member.memberId} key = {member.id} >
                            {`${member.first_name} ${member.last_name}(${member.memberId})`}
                        </Select.Option>)}
                    </Select>
                </Form.Item>

                <div className="d-flex justify-content-center ">
                        <Button style = {{backgroundColor:"royalblue",color:"white"}} shape ="round" htmlType = "submit" > Add member </Button>
                </div>
               

            </Form>


            </Spin>
        </Modal>
    )
}
const mapStateToProps=state=>{
    return {
        members:state.members
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        
        addMember:(group)=>dispatch(addChurchMember(group))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddMemberDrawer)
