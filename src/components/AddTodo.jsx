
import { Button, Modal, Form, Input, DatePicker, InputNumber, Space, Select } from 'antd';
import { useState } from 'react';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


const Create = () => {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const createTask = () => setIsModalVisible(true)

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleOk = () => {

    form.submit();


  }



  //SUbtask validator for End Date
  const subtaskValidation = (TaskEndDate, subTaskEndDate) => {

    if (TaskEndDate < subTaskEndDate) {
      return Promise.reject('Subtask End Date must be less than Task End Date')
    }
    return Promise.resolve()

  }





  const onFinish = () => {
    setIsModalVisible(false);
    alert('Task Created Succesfully')

  }


  return (
    <div>

      <Button type="primary" onClick={createTask}> Create Task </Button>

      <Modal
        title="Create Todo"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => {
            handleOk();

          }}>
            Submit
          </Button>,
        ]}>
        <Form labelCol={{ xs: { span: 6 } }} wrapperCol={{ xs: { span: 8 } }} form={form} onFinish={onFinish} scrollToFirstError>

          <Form.Item
            label="TaskID:"
            name="TaskID"
            value=""
            rules={[
              {
                required: true,
                message: 'Please input TaskID ?',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="TaskName:"
            name="TaskName"
            value=""
            rules={[
              {
                required: true,
                message: 'Please input TaskName ?',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="TaskEndDate:"
            name="TaskEndDate"
            value=""
            rules={[
              {
                required: true,
                message: 'Please input TaskEndDate?',
              },
            ]}>
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Priority"
            name="Priority"
            value=""
            rules={[
              {
                required: true,
                message: 'Please input Priority?',
              },

            ]}>
            <Select>
              <Select.Option value="Low">Low</Select.Option>
              <Select.Option value="Medium">Medium</Select.Option>
              <Select.Option value="High">High</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="Status"
            value=""
            rules={[
              {
                required: true,
                message: 'Please input Status?',
              },
            ]}>
            <Select>
              <Select.Option value="Not Started">Not Started</Select.Option>
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
            </Select>
          </Form.Item>



          <Form.List name="subtasks"  >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'subTaskID']}
                      value=""
                      rules={[
                        {
                          required: true,
                          message: 'Missing subtaskID',
                        },
                      ]}
                    >
                      <InputNumber placeholder='subTaskId' style={{ width: "120px" }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'subTaskName']}
                      value=""
                      rules={[
                        {
                          required: true,
                          message: 'Missing subtaskName',
                        },
                      ]}
                    >
                      <Input placeholder="subTaskName" style={{ width: "120px" }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'subTaskEndDate']}
                      value=""
                      rules={[
                        {
                          required: true,
                          message: 'Missing subtaskEndDate',

                        },
                        {
                          validator: (_, subTaskEndDate) => subtaskValidation(form.getFieldValue('TaskEndDate'), subTaskEndDate)
                        }


                      ]}
                    >
                      <DatePicker placeholder='EndDate' style={{ width: "120px" }} />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} >
                    Add Subtask
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>



        </Form>
      </Modal>



    </div>
  )
}

export default Create