import { Component } from "react"

class StaffComponent extends Component {
    state = {}
    constructor() {
        super();
        this.state = {
            user: []
        };
    }

    componentDidMount() {
        this.loginAdminStorage = JSON.parse(localStorage.getItem('login-admin'));
        if (this.loginAdminStorage == null || this.loginAdminStorage.pName !== 'Manager')
            window.location.href = "/";

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:3001/staff', requestOptions)
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
                    <span className="header-reserve">STAFF</span>
                    <hr />
                    <div className="row">
                        <div className="col-12" style={{ 'textAlign': 'right' }}><a href="/staff-add"><button className="btn btn-success">ADD STAFF</button></a></div>
                    </div>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">STAFF ID</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Firstname</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Lastname</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Phone No</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Email</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Position</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.user.map((user, index) => (
                                <tr key={index} style={{ 'verticalAlign': 'middle' }}>
                                    <td>{user.StaffID}</td>
                                    <td style={{ 'textAlign': 'center' }}>{user.sFirstName}</td>
                                    <td style={{ 'textAlign': 'center' }}>{user.sLastName}</td>
                                    <td style={{ 'textAlign': 'center' }}>{user.sPhoneNum}</td>
                                    <td style={{ 'textAlign': 'center' }}>{user.sMail}</td>
                                    <td style={{ 'textAlign': 'center' }}>{user.pName}</td>
                                    <td style={{ 'textAlign': 'center' }}><a href={"/staff-edit?staffid=" + user.StaffID}><button className="btn btn-success">EDIT</button></a></td>
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

export default StaffComponent