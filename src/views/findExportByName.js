import React from 'react';
import {Input} from 'antd';
import '../index.css';
import 'antd/dist/antd.css'
import axios from 'axios';
import Qs from 'qs';
import Info from '../data/dataList';
import Footer from '../data/processData';


class FindExportByName extends React.Component {
    state = {
        current: '1',
        modulename: null,
        exportname: null,
        processname: null,
        findExportsresp: null,

    };
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    onFindExportByName() {
        axios({
            url: 'http://127.0.0.1:8000/findExportByName/',
            method: 'post',
            transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
            }],
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                modulename: this.state.modulename,
                exportname: this.state.exportname,
                processname: this.state.processname,


            }


        })
            .then(data => this.setState({
                findExportsresp: data.data
            }))
            .catch(console.log("发送请求失败"));
    };


    render() {
        return (
            <div key='/findExportByName'>
                <Input addonBefore="ModuleName:" value={this.state.modulename} onChange={e => this.setState({
                    modulename: e.target.value
                })} style={{width: 600}} size={"large"}/>
                <Input addonBefore="ExportName:" value={this.state.exportname} onChange={e => this.setState({
                    exportname: e.target.value
                })} style={{width: 600}} size={"large"}/>
                <Input.Search enterButton="Submit" addonBefore="ProcessName:" value={this.state.processname}
                              onChange={e => this.setState({
                                  processname: e.target.value
                              })} style={{width: 600}} size={"large"} onSearch={this.onFindExportByName.bind(this)}/>
                <div>
                    <div>{this.state.enumExportsresp}</div>
                    <Info/>

                </div>
                <Footer/>
            </div>

        );
    }
}

export default FindExportByName;
