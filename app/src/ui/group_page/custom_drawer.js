import React from 'react'
import { Drawer } from 'antd'
// import './styles/style.scss'
const CustomDrawer = ({label, drawerHandler, hide, children}) =>  {
  const placement = 'right'


  return (
    <div className='custom-drawer'>
      <Drawer
        title={label}
        placement={placement}
        closable={true}
        onClose={(e) => drawerHandler(e, false)}
        visible={hide}
        key={placement}
      >
      {children}
      </Drawer>
    </div>
  )
}

export default CustomDrawer


CustomDrawer.defaultProps = {
  hide: false,
  drawerHandler: (e) => {console.log('Drawer func not set', e)},
  label: 'Custom Drawer',
}