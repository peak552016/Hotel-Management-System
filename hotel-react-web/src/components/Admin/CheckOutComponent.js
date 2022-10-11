import { Component } from "react"
import moment from 'moment';
import { Buffer } from 'buffer';

class CheckOutComponent extends Component {
    state = {}
    constructor() {
        super();
        const queryParams = new URLSearchParams(window.location.search);
        const bookingid = queryParams.get("bookingid") != null ? queryParams.get("bookingid") : '';
        this.state = {
            book: {
                roomId: []
            },
            bookingid: bookingid,
            bookingidtxt: this.showBookingId(bookingid)
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
        fetch('http://localhost:3001/check-info-out?bookingid=' + this.state.bookingid, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'book': data });
                this.setState({ 'room': data.roomId });
                this.setState({ 'image': this.readImage(data.rImage) },
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

        let raw = JSON.stringify({
            "bookingid": this.state.bookingid,
            "cInpeople": this.state.ctNum,
            "cName": this.state.name,
            "staffid": login.StaffID,
            "room": this.state.room
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/check-in', requestOptions)
            .then(response => response)
            .then(data => {
                alert('Update information successfully');
                window.location.href = "/check";
            })
            .catch(error => {
                console.log(error)
                alert('Some information is incorrect. Please try again');
            });
    }

    
    checkout(id, roomid) {
        if (window.confirm("check-out booking id : " + this.showBookingId(id))) {
            let raw = JSON.stringify({
                "room": roomid,
                "bookingid": id
            });
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: raw
            };
            fetch('http://localhost:3001/check-out', requestOptions)
                .then(response => response)
                .then(data => {
                    alert('Update information successfully');
                    window.location.href = "/check";
                })
                .catch(error => {
                    console.log(error)
                    alert('Some information is incorrect. Please try again');
                });
        }
    }

    render() {
        return (
            <div className="bg-div" style={{ 'paddingLeft': '10%', 'paddingRight': '10%' }}>
                <div className="header-topic">
                    <span className="header-reserve">CHECK-OUT</span>
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
                                    <span className="bg-text-summary">
                                        <div className="row">
                                            <div className="col-6 bg-text-summary-left">Room ID</div>
                                            <div className="col-6 bg-text-summary-right">{this.state.book.RoomID}</div>
                                        </div>
                                    </span>
                                    <span className="bg-text-summary">
                                        <div className="row">
                                            <div className="col-6 bg-text-summary-left">Check-in Time</div>
                                            <div className="col-6 bg-text-summary-right">{moment(this.state.book.cIntime).format('DD-MM-YYYY HH:mm')}</div>
                                        </div>
                                    </span>
                                    <span className="bg-text-summary">
                                        <div className="row">
                                            <div className="col-6 bg-text-summary-left">Customer Check-in Name</div>
                                            <div className="col-6 bg-text-summary-right">{this.state.book.cName}</div>
                                        </div>
                                    </span>
                                    <span className="bg-text-summary">
                                        <div className="row">
                                            <div className="col-6 bg-text-summary-left">Payment Method</div>
                                            <div className="col-6 bg-text-summary-right">{this.state.book.paymentMethod}</div>
                                        </div>
                                    </span>
                                    <span className="bg-text-summary">
                                        <div className="row">
                                            <div className="col-6 bg-text-summary-left">Payment Date</div>
                                            <div className="col-6 bg-text-summary-right">{moment(this.state.book.paymentDate).format('DD-MM-YYYY HH:mm')}</div>
                                        </div>
                                    </span>
                                    <br/>
                                    <button style={{ 'marginTop': '10px' }} onClick={e => this.checkout(this.state.bookingid, this.state.book.RoomID)} className="btn btn-success form-control">CHECK-OUT</button>
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

export default CheckOutComponent