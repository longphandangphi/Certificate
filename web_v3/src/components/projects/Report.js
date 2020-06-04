import React, { Component } from 'react'
import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
import cookie from 'react-cookies'
import RequestHelper from '../helpers/request.helper'
import 'antd/dist/antd.css'
import { Row, Col, Button, FormGroup, Table } from "reactstrap"
import Form from "react-validation/build/form"
import ValidationInput from "../helpers/validation-input"
import CKEditorInput from "../helpers/ckeditor-input";


class Report extends Component {
    state = {
        student: {},
        item: {
            subject: "",
            content: null,
            studentId: ""
        }
    }
    componentDidMount() {
        if(cookie.load('token') === undefined){
            this.props.history.push("/signin");
        } else {
            RequestHelper.get(`https://localhost:44319/api/students/self`)
            .then(res => {
                this.setState({
                    student: res
                })
            });
        }
    }

    onModelChange = el => {
        let inputName = el.target.name;
        let inputValue = el.target.value;
        let item = Object.assign({}, this.state.item);
        item[inputName] = inputValue;
        this.setState({ item });
    };

    onContentChange = e => {
        let item = Object.assign({}, this.state.item);
        item.content = e.editor.getData();
        this.setState({ item });
    };

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    
    handleSubmit = (event) => {
        const { subject, content } = this.state.item;
        const studentId = this.state.student.id;
        const response = "empty";
        const report = {subject, content, response, studentId};
        RequestHelper.post(`https://localhost:44319/api/reports`,report)
        .then(res => {
            alert('Your report was submitted successfully!');
        });
        event.preventDefault();
    }

    render() {
        const { student } = this.state;
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row" style={{marginTop: 15}}>
                        <div className="col l9 s12">
                            
                            <h5 className="center cyan-text ">Gửi báo cáo cho nhà quản trị</h5>

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

                            <div>
                            <Form
                            >
                                {/* <Row>
                                <Col>
                                    <FormGroup>
                                    <ValidationInput
                                        name="subject"
                                        title="Subject"
                                        type="text"
                                        required={true}
                                        value={""}
                                        onChange={this.onModelChange}
                                    />
                                    </FormGroup>
                                </Col>
                                </Row>

                                <Row>
                                <Col>
                                    <FormGroup>
                                    <CKEditorInput title="Content" name="content" data={""} onChange={this.onContentChange} />
                                    </FormGroup>
                                </Col>
                                </Row> */}
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                    Subject:
                                    <input type="text" name="subject" value={this.state.item.subject} onChange={this.onModelChange} />
                                    </label>

                                    <label>
                                    Content: 
                                    <CKEditorInput title="" name="content" data={""} onChange={this.onContentChange} />
                                    </label>
                                    {/* <input type="submit" value="Send report" /> */}
                                    <Button color="danger" type="submit">
                                    Send report
                                    </Button>
                                </form>
                                {/* <div className="text-center">
                                <Button color="danger" type="submit">
                                    Send report
                                </Button>
                                &nbsp;
                                <Button color="secondary" >
                                    Cancel
                                </Button>
                                </div> */}
                            </Form>
                            </div>
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

export default Report
