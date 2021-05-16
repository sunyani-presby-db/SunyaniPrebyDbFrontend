import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';


const {TextArea} = Input;


const CustomForm = ({onSubmit,}) => {

  const [title] =  useState('title')
  const [description] =  useState('description')

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
    layout='vertical'
    name="basic"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Form.Item
      label="Title"
      name="title"
      rules={[{ required: true, message: 'Please input the title!' }]}
    >
      <Input values={title}/>
    </Form.Item>

    <Form.Item
      label="Description"
      name="description"
      rules={[{ required: false, message: 'Please input the description!' }]}
    >
      <TextArea rows={6} value={description}/>
    </Form.Item>


    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>

  );
};

export default CustomForm;

CustomForm.propTypes = {
  onSubmit: () => {console.log('no submit handler invoked')}
}