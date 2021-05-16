import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Card, Statistic, Button, Input, Table, Space } from 'antd'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux';





const AttendancePage = ({ meetingDaysInfo }) => {
    const getColumns = () => {
        if (meetingDaysInfo.data.length !== 0) {
            const columns = [{
                title: "Title",
                dataIndex: "title",
                key: "title"

            }]
            Object.keys(meetingDaysInfo.data[0])
                .map(key => {
                    if (key === "created_at" || key === "updated_at" || key === "id" || key === "title" || key === "desciption") {
                        return ""
                    }
                    if (key === "date") {
                        return columns.push(
                            {
                                title: "Date",
                                dataIndex: "date",
                                key: "date",
                                render: (text) => <p> {Date(text).slice(0, 16)} </p>
                            },
                        )

                    }
                    if (key === "attendance") {
                        return columns.push(
                            {
                                title: "Attendance",
                                dataIndex: "attendance",
                                key: "attendance",
                                render: (text) => <p> {text.length} </p>
                            },
                        )
                    }

                    return columns.push({
                        title: key,
                        dataIndex: key,
                        key: key
                    })
                })
            columns.push({
                title: 'Actions',
                render: (text, record) => (
                    <Space size="middle">
                        <EyeOutlined style={{ color: "yellow" }} onClick={() => { }} />
                        <EditOutlined style={{ color: "royalblue" }} onClick={() => { }} />
                        <DeleteOutlined style={{ color: "red" }} onClick={() => { }} />


                    </Space>
                )
            })
            return columns
        } else {
            return [
                {
                    title: 'Title',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: "Date",
                    dataIndex: "date",
                    key: "date",
                    render: (text) => <p> {Date(text).slice(0, 16)} </p>
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
                            <EyeOutlined style={{ color: "yellow" }} onClick={() => { }} />
                            <EditOutlined style={{ color: "royalblue" }} onClick={() => { }} />
                            <DeleteOutlined style={{ color: "red" }} onClick={() => { }} />


                        </Space>
                    )
                }
            ];
        }
    }
    const columns = getColumns()
    return (
        <div  >
            <Container>
                <Row>
                    <Col sm="6" >
                        <Card style={{ height: "150px" }} >
                            <Statistic value={meetingDaysInfo.mainData.length} className="text-center" title="Number of days" />
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
                    <Table style={{ overflowX: "scroll" }} loading={meetingDaysInfo.loading} className="mt-4" columns={columns} dataSource={meetingDaysInfo.data} />
                </Card>

            </Container>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        meetingDaysInfo: state.meetingDays
    }
}
export default connect(mapStateToProps)(AttendancePage)
