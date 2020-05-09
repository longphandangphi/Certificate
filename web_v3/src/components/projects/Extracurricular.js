import React, { Component } from 'react'
import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
import cookie from 'react-cookies'
import RequestHelper from '../helpers/request.helper'
import 'antd/dist/antd.css'

class Extracurricular extends Component {
    state = {
        extracurriculars : [],
        student: {}
    }
    componentDidMount() {
        if(cookie.load('token') === undefined){
            this.props.history.push("/signin");
        } else {
            RequestHelper.get(`https://localhost:44319/api/extracurriculars/self`)
            .then(res => {
                this.setState({
                    extracurriculars: res.sources
                })
            });
            RequestHelper.get(`https://localhost:44319/api/students/self`)
            .then(res => {
                this.setState({
                    student: res
                })
            });
        }
    }

    render() {
        console.log(this.state,"LOL");
         const { extracurriculars, student } = this.state;
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row" style={{marginTop: 15}}>
                        <div className="col l9 s12">
                            
                            <h5 className="center cyan-text ">Hoạt động ngoại khóa</h5>

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
                            <table className="striped centered responsive-table highlight">
                                <thead>
                                <tr className="light-blue lighten-5">
                                    <th>STT</th>
                                    <th>Học kỳ</th>
                                    <th>Tên hoạt động</th>
                                    <th>Thời gian tổ chức</th>
                                    <th>Địa điểm (dự kiến)	</th>
                                    <th>Đơn vị tổ chức</th>
                                    <th>Điểm hoạt động</th>
                                </tr>
                                </thead>

                                <tbody>
                                {   
                                    (extracurriculars.length > 0) && extracurriculars.map((item, index) => 
                                        (
                                        <tr key={item.id}>
                                            <td>{index+1}</td>
                                            <td>{item.extracurricularActivity.semester}</td>
                                            <td>{item.extracurricularActivity.name}</td>
                                            <td>{item.extracurricularActivity.organizedTime}</td>
                                            <td>{item.extracurricularActivity.expectedLocation}</td>
                                            <td>{item.extracurricularActivity.organizedUnit}</td>
                                            <td>{item.extracurricularActivity.point}</td>
                                        </tr>
                                        )
                                    )
                                }
                                    <tr>
                                        <th colSpan="6">Tổng điểm:</th>
                                        <th >{student.specialty && student.extracurricularPoint}</th>
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

export default Extracurricular
