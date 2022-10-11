import { Component } from "react"

class StaffEditComponent extends Component {
    state = {}
    constructor() {
        const queryParams = new URLSearchParams(window.location.search);
        const staffid = queryParams.get("staffid") != null ? queryParams.get("staffid") : '';
        super();
        this.state = {
            salary: '',
            position: '',
            email: '',
            phone: '',
            firstname: '',
            lastname: '',
            staffid: staffid
        };
        this.edit = this.edit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
    }

    componentDidMount() {
        this.loginAdminStorage = JSON.parse(localStorage.getItem('login-admin'));
        if (this.loginAdminStorage == null || this.loginAdminStorage.pName !== 'Manager')
            window.location.href = "/";

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:3001/staff-info?staffid=' + this.state.staffid, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ "salary": data.salary });
                this.setState({ "position": data.position });
                this.setState({ "email": data.email });
                this.setState({ "phone": data.phone });
                this.setState({ "firstname": data.firstname });
                this.setState({ "lastname": data.lastname });
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('Error while inserting data');
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ "error": "" });
    }

    handleChangePhone(e) {
        const re = /^[0][0-9\b]*$/;
        const { name, value } = e.target;
        if (value === '' || re.test(value)) {
            this.setState({ [name]: value });
        }
    }

    edit(e) {
        e.preventDefault();
        let raw = JSON.stringify({
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "position": this.state.position,
            "email": this.state.email,
            "phone": this.state.phone,
            "salary": this.state.salary,
            "staffid": this.state.staffid
        });

        console.log(raw)
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/staff/edit', requestOptions)
            .then(response => response)
            .then(data => {
                alert('Successfully edited the employee information');
                window.location.href = "/staff";
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
                    <span className="header-reserve">EDIT STAFF ID : {this.state.staffid}</span>
                    <hr />
                </div>
                <br />
                <div>
                    <form onSubmit={this.edit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="email" className="control-label">Email *</label>
                                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" placeholder="Your Email *" required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="phone" className="control-label">Phone Number *</label>
                                    <input type="text" name="phone" value={this.state.phone} onChange={this.handleChangePhone} className="form-control" placeholder="Your Phone Number *" required />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="firstname" className="control-label">Firstname *</label>
                                    <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} className="form-control" placeholder="Your Firstname *" required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="lastname" className="control-label">Lastname *</label>
                                    <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} className="form-control" placeholder="Your Lastname *" required />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="dob" className="control-label">Salary *</label>
                                    <input type="number" min="1" name="salary" value={this.state.salary} onChange={this.handleChange} className="form-control" required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="gender" className="control-label">Position *</label>
                                    <select className="form-select" name="position" value={this.state.position} onChange={this.handleChange} required>
                                        <option value="P00001">Staff</option>
                                        <option value="P00002">Manager</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group" style={{ 'textAlign': 'center' }}>
                                <span style={{ 'color': 'red' }}>{this.state.error}</span>
                                <br />
                                <button type="submit" className="btn btn-primary">EDIT</button>
                                <br />
                            </div>
                        </div>
                    </form>
                </div>
                <br />
            </div>
        )
    }
}

export default StaffEditComponent