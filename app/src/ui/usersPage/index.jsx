import { Button, Input, Space, Statistic, Table } from 'antd'
import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons"
import './styles/index.scss'
const UsersPage = () => {
    const columns = [
        {
            title: "Index",
            dataIndex: "index",
            key: "index"
        },
        {
            title: 'Name',
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
                    {/* <a>Invite {record.name}</a> */}
                    <EyeOutlined style={{ color: "blue" }} onClick={() => { }} />
                    <DeleteOutlined style={{ color: "red" }} onClick={() => { }} />
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            email: 32,
            address: 'New York No. 1 Lake Park',
            index: 1,

        },
        {
            key: '2',
            name: 'Jim Green',
            email: 42,
            address: 'London No. 1 Lake Park',
            index: 2,

        },
        {
            key: '3',
            name: 'Joe Black',
            email: 32,
            address: 'Sidney No. 1 Lake Park',
            index: 3,
        },
    ];
    return (
        <div className="users-page">
            <Container>
                <h1>Users</h1>

                <Row>
                    <Col sm="6" >
                        <Card id="card-1">
                            <Statistic className="text-center" title="Number of users" />
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
                            <Col sm = "4" >
                                <h4 className="text-center">
                                    List of Users
                                </h4>
                            </Col>
                        <Col>
                            <Input.Search placeholder = "Search by name or email" />
                        </Col>
                        </Row>

                    </div>

                    <Table columns={columns} dataSource={data} />


                </Card>
            </Container>

        </div>
    )
}

export default UsersPage
