import { Component } from "react"
import moment from 'moment';
import { Buffer } from 'buffer';

class PaymentUpdateComponent extends Component {
    state = {}
    constructor() {
        super();
        const queryParams = new URLSearchParams(window.location.search);
        const bookingid = queryParams.get("bookingid") != null ? queryParams.get("bookingid") : '';
        this.state = {
            book: {},
            bookingid: bookingid,
            bookingidtxt: this.showBookingId(bookingid),
            status: 'FULLY PAID',
            method: 'CASH',
            date: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.loginAdminStorage = JSON.parse(localStorage.getItem('login-admin'));
        if (this.loginAdminStorage == null)
            window.location.href = "/";

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:3001/payment-info?bookingid=' + this.state.bookingid, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'book': data });
                this.setState({ 'image': this.readImage(data.image) },
                    function () {
                        console.log(this.state)
                    });
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('Error while inserting data');
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

    readImage(img) {
        console.log(img)
        var buffer = new Buffer(img, 'base64');
        return buffer;
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ "error": "" });
    }

    update(e) {
        e.preventDefault();
        let login = JSON.parse(localStorage.getItem('login-admin'));
        let amount = 0;
        if (this.state.book.status === 'NOT PAID') {
            if (this.state.status === 'DEPOSIT PAID') {
                amount = this.state.book.deposit;
            } else {
                amount = this.state.book.price;
            }
        } else if (this.state.book.status === 'DEPOSIT PAID') {
            amount = this.state.book.price - this.state.book.deposit;
        }

        let raw = JSON.stringify({
            "bookingid": this.state.bookingid,
            "method": this.state.method,
            "amount": amount,
            "date": this.state.date,
            "staffid": login.StaffID,
            "status": this.state.status,
            "userid": this.state.book.ctUserID
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/payment', requestOptions)
            .then(response => response)
            .then(data => {
                alert('Update information successfully');
                window.location.href = "/payment";
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
                    <span className="header-reserve">PAYMENT</span>
                    <hr />
                </div>
                <div className="row">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <span className="bg-text-info-2">BOOKING ID : {this.state.bookingidtxt}</span>
                            </div>
                            <div className="row">
                                <span className="bg-text-info">Check-in : {moment(this.state.book.checkin).format('DD-MM-YYYY')} </span>
                                <span className="bg-text-info" style={{ 'backgroundColor': 'transparent' }}>to </span>
                                <span className="bg-text-info"> Check-out : {moment(this.state.book.checkout).format('DD-MM-YYYY')}</span>
                            </div>
                            <br />
                            {this.state.book !== '' || this.state.book != null ? <div className="row">
                                <div className="col-xl-6 col-lg-12">
                                    <img src={this.state.image} alt="room" style={{ 'width': '100%' }} />
                                </div>
                                <div className="col-xl-6 col-lg-12">
                                    <span className="bg-text-summary" style={{ 'marginTop': '0px' }}>
                                        <div className="row">
                                            <div className="col-6 bg-text-summary-left">Room Price: </div>
                                            <div className="col-6 bg-text-summary-right">{this.state.book.price} Baht</div>
                                        </div>
                                    </span>
                                    <span className="bg-text-summary">
                                        <div className="row">
                                            <div className="col-6 bg-text-summary-left">Deposite: </div>
                                            <div className="col-6 bg-text-summary-right">{this.state.book.deposit} Baht</div>
                                        </div>
                                    </span>
                                    <span className="bg-text-summary">
                                        <div className="row">
                                            <div className="col-6 bg-text-summary-left">Status: </div>
                                            <div className="col-6 bg-text-summary-right">{this.state.book.status}</div>
                                        </div>
                                    </span>
                                    <br />
                                    <form onSubmit={this.update}>
                                        <span>PAYMENT METHOD : </span>
                                        <select className="form-select" name="method" value={this.state.method} onChange={this.handleChange} >
                                            <option value="CASH">CASH</option>
                                            <option value="CREDIT CARD">CREDIT CARD</option>
                                            <option value="BANK TRANSFER">BANK TRANSFER</option>
                                        </select>
                                        <span>PAYMENT STATUS : </span>
                                        <select className="form-select" name="status" value={this.state.status} onChange={this.handleChange} >
                                            <option disabled value={this.state.book.status}>{this.state.book.status}</option>
                                            {this.state.book.status === 'DEPOSIT PAID' ? '' : <option value="DEPOSIT PAID">DEPOSIT PAID</option>}
                                            <option value="FULLY PAID">FULLY PAID</option>
                                        </select>
                                        <span>PAYMENT DATE : </span>
                                        <input type="datetime-local" className="form-control" name="date" value={this.state.date} onChange={this.handleChange} required />
                                        <button type="submit" style={{ 'marginTop': '10px' }} className="btn btn-success form-control">UPDATE</button>
                                    </form>
                                </div>
                            </div> : ''}
                        </div>
                    </div>
                </div>
                <br />
            </div>
        )
    }
}

export default PaymentUpdateComponent