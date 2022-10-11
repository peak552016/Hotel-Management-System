import { Component } from "react"
import moment from 'moment';

class HistoryComponent extends Component {
    state = {}
    constructor() {
        super();
        this.state = {
            room: []
        };
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

        fetch('http://localhost:3001/history?userid=' + this.loginStorage.ctUserId, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'room': data });
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

    render() {
        return (
            <div className="bg-div" style={{ 'paddingLeft': '10%', 'paddingRight': '10%' }}>
                <div className="header-topic">
                    <span className="header-reserve">HISTORY</span>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-12">
                        {this.state.userId}
                        {this.state.memberType}
                        {this.state.memberPoint}
                    </div>
                </div>
                <br />
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Booking ID</th>
                                <th scope="col">Room Type</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Check-in</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Check-out</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Discount Code</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Point Use</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Total Price</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Get Point</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Reason</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Status</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Cancel/Review</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.room.map((room, index) => (
                                <tr key={index} style={{ 'verticalAlign': 'middle' }}>
                                    <th scope="row">{index+1}</th>
                                    <td>{this.showBookingId(room.BookingID)}</td>
                                    <td>{room.RoomTypeName}</td>
                                    <td style={{ 'textAlign': 'center' }}>{moment(room.checkin).format('DD-MM-YYYY')}</td>
                                    <td style={{ 'textAlign': 'center' }}>{moment(room.checkout).format('DD-MM-YYYY')}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.dcCode}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.point}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.price}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.getPoint}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.reason === null ? '-' : room.reason}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.status}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.reviewOpen === 'N' && room.status === 'NOT PAID' ?
                                        <a href={"/cancel-room?bookingid=" + room.BookingID}><button className="btn btn-danger">Cancel</button></a> :
                                        room.reviewOpen === 'Y' ? <a href={"/review-room?bookingid=" + room.BookingID}><button className="btn btn-success">Review</button></a> : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br />
            </div>
        )
    }
}

export default HistoryComponent