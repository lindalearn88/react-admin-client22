import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import ProductDetail from './detail';
import ProductAddUpdate from './add-update'
import ProductHome from './home'
import './product.less'

export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path="/product" component={ProductHome} exact></Route>
                <Route path="/product/detail" component={ProductDetail}></Route>
                <Route path="/product/addorupdate" component={ProductAddUpdate}></Route>
                <Redirect to="/product"></Redirect>
            </Switch>
        )
    }
}
