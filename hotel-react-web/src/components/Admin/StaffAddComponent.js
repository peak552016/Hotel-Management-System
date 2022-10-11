import { Component } from "react"

class StaffAddComponent extends Component {
    state = {}
    constructor() {
        super();
        this.state = {
            password: '',
            salary: '',
            position: 'P00001',
            email: '',
            phone: '',
            firstname: '',
            lastname: ''
        };
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
    }

    componentDidMount() {
        this.loginAdminStorage = JSON.parse(localStorage.getItem('login-admin'));
        if (this.loginAdminStorage == null || this.loginAdminStorage.pName !== 'Manager')
            window.location.href = "/";

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

    register(e) {
        e.preventDefault();
        const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{5,})");
        console.log(this.state.password)
        console.log(mediumRegex.test(this.state.password))
        if (mediumRegex.test(this.state.password)) {
            let raw = JSON.stringify({
                "password": this.state.password,
                "firstname": this.state.firstname,
                "lastname": this.state.lastname,
                "position": this.state.position,
                "email": this.state.email,
                "phone": this.state.phone,
                "salary": this.state.salary
            });

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: raw
            };

            fetch('http://localhost:3001/staff/add', requestOptions)
                .then(response => response)
                .then(data => {
                    alert('Successfully inset the employee');
                    window.location.href = "/staff";
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    alert('Error while inserting data');
                });
        } else {
            this.setState({ "error": "password should be contains at least 1 uppercase and lowercase letter and least 1 number Length more than 5" });
        }
    }

    render() {
        return (
            <div className="bg-div" style={{ 'paddingLeft': '2%', 'paddingRight': '2%' }}>
                <div className="header-topic">
                    <span className="header-reserve">ADD STAFF</span>
                    <hr />
                </div>
                <br />
                <div>
                    <form onSubmit={this.register}>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="email" className="control-label">Email *</label>
                                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" placeholder="Your Email *" required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="password" className="control-label">Password *</label>
                                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" placeholder="Your Password *" required />
                                </div>
                            </div>
                            <div className="col-md-4">
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
                                <button type="submit" className="btn btn-primary">Register</button>
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

export default StaffAddComponent