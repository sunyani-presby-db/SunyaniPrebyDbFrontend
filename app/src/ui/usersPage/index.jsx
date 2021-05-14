import { Button, Input, Space, Statistic, Table } from 'antd'
import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons"
import './styles/index.scss'
import { connect } from 'react-redux'
const UsersPage = ({ userData }) => {
    const getColumn = () => {
        if (userData.data.length !== 0) {
            let column = []
            Object.keys(userData.data[0]).map(key => {
                return column.push({
                    title: key.replace('_',' '),
                    dataIndex: key,
                    key: key
                })
            })
            column.push(
                {
                    title: 'Delete',
                    key: 'action',
                    render: (text, record) => (
                        <Space size="middle">
                            <DeleteOutlined style={{ color: "red" }} onClick={() => { }} />
                        </Space>
                    ),
                },
            )
            return column

        } else {
            return [
                {
                    title: "Index",
                    dataIndex: "index",
                    key: "index"
                },
                {
                    title: 'Username',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Email',
                    dataIndex: 'address',
                    key: 'email',
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <Space size="middle">
                            <DeleteOutlined style={{ color: "red" }} onClick={() => { }} />
                        </Space>
                    ),
                },
            ];
        }
    }

    const columns = getColumn()

    return (
        <div className="users-page">
            <Container>
                <h1>Users</h1>

                <Row>
                    <Col sm="6" >
                        <Card id="card-1">
                            <Statistic value = {userData.data.length} className="text-center" title="Number of users" />
                        </Card>
                    </Col>
                    <Col>
                        <Card id="card-2" style={{ width: "100%" }} >
                            <Button shape="round" style={{ width: "60%", color: "royalblue", borderColor: "royalblue" }} >Add User</Button>
                        </Card>
                    </Col>
                </Row>
                <Card id="card-3" >
                    <div className="card-header">
                        <Row>
                            <Col sm="4" >
                                <h4 className="text-center">
                                    List of Users
                                </h4>
                            </Col>
                            <Col>
                                <Input.Search placeholder="Search by name or email" />
                            </Col>
                        </Row>

                    </div>
                    

                    <Table loading = {userData.loading} style = {{overflowX:"scroll"}}  columns={columns} dataSource={userData.data} />


                </Card>
            </Container>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        userData: state.users
    }
}


export default connect(mapStateToProps)(UsersPage)
