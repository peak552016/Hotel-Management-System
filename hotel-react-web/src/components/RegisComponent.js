import { Component } from "react"

class RegisComponent extends Component {
    state = {}

    constructor() {
        super();
        this.state = {
            "email": "",
            "password": "",
            "phone": "",
            "dob": "",
            "firstname": "",
            "lastname": "",
            "gender": "",
            "error": ""
        }

        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
    }

    componentDidMount() {
        this.loginStorage = JSON.parse(localStorage.getItem('login'));
        this.loginAdminStorage = JSON.parse(localStorage.getItem('login-admin'));
        if (this.loginStorage != null || this.loginAdminStorage != null)
            window.location.href = "/";
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
                "gender": this.state.gender,
                "email": this.state.email,
                "phone": this.state.phone,
                "dob": this.state.dob
            });

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: raw
            };

            fetch('http://localhost:3001/signup', requestOptions)
                .then(response => response.json())
                .then(data => {
                    alert('Successful registration');
                    window.location.href = "/login";
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    alert('An error occurred while inserting data');
                });
        } else {
            this.setState({ "error": "password should be contains at least 1 uppercase and lowercase letter and least 1 number Length more than 5" });
        }
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

    render() {
        return (
            <div className="bg-div">
                <div id="form-margin">
                    <div className="header-topic">
                        <span>REGISTRATION</span>
                        <hr />
                    </div>
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
                                <button type="submit" className="btn btn-primary">Register</button>
                                <br />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default RegisComponent