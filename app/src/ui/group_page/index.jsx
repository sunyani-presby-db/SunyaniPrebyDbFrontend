import React, { useState } from 'react'
import { Row, Col, Card, Statistic, Button, Input, Form } from 'antd'
import './styles/style.scss'
import CustomDrawer from './custom_drawer'
import CustomForm from './custom_form'
import CustomTable from './custom_table'
import { connect } from 'react-redux'

const GroupPage = ({groupData})  => {
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
              <Statistic value={groupData.data.length || 0} className="text-center" title="Number of users" />
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
              <Row>
                <Col span={12}><h3>List of groups</h3></Col>
                <Col span={12}>
                  <Form>
                    <Form.Item label='search:'>
                      <Input.Search label='search' placeholder=''/>
                    </Form.Item>
                  </Form>
               
                </Col>
              </Row>
              <CustomTable source={groupData.data}/>
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

const mapStateToProps= state => {
  return {
    groupData: state.groups
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchGroups: data => dispatch(fetchGroupData(data))
//   }
// }

export default connect(mapStateToProps)(GroupPage)
