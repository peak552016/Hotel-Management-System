import { Component } from "react"
import moment from 'moment';

class CancelComponent extends Component {
    state = {}
    constructor() {
        super();
        const queryParams = new URLSearchParams(window.location.search);
        const bookingid = queryParams.get("bookingid") != null ? queryParams.get("bookingid") : '';
        this.state = {
            room: {},
            bookingid: bookingid,
            reason: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        this.loginStorage = JSON.parse(localStorage.getItem('login'));
        this.setState({ 'userId': <span className="bg-text-user">User ID : {this.showUserId(this.loginStorage.ctUserId)}</span> });
        this.setState({ 'memberType': <span className="bg-text-user">Member Type : {this.loginStorage.mbTypeName}</span> })
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:3001/user-point?userid=' + this.loginStorage.ctUserId, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'point': data.ctPoint });
                this.setState({ 'memberPoint': <span className="bg-text-user">Member Point : {data.ctPoint}</span> })
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('An error occurred while inserting data');
            });

        fetch('http://localhost:3001/room-booking?userid=' + this.loginStorage.ctUserId + "&bookingid=" + this.state.bookingid, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'room': data });
                this.setState({ 'bookingid': this.showBookingId(data.BookingID) });
                console.log(data)
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

    cancel(e) {
        e.preventDefault();
        let loginStorage = JSON.parse(localStorage.getItem('login'));

        let raw = JSON.stringify({
            "userid": loginStorage.ctUserId,
            "bookingid" : this.state.room.BookingID,
            "reason" : this.state.reason
        });

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/cancel-room', requestOptions)
            .then(response => response)
            .then(data => {
                alert('Successful room cancellation');
                window.location.href = "/history";
            })
            .catch(error => {
                console.log(error)
                alert('Some information is wrong, please try again.');
            });
    }

    render() {
        return (
            <div className="bg-div" style={{ 'paddingLeft': '10%', 'paddingRight': '10%' }}>
                <div className="header-topic">
                    <span className="header-reserve">CANCEL BOOKING ORDER</span>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-12">
                        <span className="bg-text-user">Booking ID : {this.state.bookingid}</span>
                    </div>
                    <div className="col-lg-8 col-md-12" style={{ 'textAlign': 'right' }}>
                        {this.state.userId}
                        {this.state.memberType}
                        {this.state.memberPoint}
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-7 col-md-12">
                        <div className="card" style={{ 'padding': '10px' }}>
                            <br />
                            <div className="row">
                                <span className="bg-text-info">Check-in : {moment(this.state.room.checkin).format('DD-MM-YYYY')} </span>
                                <span className="bg-text-info" style={{ 'backgroundColor': 'transparent' }}>to </span>
                                <span className="bg-text-info"> Check-out : {moment(this.state.room.checkout).format('DD-MM-YYYY')}</span>
                            </div>
                            <br />
                            <span className="header-reserve" style={{ 'fontSize': '20px' }}>{this.state.room.RoomTypeName}</span>
                            <span className="bg-text-summary">
                                <div className="row">
                                    <div className="col-6 bg-text-summary-left">Room Price: </div>
                                    <div className="col-6 bg-text-summary-right">{this.state.room.price} Baht</div>
                                </div>
                            </span>
                            <span className="bg-text-summary">
                                <div className="row">
                                    <div className="col-6 bg-text-summary-left">Discount Code: </div>
                                    <div className="col-6 bg-text-summary-right">{this.state.room.dcCode != null ? this.state.room.dcCode : '-'}</div>
                                </div>
                            </span>
                            <span className="bg-text-summary">
                                <div className="row">
                                    <div className="col-6 bg-text-summary-left">Use Points: </div>
                                    <div className="col-6 bg-text-summary-right">{this.state.room.point != null ? this.state.room.point : 0} Points</div>
                                </div>
                            </span>
                            <br />
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className="card" style={{ 'padding': '10px' }}>
                            <br />
                            <div className="row">
                                <span className="bg-text-info">Reason for cancellation</span>
                            </div>
                            <br />
                            <div className="row">
                                <form onSubmit={this.cancel}>
                                    <div className="form-group">
                                        <textarea className="form-control" name="reason" value={this.state.reason} onChange={this.handleChange} rows="5" required></textarea>
                                    </div>
                                    <button type="submit" className="form-control btn btn-danger" style={{'marginBottom' : '20px'}}>CONFIRM CANCEL</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div>

                </div>
                <br />
            </div>
        )
    }
}

export default CancelComponent