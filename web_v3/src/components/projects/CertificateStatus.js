import React, { Component } from 'react'
import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
import cookie from 'react-cookies'
import RequestHelper from '../helpers/request.helper'
import 'antd/dist/antd.css'
import ReactHtmlParser from "react-html-parser";

class CertificateStatus extends Component {
    state = {
        certificateStatus : {},
        student: {},
    }

    componentDidMount() {
        if(cookie.load('token') === undefined){
            this.props.history.push("/signin");
        } else {
            RequestHelper.get(`https://localhost:44319/api/certificateStatuses/self`)
            .then(res => {
                this.setState({
                    certificateStatus: res
                })
            });
            setTimeout(() => {
                RequestHelper.get(`https://localhost:44319/api/students/self`)
                .then(res => {
                    this.setState({
                        student: res
                    })
                });
            },100)
        }
    }

    render() {
        const { certificateStatus, student } = this.state;
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row" style={{marginTop: 15}}>
                        <div className="col l9 s12">
                            
                            <h5 className="center cyan-text ">TRẠNG THÁI CHỨNG CHỈ</h5>

                            <div className="row">
                                <div className="col s12">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="row">
                                            <div className="col s6">
                                                <p><b className="">Họ và tên: &emsp;{student.specialty && (student.lastName + " " + student.firstName)}</b></p>
                                                <p><b className="">Hệ: &emsp;Chính quy</b></p>
                                                <p><b className="">Lớp: &emsp;{student.specialty && student.class.name}</b></p>
                                            </div>
                                            <div className="col s6">
                                                <p><b className="">Ngành: &emsp;{student.specialty && student.specialty.major.name}</b></p>
                                                <p><b className="">Chuyên ngành: &emsp;{student.specialty && student.specialty.name}</b></p>
                                                <p><b className="">Khoa: &emsp;{student.specialty && student.class.faculty.name}</b></p>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className="highlight">
                                <thead>
                                <tr>
                                    <th style={{minWidth:250}}></th>
                                    <th>Điều kiện yêu cầu<a href="/standardOfCertificate"> (Xem chi tiết)</a></th>
                                    <th style={{minWidth:150}}>Trạng thái của bạn</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr>
                                    <th>Chứng chỉ Giáo dục quốc phòng</th>
                                    <td>
                                        {student.specialty && student.specialty.standardOfCertificate.nationalDefenseAndSecurityReference}
                                    </td>
                                    <td>
                                        {
                                            student.specialty && student.specialty.standardOfCertificate.isRequireNationalDefenseAndSecurity
                                            ?   (certificateStatus.nationalDefenseAndSecurity 
                                                ? ( <span><i className="material-icons green-text">check_box</i> Đã hoàn thành</span>) 
                                                : ( <span><i className="material-icons red-text">cancel</i> Chưa hoàn thành</span>))
                                            :   (<span><i className="material-icons blue-text">indeterminate_check_box</i> Không bắt buộc</span>)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>Chứng chỉ Giáo dục thể chất</th>
                                    <td>
                                        {student.specialty && student.specialty.standardOfCertificate.physicalEducationReference}
                                    </td>
                                    <td>
                                        {   
                                            student.specialty && student.specialty.standardOfCertificate.isRequirePhysicalEducation
                                            ?   (certificateStatus.physicalEducation 
                                                ? ( <span><i className="material-icons green-text">check_box</i> Đã hoàn thành</span>) 
                                                : ( <span><i className="material-icons red-text">cancel</i> Chưa hoàn thành</span>))
                                            :   (<span><i className="material-icons blue-text">indeterminate_check_box</i> Không bắt buộc</span>)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>Chứng chỉ Ngoại ngữ</th>
                                    <td>
                                        {student.specialty && ReactHtmlParser(student.specialty.standardOfCertificate.languageReference)}
                                    </td>
                                    <td>
                                        {
                                            student.specialty && student.specialty.standardOfCertificate.isRequireLanguage
                                            ?   (certificateStatus.language 
                                                ? ( <span><i className="material-icons green-text">check_box</i> Đã hoàn thành</span>) 
                                                : ( <span><i className="material-icons red-text">cancel</i> Chưa hoàn thành</span>))
                                            :   (<span><i className="material-icons blue-text">indeterminate_check_box</i> Không bắt buộc</span>)
                                        }

                                    </td>
                                </tr>
                                <tr>
                                    <th>Chứng chỉ Tin học</th>
                                    <td>
                                        {student.specialty && student.specialty.standardOfCertificate.informaticsReference}
                                    </td>
                                    <td>
                                        {
                                            student.specialty && student.specialty.standardOfCertificate.isRequireInformatics
                                            ? (certificateStatus.informatics 
                                                ? ( <span><i className="material-icons green-text">check_box</i> Đã hoàn thành</span>) 
                                                : ( <span><i className="material-icons red-text">cancel</i> Chưa hoàn thành</span>))
                                            :   (<span><i className="material-icons blue-text">indeterminate_check_box</i> Không bắt buộc</span>)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>Điểm ngoại khóa</th>
                                    <td>
                                        {student.specialty && student.specialty.standardOfCertificate.extracurricularPointReference}
                                    </td>
                                    <td>
                                        {
                                            student.specialty && student.specialty.standardOfCertificate.isRequireExtracurricularPoint
                                            ?   (certificateStatus.extracurricularPoint 
                                                ? ( <span><i className="material-icons green-text">check_box</i> Đã hoàn thành</span>) 
                                                : ( <span><i className="material-icons red-text">cancel</i> Chưa hoàn thành</span>)) 
                                            :   (<span><i className="material-icons blue-text">indeterminate_check_box</i> Không bắt buộc</span>)
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
