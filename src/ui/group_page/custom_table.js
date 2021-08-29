import React from 'react'
import {Table, Space , Tooltip} from 'antd'
import {EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import customColors from '../../utils/ui/custom_colors';


function CustomTable({source}) {

  const getColumns = () => {
    const col = [];
    // console.log('length', source.length)
    if(source.length <= 0){
      return columns;
    }

    col.push({
      title: 'title',
      dataIndex: 'title',
      key: 'title'
    })

    Object.keys(source[0]).filter(key =>{
      if (key.toLowerCase() === 'id' || key.toLowerCase() === 'title' || key.toLowerCase() === 'created_at' || key.toLowerCase() === 'updated_at' || key.toLowerCase() === 'description')
        return false;
      else
        return true;

    }).map( key => {
      if( key.toLowerCase() === 'members')
        return col.push(    {
          title: 'Number of members',
          dataIndex: key,
          key: key,
          render: members => (
            <p>{members.length}</p>
          )
        })
      
      else
      
      return col.push({
        title: key.toLowerCase(),
        dataIndex: key,
        key: key
      })
    })

    // console.log('columns',col);
    col.push(
      {
        title: 'Actions',
        dataIndex: '',
        key: '',
        render: (items, record) => (
           <>
            <Space size='large'>
              <Tooltip title="view group's information">
                <EyeOutlined style={{color: customColors.primary}} />
              </Tooltip>
              <Tooltip title="Edit group's information">
                <EditOutlined style={{color: 'blue'}}/>
              </Tooltip>
              <Tooltip title="Delete group's information">
                <DeleteOutlined style={{color: 'red'}}/>
              </Tooltip>
            </Space>
           </>
          ) 
  
      }
    )

    
    

    return col;
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id'
    },
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
    

  ]


  return (
    <>
      <Table dataSource={source} columns={getColumns()}/>
    </>
  )
}

export default CustomTable
