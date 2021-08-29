import React from 'react'
import { Modal } from 'antd'
// import './styles/style.scss'
const CustomModal = ({label, hideModalHandler, hide, children}) =>  {


  return (
    <>
      <Modal 
      footer={null}
      onCancel={() => hideModalHandler(false)}
      closable='true' 
      visible={hide}>
      {children}
      </Modal>
    </>
  )
}

export default CustomModal


CustomModal.defaultProps = {
  hide: false,
  hideModalHandler: (e) => {console.log('Drawer func not set', e)},
  label: 'Custom Drawer',
}