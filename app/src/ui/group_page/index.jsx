import React, { useState } from 'react'
import { Row, Col, Card, Statistic, Button } from 'antd'
import './styles/style.scss'
import CustomDrawer from './custom_drawer'
import CustomForm from './custom_form'

const GroupPage = ()  => {
  const [hideDrawer, setHideDrawer] = useState(false)

  const drawerHandler = (e, close=true) => {
    if (close)
    setHideDrawer(true)
    else
    setHideDrawer(e.target.value)
  }
  return (
    <div className='group-section'>
      <div className='container'>
        <h1>Groups</h1>
        <Row gutter={[16,16]}>
          <Col sm={{span: 12}}>
            <Card className='custom-panel-card'>
              <Statistic value={10} className="text-center" title="Number of users" />
            </Card>
          </Col>
          <Col sm={{span: 12}}>
            <Card className='custom-panel-card'>
            <Button onClick={drawerHandler} shape="round" style={{ color: "royalblue", borderColor: "royalblue" }} >Add Group</Button>
            </Card>
          </Col>
        </Row>
        <div className='custom-table mt-3'>
          <Row>
          <Col span={24}>
            <Card>
              <p>Enim qui quis laboris commodo magna sit aute minim.</p>
            </Card>
          </Col>
        </Row>
        </div>
      </div>
      <CustomDrawer 
      label={'Add Group'} 
      hide={hideDrawer} 
      drawerHandler={drawerHandler}>
        <CustomForm />
      </CustomDrawer>
    </div>
  )
}

export default GroupPage
