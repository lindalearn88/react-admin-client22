import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input
} from 'antd';

const Item = Form.Item;

/*
更新分类的form组件
 */
export default class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
  }

  componentWillMount() {
    // 将form对象通过setForm()传递父组件

  }

  render() {

    const { categoryName, upref } = this.props;


    return (
      <Form ref={upref} initialValues={{ categoryName: categoryName }}>
        <Item rules={[{ required: true, message: '分类名称必须输入' }]}>
          <Input placeholder='请输入分类名称' />
        </Item>
      </Form >
    )
  }
}

