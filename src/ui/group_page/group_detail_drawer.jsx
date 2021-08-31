import { Divider, Drawer,Button, Image } from 'antd'
import React from 'react'
import mediaQeries from '../../utils/config/mediaqueries'
import useScreenSize from '../../utils/hooks/user_screen_size'
import logo from "../../assets/images/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons'

const GroupsDetailDrawer = ({group,visible,closeDrawer}) => {
    const screenSize = useScreenSize()
    return (
        <Drawer width = {screenSize === mediaQeries.extraSmall?  "80vw":screenSize === mediaQeries.small?  "65vw":"600px"} visible = {visible} onClose = {closeDrawer} >
            <div className="p-4">
                <div className="d-flex justify-content-center flex-column align-items-center  mt-5">
                    <Image  preview = {false} shape = "square" src = {logo} width = "40%" />
                    <Divider />
                    <h3  >{group.title} (YPG) </h3>
                    <p>{group.description}</p>
                </div>
                <Divider/>
                <div className={`d-flex px-4 ${screenSize === mediaQeries.extraSmall?`flex-column  justify-content-between`:" flex-row justify-content-between"} `}>
                    <h5 className = "" >50 Members</h5>
                    <Button  style = {{backgroundColor:"royalblue",color:"white"}} shape = "round"  > View members </Button>
                </div>
               
                <Divider/>
                      <div className={`d-flex px-4 ${screenSize === mediaQeries.extraSmall?`flex-column  justify-content-between`:" flex-row justify-content-between"} `}>
                    <Button className = "my-1"  icon = {<FontAwesomeIcon className = "mx-1  " icon = {faEdit} />}  style = {{backgroundColor:"royalblue",color:"white"}} shape = "round"  > Edit Group </Button>

                    <Button className = "my-1"  icon = {<FontAwesomeIcon className = "mx-1  " icon = {faUserPlus} />}   style = {{backgroundColor:"royalblue",color:"white"}} shape = "round"  > Add Member </Button>

                    <Button className = "my-1"  icon = {<FontAwesomeIcon className = "mx-1  " icon = {faTrash} />}   style = {{backgroundColor:"red",color:"white"}} shape = "round"  > Delete Group </Button>
                </div>
               
                <Divider/>

               
            </div>
        </Drawer>
    )
}

export default GroupsDetailDrawer
