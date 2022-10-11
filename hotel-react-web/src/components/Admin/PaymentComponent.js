import { Component } from "react"
import moment from 'moment';

class PaymentComponent extends Component {
    state = {}
    constructor() {
        super();
        this.state = {
            book: [],
            search: ''
        };
        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.loginAdminStorage = JSON.parse(localStorage.getItem('login-admin'));
        if (this.loginAdminStorage == null)
            window.location.href = "/";

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:3001/payment', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'book': data });
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

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ "error": "" });
    }

    search() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        let condition = '';
        if(this.state.search !== null && this.state.search !== '') {
            condition = '?search=' + this.state.search;
        }
        fetch('http://localhost:3001/payment' + condition, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'book': data });
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
                    <span className="header-reserve">BOOKING INFO</span>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-12">
                        <input type="text" style={{'width' : '400px', 'display' : 'inline-block'}} className="form-control" name="search" value={this.state.search} onChange={this.handleChange} placeholder="Search by id, name, price, check-in date"/>
                        <button style={{'marginLeft' : '10px', 'marginBottom' : '4px'}} className="btn btn-primary" onClick={this.search}>Search</button>
                    </div>
                </div>
                <br />
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Customer ID</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Booking ID</th>
                                <th scope="col">Room Type</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>B-Check-in</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>B-Check-out</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Discount Code</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Point Use</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Total Price</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Get Point</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Check-in</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Check-out</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Status</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>PAID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.book.map((room, index) => (
                                <tr key={index} style={{ 'verticalAlign': 'middle' }}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{this.showUserId(room.ctUserID)}</td>
                                    <td>{room.ctFullname}</td>
                                    <td>{this.showBookingId(room.BookingID)}</td>
                                    <td>{room.RoomTypeName}</td>
                                    <td style={{ 'textAlign': 'center' }}>{moment(room.checkin).format('DD-MM-YYYY')}</td>
                                    <td style={{ 'textAlign': 'center' }}>{moment(room.checkout).format('DD-MM-YYYY')}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.dcCode}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.point}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.price}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.getPoint}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.cIntime !== null ? moment(room.cIntime).format('DD-MM-YYYY HH:mm') : '-'}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.cOuttime !== null ? moment(room.cOuttime).format('DD-MM-YYYY HH:mm') : '-'}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.status}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.status === 'NOT PAID' || room.status === 'DEPOSIT PAID' ? <a href={"/payment/booking?bookingid=" + room.BookingID}><button className="btn btn-success">UPDATE</button></a> : '-'}</td>
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

export default PaymentComponent