import React, { useEffect, useState } from 'react'
// import { getPosts } from '../../redux/actions/post_actions'
import './styles/index.scss'
import { connect } from 'react-redux'
import { Breadcrumb, Divider, Layout, Menu } from 'antd';
import { CloseOutlined, MenuOutlined } from "@ant-design/icons"
import logo from "../../assets/images/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faChartPie, faUser, faUserFriends, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Route, Switch, useHistory } from "react-router-dom"
import { } from "@ant-design/icons"
import StatisticsPage from '../statistics_page';
import MembersPage from '../members_page';
import { getMembers } from '../../state_manager/actions/members_actions';
import LoadingOverlay from 'react-loading-overlay';
import { BeatLoader } from 'react-spinners'
import UsersPage from '../usersPage';
import { getUser } from '../../state_manager/streamlined/users';
import AttendancePage from '../attendance';
import { fetchMeetingDays } from '../../state_manager/streamlined/attendance';
import GroupPage from '../group_page';
import { getAllGroupData } from '../../state_manager/streamlined/group';

const HomePage = ({ fetchMembers, fetchUsers, componentsData, getMeetingDays, fetchGroups }) => {
    useEffect(() => {
        fetchMembers()
        fetchUsers()
        getMeetingDays()
        fetchGroups()
    }, [fetchMembers, fetchUsers, getMeetingDays, fetchGroups])
    const [state, setState] = useState({
        drawerVisible: false
    })
    const history = useHistory()

    const toggelDrawer = () => {
        setState({
            ...state,
            drawerVisible: !state.drawerVisible
        })
    }
    const onNavigagte=(e)=>{
        console.log(e);
        history.push(e.key)

    }
    return (
        <LoadingOverlay active={componentsData.overlayLoadingVisible} spinner={<BeatLoader color="#ffffff" />} >
            <Layout id="miain-layout" >
                <Layout.Sider hidden = {!state.drawerVisible} collapsible theme = "light" >
                      <div className="logo pt-3 ">
                        <img width="50%" src={logo} alt="" srcset="" />
                    </div>
                    <Divider />
                     <Menu  onClick = {onNavigagte} defaultOpenKeys="1" style={{ padding: "none", border: "none" }} >
                        <Menu.Item icon = { <FontAwesomeIcon className="mr-2" icon={faChartPie} />}  className="my-3" key="/" >
                               
                                    Statistics
                        </Menu.Item>
                        <hr />
                        <Menu.Item icon = {<FontAwesomeIcon className="mr-2" icon={faUserFriends} />} className="my-3" key="/members" >
                                
                                    Members
                        </Menu.Item>
                        <hr />
                        <Menu.Item icon ={<FontAwesomeIcon className="mr-2" icon={faCalendar} />} className="my-3" key="/attendance" >
                           
                                
                                    Attendance

                        </Menu.Item>
                        <hr />
                        <Menu.Item icon = {<FontAwesomeIcon className="mr-2" icon={faUsers} />} className="my-3" key="/groups" >
                                
                                    Groups
                        </Menu.Item>
                        <hr />
                        <Menu.Item icon = {<FontAwesomeIcon className="mr-2" icon={faUser} />} className="my-3" key="/users" >
                                
                                    Users

                        </Menu.Item>
                    </Menu>

                </Layout.Sider>

                <Layout>
                <Layout.Header  className="header" id="header">
                    <div className="menu-icon">
                        {!state.drawerVisible?( 
                            <MenuOutlined style = {{fontSize:"1.3rem"}}  onClick={toggelDrawer} id="menu-icon" />
                    ): 
                            <CloseOutlined style = {{fontSize:"1.3rem"}}  onClick={toggelDrawer} id="menu-icon" />
                    }
                       
                    </div>


                </Layout.Header>

                <Layout.Content className = "content">
                    <div className="main-session">
                        <div className="main-inner">


                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>



                            <Switch>
                                <Route path='/groups' component={GroupPage} />
                                <Route path="/members" component={MembersPage} />
                                <Route path="/users" component={UsersPage} />
                                <Route path="/attendance" component={AttendancePage} />
                                <Route path="" component={StatisticsPage} />

                            </Switch>
                        </div>
                    </div>
          
                </Layout.Content>
                </Layout>
            </Layout>
        </LoadingOverlay>
    )
}

const mapStateToProps = state => {
    return {
        componentsData: state.components
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMembers: () => dispatch(getMembers()),
        fetchUsers: () => dispatch(getUser()),
        getMeetingDays: () => dispatch(fetchMeetingDays()),
        fetchGroups: () => dispatch(getAllGroupData())

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
