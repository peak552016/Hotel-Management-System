import { Component } from "react"
import moment from 'moment';

class DiscountAddComponent extends Component {
    state = {}
    constructor() {
        super();
        this.state = {
            dcCode: '',
            dcRate: '',
            startDate: moment(new Date()).format('YYYY-MM-DD'),
            endDate: '',
            min : moment(new Date()).format('YYYY-MM-DD')
        };
        this.add = this.add.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
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
    
    handleChangeDate(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ 'endDate': value });
        this.setState({ "error": "" });
    }

    add(e) {
        e.preventDefault();
        let raw = JSON.stringify({
            dcCode: this.state.dcCode,
            dcRate: this.state.dcRate,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/discount/add', requestOptions)
            .then(response => response)
            .then(data => {
                alert('Successfully insert discount code');
                window.location.href = "/discount";
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('Error while inserting data');
            });
    }

    render() {
        return (
            <div className="bg-div" style={{ 'paddingLeft': '10%', 'paddingRight': '10%' }}>
                <div className="header-topic">
                    <span className="header-reserve">ADD DISCOUNT</span>
                    <hr />
                </div>
                <br />
                <div>
                    <form onSubmit={this.add}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="dcCode" className="control-label">DISCOUNT CODE *</label>
                                    <input type="text" name="dcCode" value={this.state.dcCode} onChange={this.handleChange} className="form-control" placeholder="DISCOUNT CODE *" required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="dcRate" className="control-label">DISCOUNT RATE *</label>
                                    <input type="number" min="1" name="dcRate" value={this.state.dcRate} onChange={this.handleChange} className="form-control" placeholder="DISCOUNT RATE *" required />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="startDate" className="control-label">START DATE</label>
                                    <input type="date" name="startDate" min={this.state.min} value={this.state.startDate} onChange={this.handleChangeDate} className="form-control" required/>
                                </div>
                            </div><div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="endDate" className="control-label">END DATE</label>
                                    <input type="date" name="endDate" min={this.state.startDate} value={this.state.endDate} onChange={this.handleChange} className="form-control" required/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group" style={{ 'textAlign': 'center' }}>
                                <span style={{ 'color': 'red' }}>{this.state.error}</span>
                                <br />
                                <button type="submit" className="btn btn-primary">ADD</button>
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

export default DiscountAddComponent