import React from 'react'
import {Table, Space , Tooltip, Popconfirm} from 'antd'
import {EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import customColors from '../../utils/ui/custom_colors';
import useAuthToken from '../../utils/hooks/auth_token_hook';
import { connect } from 'react-redux';
import { deleteGroup } from '../../state_manager/streamlined/group';


function CustomTable({removeGroup,groups,openDetailDrawer,setCurrentGroup}) {

  const token = useAuthToken()
  const getColumns = ()=>{
    let column = []
    if (groups.data.length !==0){
      const object = groups.data[0]
      object["member"] = undefined
      Object.keys(object).forEach(key=>{
        if (key === "title")
        column.push({
          title:"Name",
          dataIndex:key,
          key:key

        })
      })
      column.push({
        title:"Number of members",
        render:(items,record)=>(<p> {record.members.length} </p>),

      })
      column.push(
      {
        title: 'Actions',
        dataIndex: '',
        key: '',
        render: (items, record) => (
           <>
            <Space size='large'>
              <Tooltip title="view group's information">
                <EyeOutlined onClick = {()=>{
                  setCurrentGroup(record)
                  openDetailDrawer()}} style={{color: customColors.primary}} />
              </Tooltip>
              <Tooltip title="Edit group's information">
                <EditOutlined style={{color: 'blue'}}/>
              </Tooltip>
              <Tooltip title="Delete group's information">
                <Popconfirm 
                onConfirm = {()=>{
                    removeGroup(record,token)
                }}
                title = "Are you sure you want to delete this group" >
                  <DeleteOutlined style={{color: 'red'}}/>
                </Popconfirm>
              </Tooltip>
            </Space>
           </>
          ) 
      })
    }else{
      column = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Number of members',
      dataIndex: 'members',
      key: 'members',
      render: members => (
        <p>{members.length}</p>
      )
    },
    {
      title:"Actions"
    }
    

  ]
    }

    return column;
  }


  return (
    <>
      <Table loading = {groups.loading} dataSource={groups.data} columns={getColumns()}/>
    </>
  )
}
const mapStateToProps =state=>{
  return {
    groups: state.groups
  }
}
const mapDispatchToProps=dispatch=>{
  return {
    removeGroup:(group,token)=>dispatch(deleteGroup(group,token))
  }

}
export default connect(mapStateToProps,mapDispatchToProps)(CustomTable)
