import React, { useEffect, useState } from 'react'
// import { getPosts } from '../../redux/actions/post_actions'
import './styles/index.scss'
import { connect } from 'react-redux'
import { Breadcrumb, Button, Divider, Drawer, Layout, Menu } from 'antd';
import { MenuOutlined } from "@ant-design/icons"
import logo from "../../assets/images/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faChartPie, faUser, faUserFriends, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Link, Route, Switch } from "react-router-dom"
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
    const iconStyle = {
        fontSize: "1.2rem"
    }
    const labelStyle = {
        fontSize: "1.2rem"
    }
    const toggelDrawer = () => {
        setState({
            ...state,
            drawerVisible: !state.drawerVisible
        })
    }
    return (
        <LoadingOverlay active={componentsData.overlayLoadingVisible} spinner={<BeatLoader color="#ffffff" />} >
            <Layout id="miain-layout" >
                <Drawer  onClose={toggelDrawer} visible={state.drawerVisible} placement="left" >
                    <div className="logo">
                        <img width="50%" src={logo} alt="" srcset="" />
                    </div>
                    <Divider />
                    <Menu defaultOpenKeys="1" style={{ padding: "none", border: "none" }} >
                        <Menu.Item className="my-3" key="1" >
                            <Link to="/" >
                                <FontAwesomeIcon className="mr-2" icon={faChartPie} style={iconStyle} />
                                <span style={labelStyle} >
                                    Statistics
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="my-3" key="2" >
                            <Link to="/members" >
                                <FontAwesomeIcon className="mr-2" icon={faUserFriends} style={iconStyle} />
                                <span style={labelStyle} >
                                    Members
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="my-3" key="3" >
                            <Link to="/attendance">
                                <FontAwesomeIcon className="mr-2" icon={faCalendar} style={iconStyle} />
                                <span style={labelStyle} >
                                    Attendance
                                </span>
                            </Link>

                        </Menu.Item>
                        <Menu.Item className="my-3" key="4" >
                            <Link to="/groups">
                                <FontAwesomeIcon className="mr-2" icon={faUsers} style={iconStyle} />
                                <span style={labelStyle} >
                                    Groups
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="my-3" key="5" >
                            <Link to="/users">
                                <FontAwesomeIcon className="mr-2" icon={faUser} style={iconStyle} />
                                <span style={labelStyle} >
                                    Users
                                </span>
                            </Link>

                        </Menu.Item>
                    </Menu>
                </Drawer>
                <Layout.Header className="header" id="header">
                    <div className="menu-icon">
                        <Button onClick={toggelDrawer} id="menu-button">
                            <MenuOutlined id="menu-iconc" />
                        </Button>
                    </div>


                </Layout.Header>

                <Layout.Content  >
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
                    <Layout.Footer>

                    </Layout.Footer>
                </Layout.Content>
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
