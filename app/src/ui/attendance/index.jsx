import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Card, Statistic, Button, Input, Table, Space } from 'antd'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const columns = [
    {
        title: 'Title',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title:"Date",
        dataIndex:"date",
        key: "date",
        render: (text)=><p> {Date(text).slice(0,16)} </p>
    },
    {
        title: 'Attendance',
        dataIndex: 'age',
        key: 'age',
    },

    {
        title: 'Actions',
        render: (text, record) => (
            <Space size="middle">
                <EyeOutlined style = {{color :"yellow"}} onClick = {()=>{}} />
                <EditOutlined style={{ color: "royalblue" }}  onClick = {()=>{}} />
                <DeleteOutlined style={{ color: "red" }}  onClick = {()=>{}} />


            </Space>
        )
    }
];


const dataSource = [
    {
        key: '1',
        name: 'Mike WIth SOme well',
        age: 32,
        date:'2020-12-13'
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        date: '2020-12-13'
    },
];


const AttendancePage = () => {
    return (
        <div  >
            <Container>
                <Row>
                    <Col sm="6" >
                        <Card style={{ height: "150px" }} >
                            <Statistic className="text-center" title="Number of days" />
                        </Card>
                    </Col>
                    <Col>
                        <Card id="card-2" style={{ width: "100%", height: "150px" }} >
                            <Button shape="round" style={{ width: "100%", color: "royalblue", borderColor: "royalblue" }} >Add meeting day</Button>
                        </Card>
                    </Col>
                </Row>
                <Card className="mt-4" >
                    <Row>
                        <Col sm="5">
                            <h5 className="text-center">List of Meeting Days</h5>
                        </Col>
                        <Col>
                            <Input.Search placeholder="Search for Day's title, date or description" />
                        </Col>

                    </Row>
                    <Table className="mt-4" columns={columns} dataSource={dataSource} />
                </Card>

            </Container>

        </div>
    )
}

export default AttendancePage
