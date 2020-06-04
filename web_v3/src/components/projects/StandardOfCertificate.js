import React, { Component } from 'react'
import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
import cookie from 'react-cookies'
import RequestHelper from '../helpers/request.helper'
import 'antd/dist/antd.css'

class StandardOfCertificate extends Component {
    state = {
        standardOfCertificate : {},
        student: {}
    }
    componentDidMount() {
        if(cookie.load('token') === undefined){
            this.props.history.push("/signin");
        } else {
            RequestHelper.get(`https://localhost:44319/api/standardOfCertificates/self`)
            .then(res => {
                this.setState({
                    standardOfCertificate: res
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
        console.log(this.state,"LOL");
        const { standardOfCertificate, student } = this.state;
        console.log(standardOfCertificate,"standardOfCertificate");
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row" style={{marginTop: 15}}>
                        <div className="col l9 s12">
                            
                            <h5 className="center cyan-text ">THÔNG TIN VỀ CÁC CHỨNG CHỈ</h5>

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
                                <tr className="light-blue lighten-5">
                                    <th style={{width: '30%'}}>Điều kiện</th>
                                    <th>Thông tin chi tiết</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr>
                                    <th>Giáo dục quốc phòng</th>
                                    <td>
                                        <div className="row">
                                            <div className="col s12">
                                                <div className="card">
                                                    <div className="card-content">
                                                        <div className="row">
                                                            <div className="col s3">
                                                                <p>Bắt buộc:</p>
                                                            </div>
                                                            <div className="col s8">
                                                                <p>{student.specialty && standardOfCertificate.isRequireNationalDefenseAndSecurity ? 'Có' : 'Không'}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col s3">
                                                                <p>Chi tiết:</p>
                                                            </div>
                                                            <div className="col s8">
                                                                <p>{student.specialty && standardOfCertificate.nationalDefenseAndSecurityReference}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Giáo dục thể chất</th>
                                    <td>
                                        <div className="row">
                                            <div className="col s12">
                                                <div className="card">
                                                    <div className="card-content">
                                                        <div className="row">
                                                            <div className="col s3">
                                                                <p>Bắt buộc:</p>
                                                            </div>
                                                            <div className="col s8">
                                                                <p>{student.specialty && standardOfCertificate.isRequirePhysicalEducation ? 'Có' : 'Không'}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col s3">
                                                                <p>Chi tiết:</p>
                                                            </div>
                                                            <div className="col s8">
                                                                <p>{student.specialty && standardOfCertificate.physicalEducationReference}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Ngoại ngữ</th>
                                    <td>
                                        <div className="row">
                                            <div className="col s12">
                                                <div className="card">
                                                    <div className="card-content">
                                                        <div className="row">
                                                            <div className="col s3">
                                                                <p>Bắt buộc:</p>
                                                            </div>
                                                            <div className="col s8">
                                                                <p>{student.specialty && standardOfCertificate.isRequireLanguage ? 'Có' : 'Không'}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col s3">
                                                                <p>Chi tiết:</p>
                                                            </div>
                                                            <div className="col s8">
                                                                <p>{student.specialty && standardOfCertificate.languageReference}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Tin học</th>
                                    <td>
                                        <div className="row">
                                            <div className="col s12">
                                                <div className="card">
                                                    <div className="card-content">
                                                        <div className="row">
                                                            <div className="col s3">
                                                                <p>Bắt buộc:</p>
                                                            </div>
                                                            <div className="col s8">
                                                                <p>{student.specialty && standardOfCertificate.isRequireInformatics ? 'Có' : 'Không'}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col s3">
                                                                <p>Chi tiết:</p>
                                                            </div>
                                                            <div className="col s8">
                                                                <p>{student.specialty && standardOfCertificate.informaticsReference}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Điểm ngoại khóa</th>
                                    <td>
                                        <div className="row">
                                            <div className="col s12">
                                                <div className="card">
                                                    <div className="card-content">
                                                        <div className="row">
                                                            <div className="col s3">
                                                                <p>Bắt buộc:</p>
                                                            </div>
                                                            <div className="col s8">
                                                                <p>{student.specialty && standardOfCertificate.isRequireExtracurricularPoint ? 'Có' : 'Không'}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col s3">
                                                                <p>Chi tiết:</p>
                                                            </div>
                                                            <div className="col s8">
                                                                <p>{student.specialty && standardOfCertificate.extracurricularPointReference}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default StandardOfCertificate
