import { Component } from "react"
import { Buffer } from 'buffer';
import moment from 'moment';

class ReserveComponent extends Component {
    state = {}
    constructor() {
        super();
        this.state = {
            "room": [],
            "checkin": moment(new Date()).format('YYYY-MM-DD'),
            "checkout": '',
            "saveCheckin": '',
            "saveCheckout": '',
            "userId": '',
            "memberType": '',
            "min" : moment(new Date()).format('YYYY-MM-DD')
        }
        console.log(this.state.min)
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        this.loginStorage = JSON.parse(localStorage.getItem('login'));
        this.setState({ 'userId': <span className="bg-text-user">User ID : {this.showUserId(this.loginStorage.ctUserId)}</span> });
        this.setState({ 'memberType': <span className="bg-text-user">Member Type : {this.loginStorage.mbTypeName}</span> })
    }

    showUserId(id) {
        let user = "CT";
        for (let index = 0; index < 5 - id.toString().length; index++) {
            user += "0";
        }
        user += id;
        return user;
    }

    search(e) {
        e.preventDefault();
        this.setState({ 'saveCheckin': this.state.checkin });
        this.setState({ 'saveCheckout': this.state.checkout });

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:3001/reserve?checkin=' + this.state.checkin + '&checkout=' + this.state.checkout, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'room': data });
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('An error occurred while inserting data');
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ "error": "" });
    }
    
    handleChangeDate(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ 'checkout': value });
        this.setState({ "error": "" });
    }


    readImage(img) {
        var buffer = new Buffer(img, 'base64');
        return buffer;
    }

    render() {
        return (
            <div className="bg-div" style={{ 'paddingLeft': '10%', 'paddingRight': '10%' }}>
                <div className="header-topic">
                    <span>RESERVE</span>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-12">
                        {this.state.userId}
                        {this.state.memberType}
                    </div>
                </div>
                <br />
                <div>
                    <form onSubmit={this.search}>
                        <div className="row">
                            <div className="col-6">
                                <span>Check-in</span>
                                <input type="date" name="checkin" min={this.state.min} max="2025-12-31" value={this.state.checkin} onChange={this.handleChangeDate} className="form-control" required />
                            </div>
                            <div className="col-6">
                                <span>Check-out</span>
                                <input type="date" name="checkout" min={this.state.checkin} max="2025-12-31" value={this.state.checkout} onChange={this.handleChange} className="form-control" required />
                            </div>
                        </div>
                        <div className="row" style={{ 'marginTop': '20px' }}>
                            <div style={{ 'width': '100%', 'textAlign': 'center' }}>
                                <button type="submit" className="btn btn-primary" style={{ 'width': '100%' }}>Search</button>
                            </div>
                        </div>
                    </form>
                    <div className="row" style={{'marginTop' : '30px'}}>
                        {this.state.room.map((room, index) => (
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12" key={index} style={{ 'marginBottom': '20px' }}>
                                <div className="card card-reserve">
                                    <div className="card-header card-header-reserve">
                                        <h4>{room.roomTypeName}</h4>
                                    </div>
                                    <div className="card-body">
                                        <img src={this.readImage(room.image)} alt="room" style={{ 'width': '100%' }} /><br />
                                        <span className="bg-text-reserve">{room.description}</span>
                                        <span className="bg-text-reserve">Maximum capacity: {room.capacity} People</span>
                                        <span className="bg-text-reserve">Room Available: {room.freeRoom} Room</span><br />
                                        <span className="bg-text-reserve">Room Price: {room.price.toLocaleString()} Baht</span><br />
                                        {room.freeRoom > 0 ? <a href={ "/reserve-room?roomType=" + room.roomTypeID + "&checkin=" + this.state.saveCheckin + "&checkout=" + this.state.checkout }><button className="btn btn-primary" style={{ 'width': '100%' }}>Reserve this room</button></a>: ''}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <br />
                <br />
                <br />
            </div>
        )
    }
}

export default ReserveComponent