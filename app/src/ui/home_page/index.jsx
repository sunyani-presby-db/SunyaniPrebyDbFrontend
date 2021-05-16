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
import { getMembers } from '../../redux/actions/members_actions';
import LoadingOverlay from 'react-loading-overlay';
import { BeatLoader } from 'react-spinners'
import UsersPage from '../usersPage';
import { getUser } from '../../redux/streamlined/users';
import { getAllGroupData } from '../../redux/streamlined/group';
import GroupPage from '../group_page';
const HomePage = ({ fetchMembers, fetchUsers,fetchGroups, componentsData}) => {
    useEffect(() => {
          fetchMembers()
              fetchUsers()
              fetchGroups()
    }, [fetchMembers, fetchUsers, fetchGroups])
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
            <Drawer onClose={toggelDrawer} visible={state.drawerVisible} placement="left" >
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
                        <FontAwesomeIcon className="mr-2" icon={faCalendar} style={iconStyle} />
                        <span style={labelStyle} >
                            Attendenace
                        </span>
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
                        <Link to = "/users">
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
                            <Route path="/members" component={MembersPage} />
                            <Route path="/groups" component={GroupPage} />
                                <Route path="/users" component={UsersPage}/>
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
        fetchUsers:()=>dispatch(getUser()),
        fetchGroups: () =>  dispatch(getAllGroupData())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
