import { Component } from "react"
import moment from 'moment';

class ProfileComponent extends Component {
    state = {}
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            gender: '',
            dob: '',
            ctPoint: 0,
            ctTotalConsumption: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        this.loginStorage = JSON.parse(localStorage.getItem('login'));
        this.setState({ 'userId': <span className="bg-text-user">User ID : {this.showUserId(this.loginStorage.ctUserId)}</span> });
        this.setState({ 'memberType': <span className="bg-text-user">Member Type : {this.loginStorage.mbTypeName}</span> })
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:3001/user-info?userid=' + this.loginStorage.ctUserId, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'user' : data });
                this.setState({ 'firstname' : data.firstname });
                this.setState({ 'lastname' : data.lastname });
                if(data.dob != null) {
                    let dob = moment(data.dob).format('YYYY-MM-DD');
                    this.setState({ 'dob' : dob });
                }
                this.setState({ 'gender' : data.gender });
                this.setState({ 'email' : data.email });
                this.setState({ 'phone' : data.phone });
                this.setState({ 'memberPoint': <span className="bg-text-user">Member Point : {data.ctPoint}</span> })
                this.setState({ 'memberTotal': <span className="bg-text-user">Member Total Consumption : {data.ctTotalConsumption != null ? data.ctTotalConsumption : 0}</span> })
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('An error occurred while inserting data');
            });

    }

    showUserId(id) {
        let user = "CT";
        for (let index = 0; index < 5 - id.toString().length; index++) {
            user += "0";
        }
        user += id;
        return user;
    }

    showBookingId(id) {
        let user = "B";
        for (let index = 0; index < 6 - id.toString().length; index++) {
            user += "0";
        }
        user += id;
        return user;
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ "error": "" });
    }

    edit(e) {
        e.preventDefault();
        let loginStorage = JSON.parse(localStorage.getItem('login'));

        let raw = JSON.stringify({
            "userid": loginStorage.ctUserId,
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "gender": this.state.gender,
            "dob": this.state.dob
        });

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/update-user', requestOptions)
            .then(response => response)
            .then(data => {
                alert('Update information successfully');
                window.location.href = "/profile";
            })
            .catch(error => {
                console.log(error)
                alert('Some information is incorrect. Please try again');
            });
    }

    render() {
        return (
            <div className="bg-div" style={{ 'paddingLeft': '10%', 'paddingRight': '10%' }}>
                <div className="header-topic">
                    <span className="header-reserve">PROFILE</span>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-12">
                        {this.state.userId}
                        {this.state.memberType}
                        {this.state.memberPoint}
                        {this.state.memberTotal}
                    </div>
                </div>
                <br />
                <div className="row">
                <form onSubmit={this.edit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="email" className="control-label">Email *</label>
                                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" placeholder="Your Email *" readOnly />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="phone" className="control-label">Phone Number *</label>
                                    <input type="text" name="phone" value={this.state.phone} onChange={this.handleChangePhone} className="form-control" placeholder="Your Phone Number *" readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="firstname" className="control-label">Firstname</label>
                                    <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} className="form-control" placeholder="Your Firstname" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="lastname" className="control-label">Lastname</label>
                                    <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} className="form-control" placeholder="Your Lastname" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="dob" className="control-label">Birthday</label>
                                    <input type="date" name="dob" value={this.state.dob} onChange={this.handleChange} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="gender" className="control-label">Gender</label>
                                    <select className="form-select" name="gender" value={this.state.gender} onChange={this.handleChange} >
                                        <option disabled value="">Choose...</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group" style={{ 'textAlign': 'center' }}>
                                <span style={{ 'color': 'red' }}>{this.state.error}</span>
                                <br />
                                <button type="submit" className="btn btn-primary">Update</button>
                                <br />
                            </div>
                        </div>
                    </form>
                </div>
                <br />
                <div>

                </div>
                <br />
            </div>
        )
    }
}

export default ProfileComponent