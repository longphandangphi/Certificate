import React, { Component } from 'react'
import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
import cookie from 'react-cookies'
import RequestHelper from '../helpers/request.helper'
import 'antd/dist/antd.css'

class CertificateStatus extends Component {
    state = {
        certificateStatus : {}
    }
    componentDidMount() {
        if(cookie.load('token') === undefined){
            this.props.history.push("/signin");
        }
        RequestHelper.get(`https://localhost:44319/api/certificateStatuses/self`)
          .then(res => {
            console.log(res,"GET CERT SELF")
            this.setState({
                certificateStatus: res
            })
        });
        
    }
    render() {
        console.log(this.state,"LOL");
        const { certificateStatus } = this.state;
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="col l9 s12">
                            
                            <h5>TRẠNG THÁI CHỨNG CHỈ</h5>

                            {/* <p>Giáo dục quốc phòng: &nbsp;&nbsp;
                                {
                                    certificateStatus.nationalDefenseAndSecurityCertificateStatus 
                                    ? ( <span><i class="material-icons green-text">check_box</i> Đã hoàn thành</span>) 
                                    : ( <span><i class="material-icons red-text">cancel</i> Chưa hoàn thành</span>)
                                }
                            </p>
                            <p>Giáo dục thể chất: &nbsp;&nbsp;
                                {
                                    certificateStatus.physicalEducationCertificateStatus 
                                    ? ( <span><i class="material-icons green-text">check_box</i> Đã hoàn thành</span>) 
                                    : ( <span><i class="material-icons red-text">cancel</i> Chưa hoàn thành</span>)
                                }
                            </p>
                            <p>Chứng chỉ ngoại ngữ: &nbsp;&nbsp;
                                {
                                    certificateStatus.languageCertificateStatus 
                                    ? ( <span><i class="material-icons green-text">check_box</i> Đã hoàn thành</span>) 
                                    : ( <span><i class="material-icons red-text">cancel</i> Chưa hoàn thành</span>)
                                }
                            </p>
                            <p>Chứng chỉ tin học: &nbsp;&nbsp;
                                {
                                    certificateStatus.informaticsCertificateStatus 
                                    ? ( <span><i class="material-icons green-text">check_box</i> Đã hoàn thành</span>) 
                                    : ( <span><i class="material-icons red-text">cancel</i> Chưa hoàn thành</span>)
                                }
                            </p> */}

                            <table>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Yêu cầu</th>
                                    <th>Trạng thái của bạn</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr>
                                    <th>Chứng chỉ Giáo dục quốc phòng</th>
                                    <td>Eclair</td>
                                    <td>
                                        {
                                            certificateStatus.nationalDefenseAndSecurityCertificateStatus 
                                            ? ( <span><i class="material-icons green-text">check_box</i> Đã hoàn thành</span>) 
                                            : ( <span><i class="material-icons red-text">cancel</i> Chưa hoàn thành</span>)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>Chứng chỉ Giáo dục thể chất</th>
                                    <td>Jellybean</td>
                                    <td>
                                        {
                                            certificateStatus.physicalEducationCertificateStatus 
                                            ? ( <span><i class="material-icons green-text">check_box</i> Đã hoàn thành</span>) 
                                            : ( <span><i class="material-icons red-text">cancel</i> Chưa hoàn thành</span>)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>Chứng chỉ Ngoại ngữ</th>
                                    <td>Lollipop</td>
                                    <td>
                                        {
                                            certificateStatus.languageCertificateStatus 
                                            ? ( <span><i class="material-icons green-text">check_box</i> Đã hoàn thành</span>) 
                                            : ( <span><i class="material-icons red-text">cancel</i> Chưa hoàn thành</span>)
                                        }

                                    </td>
                                </tr>
                                <tr>
                                    <th>Chứng chỉ Tin học</th>
                                    <td>Lollipop</td>
                                    <td>
                                        {
                                            certificateStatus.informaticsCertificateStatus 
                                            ? ( <span><i class="material-icons green-text">check_box</i> Đã hoàn thành</span>) 
                                            : ( <span><i class="material-icons red-text">cancel</i> Chưa hoàn thành</span>)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>Điểm ngoại khóa</th>
                                    <td>Lollipop</td>
                                    <td>
                                        {
                                            certificateStatus.informaticsCertificateStatus 
                                            ? ( <span><i class="material-icons green-text">check_box</i> Đã hoàn thành</span>) 
                                            : ( <span><i class="material-icons red-text">cancel</i> Chưa hoàn thành</span>)
                                        }
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        
                        <div className="col l3 s12">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default CertificateStatus
