import { Component } from "react"

class LoginComponent extends Component {
    state = {}

    constructor() {
        super();
        this.state = {
            "email": "",
            "password": "",
            "error": ""
        }

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.loginStorage = JSON.parse(localStorage.getItem('login'));
        this.loginAdminStorage = JSON.parse(localStorage.getItem('login-admin'));
        if (this.loginStorage != null || this.loginAdminStorage != null)
            window.location.href = "/";
    }

    login(e) {
        e.preventDefault();
        let raw = JSON.stringify({
            "password": this.state.password,
            "email": this.state.email,
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('login', JSON.stringify(data));
                window.location.href = "/room";
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('No data found, please check your email and password.');
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ "error": "" });
    }

    render() {
        return (
            <div className="bg-div">
                <div id="form-margin">
                    <div className="header-topic">
                        <span>LOGIN</span>
                        <hr />
                    </div>
                    <form onSubmit={this.login}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="email" className="control-label">Email *</label>
                                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" placeholder="Your Email *" required />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="password" className="control-label">Password *</label>
                                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" placeholder="Your Password *" required />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group" style={{ 'textAlign': 'center' }}>
                                <span style={{ 'color': 'red' }}>{this.state.error}</span>
                                <br />
                                <button type="submit" className="btn btn-primary">Login</button>
                                <br />
                            </div>
                        </div>

                        <div className="row">
                            <span>New User? <a href="/register">Sign up</a></span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginComponent