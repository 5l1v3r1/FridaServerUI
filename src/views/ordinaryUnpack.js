import React from 'react';
import {Input} from 'antd';
import '../index.css';
import 'antd/dist/antd.css'
import axios from 'axios';
import Qs from 'qs';
import Info from '../data/dataList';
import Footer from '../data/processData';


class OrdinaryUnpack extends React.Component {
    state = {
        current: '1',
        processname: null,
        orresp: null,

    };
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    onOrUnpack() {
        axios({
            url: 'http://127.0.0.1:8000/orUnpack/',
            method: 'post',
            transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
            }],
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                processname: this.state.processname,

            }


        })
            .then(data => this.setState({
                orresp: data.data
            }))
            .catch(console.log("发送请求失败"));
    };


    render() {
        return (
            <div key='/ordinaryUnpack'>

                <Input.Search enterButton="Submit" addonBefore="ProcessName:" value={this.state.processname}
                              onChange={e => this.setState({
                                  processname: e.target.value
                              })} style={{width: 600}} size={"large"} onSearch={this.onOrUnpack.bind(this)}/>
                <div>
                    <div>{this.state.orresp}</div>
                    <Info/>

                </div>
                <div>
                    <Footer/>
                </div>
            </div>

        );
    }
}

export default OrdinaryUnpack;
