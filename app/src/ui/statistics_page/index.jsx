import React from 'react'
import {Col, Container, Row} from "react-bootstrap"
import { Card, Statistic } from "antd"
import "./styles/index.scss"
import {Bar} from "react-chartjs-2"
import {connect} from "react-redux"

const StatisticsPage = ({ members, attendanceInfo}) => {
    const chartState = ()=>{
        let labels = []
        let datasets= [
            {
                label: 'Attendance',
                backgroundColor: 'rgba(75,192,192,.5)',
                borderColor: 'royalblue',
                borderWidth: 1,
                data: []
            }
        ]
        if (attendanceInfo.mainData.length !==0){
            attendanceInfo.mainData.map(item=>{
                labels.push(Date(item.date).slice(0, 16))
                datasets[0].data.push(item.attendance.length)
            })
            return {
                labels,
                datasets
            }
        }else{
            return {
                labels: [],
                datasets: [
                    {
                        label: 'Attendance',
                        backgroundColor: 'rgba(75,192,192,.5)',
                        borderColor: 'royalblue',
                        borderWidth: 1,
                        data: []
                    }
                ]
            }
        }
       

        
    }
    return (
        <div className= "statistics-page" >
            <Container>
                <Row>
                    <Col xs = "12" sm = "6" >
                        <Card>
                            <Statistic className = "text-center" loading={members.loading} value = {members.data.length} title = "Total Number of members"  />

                        </Card>
                    </Col>
                    <Col xs="12" sm="6" >
                        <Card>
                            <Statistic  className="text-center" title="Total Number of Groups" />

                        </Card>
                    </Col>
                    <Col className = "my-3" xs="12" sm="12" >
                        <Card>
                            <h4 className="text-center">
                                Attentdence Chart
                            </h4>
                            <Bar
                                data={chartState()}
                                options={{
                                    title: {
                                        display: true,
                                        text: 'Attendence per meeting',
                                        fontSize: 20
                                    },
                                    legend: {
                                        display: true,
                                        position: 'right'
                                    }
                                }}
                            title = "Attendence trends"  color = "blue" />
                        </Card>
                    </Col>
                </Row>
                
            </Container>
            

        </div>
    )
}
const mapStateToProps = state=>{
    return {
        members:state.members,
        attendanceInfo: state.meetingDays
    }
}

export default connect(mapStateToProps)(StatisticsPage)
