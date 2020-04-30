import React from 'react'

const Footer = (props) => {
    return ( 
        <footer className="page-footer cyan lighten-2" >
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="black-text">Thông tin tuyển sinh</h5>
                {/* <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p> */}
                <ul>
                  <li><a className="black-text" href="#!">Kế hoạch tuyển sinh</a></li>
                  <li><a className="black-text" href="#!">Các chương trình đào tạo</a></li>
                  <li><a className="black-text" href="#!">Điều kiện giảng dạy</a></li>
                  <li><a className="black-text" href="#!">Tư vấn tuyển sinh</a></li>
                </ul>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="black-text">Các liên kết khác</h5>
                <ul>
                  <li><a className="black-text " href="#!">Điều hành tác nghiệp</a></li>
                  <li><a className="black-text " href="#!">Elearning</a></li>
                  <li><a className="black-text " href="#!">Thư viện</a></li>
                  <li><a className="black-text " href="#!">Email</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container black-text">
            © 2020 Bản quyền Trường Đại học Kinh Tế Đà Nẵng
            {/* <a className="grey-text text-lighten-5 right" href="#!">More Links</a> */}
            </div>
          </div>
        </footer>
     );
}
 
export default Footer;