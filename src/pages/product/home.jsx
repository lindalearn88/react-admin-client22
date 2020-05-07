import React, { Component } from 'react';
import { Card, Select, Table, Button, Input } from 'antd';
import LinkButton from '../../components/link-button';
import { reqProducts, reqSearchProducts } from '../../api';
import { PlusOutlined } from '@ant-design/icons'
import { PAGE_SIZE } from '../../utils/constants'
import memoryUtils from "../../utils/memoryUtils";
const Option = Select.Option;
class home extends Component {
    state = {
        products: [],
        total: 0,
        loading: false,
        searchType: '',
        searchName: ''
    }
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price
            },
            {
                title: '状态',
                width: 100,
                dataIndex: 'status',
                render: (status) => {
                    return (
                        <span>
                            <Button type="primary">下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                width: 100,
                render: (product) => {
                    return (
                        <span>
                            {/*将product对象使用state传递给目标路由组件*/}
                            <LinkButton onClick={() => this.showDetail(product)}>详情</LinkButton>
                            <LinkButton onClick={() => this.showUpdate(product)}>修改</LinkButton>
                        </span>
                    )
                }
            },

        ]

    }
    componentWillMount() {
        this.initColumns();
    }
    componentDidMount() {
        this.getProducts(1);
    }
    getProducts = async (pageNum) => {
        this.setState({
            loading: true
        })
        const { searchName, searchType } = this.state;
        let result;
        if (searchName) {
            result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        } else {
            result = await reqProducts(pageNum, PAGE_SIZE);
        }
        if (result.status === 0) {
            const { total, list } = result.data;
            this.setState({ loading: false })
            this.setState({
                total,
                products: list
            })

        }
    }

    /*
    显示修改商品界面
     */
    showUpdate = (procut) => {
        // 缓存product对象 ==> 给detail组件使用
        memoryUtils.product = procut
        this.props.history.push('/product/addorupdate')
    }
    /*
    显示商品详情界面
     */
    showDetail = (procut) => {
        // 缓存product对象 ==> 给detail组件使用
        memoryUtils.product = procut
        this.props.history.push('/product/detail')
    }
    render() {
        const { products, total, loading, searchType, searchName } = this.state;
        const title = (
            <span>
                <Select value={searchType} style={{ width: '150px' }} onChange={value => this.setState({ searchType: value })}>
                    <Option value="proudctName">按名称</Option>
                    <Option value="productDesc">按描述</Option>
                </Select>
                <Input placeholder="关键字" value={searchName} onChange={event => this.setState({ searchName: event.target.value })}
                    style={{
                        width: '150px', margin: '0 15px'
                    }} />
                <Button type="primary" onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary' onClick={() => this.props.history.push('/product/addorupdate')}>
                <PlusOutlined />
              添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table rowKey="_id"
                    bordered={true}
                    dataSource={products}
                    columns={this.columns}
                    loading={loading}
                    pagination={{
                        current: this.pageNum,
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProduct
                    }}>
                </Table>
            </Card>
        );
    }
}

export default home;