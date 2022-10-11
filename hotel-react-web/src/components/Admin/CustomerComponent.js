import { Component } from "react"
import moment from 'moment';

class CustomerComponent extends Component {
    state = {}
    constructor() {
        super();
        this.state = {
            user: []
        };
    }

    componentDidMount() {
        this.loginAdminStorage = JSON.parse(localStorage.getItem('login-admin'));
        if (this.loginAdminStorage == null)
            window.location.href = "/";

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:3001/customer', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'user': data }, function () {
                    console.log(this.state.room)
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('Error while inserting data');
            });
    }

    render() {
        return (
            <div className="bg-div" style={{ 'paddingLeft': '2%', 'paddingRight': '2%' }}>
                <div className="header-topic">
                    <span className="header-reserve">CUSTOMER</span>
                    <hr />
                </div>
                <br />
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">USER ID</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Email</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Phone No</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Firstname</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Lastname</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Gender</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Date of Birth</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Member Type</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Point</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Total Consumption</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.user.map((user, index) => (
                                <tr key={index} style={{ 'verticalAlign': 'middle' }}>
                                    <td>{user.ctUserID}</td>
                                    <td style={{ 'textAlign': 'center' }}>{user.ctEmail}</td>
                                    <td style={{ 'textAlign': 'center' }}>0{user.ctTel}</td>
                                    <td style={{ 'textAlign': 'center' }}>{user.ctFirstName}</td>
                                    <td style={{ 'textAlign': 'center' }}>{user.ctLastName}</td>
                                    <td style={{ 'textAlign': 'center' }}>{user.ctGender}</td>
                                    <td style={{ 'textAlign': 'center' }}>{user.ctDOB !== null && user.ctDOB !== '0000-00-00' ? moment(user.ctDOB).format('DD-MM-YYYY') : '-'}</td>
                                    <td style={{ 'textAlign': 'center' }}>{user.mbTypeName}</td>
                                    <td style={{ 'textAlign': 'center' }}>{user.ctPoint}</td>
                                    <td style={{ 'textAlign': 'center' }}>{user.ctTotalConsumption}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br />
            </div>
        )
    }
}

export default CustomerComponent