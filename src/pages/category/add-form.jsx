import React, { Component } from 'react';

import {
  Form,
  Select,
  Input
} from 'antd';

const Option = Select.Option;

/*
添加分类的form组件
 */
export default class AddForm extends Component {


  componentWillMount() {
    this.setState = {
      form: this.props.form
    }

  }

  render() {

    const { categorys, form } = this.props;
    debugger
    return (
      <Form form={form}>
        <Form.Item name="parentId" >

          <Select>
            <Option value='0'>一级分类</Option>
            {
              categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
            }
          </Select>
        </Form.Item>

        <Form.Item name="categoryName" rules={[{ required: true, message: '分类名称必须输入' }]}>

          <Input placeholder='请输入分类名称' />
        </Form.Item>
      </Form >
    )
  }
}
