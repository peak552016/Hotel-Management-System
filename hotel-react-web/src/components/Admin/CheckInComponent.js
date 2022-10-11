import { Component } from "react"
import moment from 'moment';
import { Buffer } from 'buffer';

class CheckInComponent extends Component {
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
            bookingidtxt: this.showBookingId(bookingid),
            ctNum: 1,
            name: '',
            room: '',
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
        fetch('http://localhost:3001/check-info?bookingid=' + this.state.bookingid, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'book': data });
                this.setState({ 'room': data.roomId[0] });
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

        let raw = JSON.stringify({
            "bookingid": this.state.bookingid,
            "cInpeople": this.state.ctNum,
            "cName": this.state.name,
            "staffid": login.StaffID,
            "room" : this.state.room
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


    render() {
        return (
            <div className="bg-div" style={{ 'paddingLeft': '10%', 'paddingRight': '10%' }}>
                <div className="header-topic">
                    <span className="header-reserve">CHECK-IN</span>
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
                                    <form onSubmit={this.update}>
                                        <span>NAME CUSTOMER : </span>
                                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange} required />
                                        <span>NUMBER OF CUSTOMER : </span>
                                        <input type="number" min="1" className="form-control" name="ctNum" value={this.state.ctNum} onChange={this.handleChange} required />
                                        <span>ROOM ID : </span>
                                        <select className="form-select" name="room" value={this.state.room} onChange={this.handleChange} >
                                            {this.state.book.roomId.map((room, index) => (
                                                <option value={room} key={index}>{room}</option>
                                            ))}
                                        </select>
                                        <br />
                                        <button type="submit" style={{ 'marginTop': '10px' }} className="btn btn-success form-control">CHECK-IN</button>
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

export default CheckInComponent