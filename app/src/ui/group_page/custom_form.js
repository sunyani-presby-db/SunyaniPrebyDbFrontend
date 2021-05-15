import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const {TextArea} = Input;
const CustomForm = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Form.Item label="Title" required tooltip="This is a required field">
        <Input placeholder="Title goes here...." />
      </Form.Item>
      <Form.Item
        label="Description"
        tooltip={{
          title: 'Tooltip with customize icon',
          icon: <InfoCircleOutlined />,
        }}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;