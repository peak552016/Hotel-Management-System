import { Component } from "react"
import { Buffer } from 'buffer';

class ReserveRoomComponent extends Component {
    state = {}
    constructor() {
        super();
        const queryParams = new URLSearchParams(window.location.search);
        const roomType = queryParams.get("roomType") != null ? queryParams.get("roomType") : '';
        const checkin = queryParams.get("checkin") != null ? queryParams.get("checkin") : '';
        const checkout = queryParams.get("checkout") != null ? queryParams.get("checkout") : '';
        this.state = {
            "room": '',
            "user": {},
            "roomType": roomType,
            "checkin": checkin,
            "checkout": checkout,
            "dcCode": '',
            "saveDcCode": '',
            "dcCodePrice": 0,
            "dcRate": 0,
            "point": 0,
            "dcPoint": 0,
            "saveDcPoint": 0,
            "dcPointPrice": 0,
            "sumPrice": 0,
            "date" : 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.getdiscount = this.getdiscount.bind(this);
        this.usepoint = this.usepoint.bind(this);
        this.reserveroom = this.reserveroom.bind(this);
    }

    componentDidMount() {
        this.loginStorage = JSON.parse(localStorage.getItem('login'));
        this.setState({ 'userId': <span className="bg-text-user">User ID : {this.showUserId(this.loginStorage.ctUserId)}</span> });
        this.setState({ 'memberType': <span className="bg-text-user">Member Type : {this.loginStorage.mbTypeName}</span> })
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        var from = new Date(this.state.checkin);
        var to = new Date(this.state.checkout); 
        let date = 0;
        for (var day = from; day <= to; day.setDate(day.getDate() + 1)) {
            date++;
        }
        this.setState({ 'date': date });

        fetch('http://localhost:3001/reserve-room?checkin=' + this.state.checkin + '&checkout=' + this.state.checkout + '&type=' + this.state.roomType, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'room': data });
                this.setState({ 'sumPrice': data.price*date });
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('An error occurred while inserting data');
            });

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
    }

    showUserId(id) {
        let user = "CT";
        for (let index = 0; index < 5 - id.toString().length; index++) {
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

    readImage(img) {
        var buffer = new Buffer(img, 'base64');
        return buffer;
    }

    getdiscount(e) {
        e.preventDefault();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:3001/discount?dcCode=' + this.state.dcCode, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'dcRate': data.dcRate });
                this.setState({ 'saveDcCode': this.state.dcCode })
                this.setState({ 'dcCodePrice' : this.state.sumPrice*data.dcRate/100 });
            })
            .catch(error => {
                this.setState({ 'dcRate': 0 });
                this.setState({ 'saveDcCode': '' })
                this.setState({ 'dcCodePrice' : 0 });
            });
    }

    usepoint(e) {
        e.preventDefault();
        this.setState({  "saveDcPoint": this.state.dcPoint,
        "dcPointPrice": this.state.dcPoint/10 });
    }

    reserveroom(e) {
        e.preventDefault();
        this.loginStorage = JSON.parse(localStorage.getItem('login'));
        let raw = JSON.stringify({
            "checkin" : this.state.checkin,
            "checkout" : this.state.checkout,
            "userid" : this.loginStorage.ctUserId,
            "numPeople" : this.state.room.capacity,
            "pointDiscount" : this.state.saveDcPoint,
            "totalPrice" : this.state.sumPrice - this.state.dcCodePrice - this.state.dcPointPrice,
            "dcCode" : this.state.saveDcCode !== '' ? this.state.saveDcCode : 'NONE',
            "roomType" : this.state.room.roomTypeID
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/reserve', requestOptions)
            .then(response => response)
            .then(data => {
                alert('Successful booking');
                window.location.href = "/history";
            })
            .catch(error => {
                alert('Some information is incorrect. Please try again.');
                window.location.href = "/reserve";
            });
    }

    render() {
        return (
            <div className="bg-div" style={{ 'paddingLeft': '10%', 'paddingRight': '10%' }}>
                <div className="header-topic">
                    <span className="header-reserve">RESERVE {this.state.room.roomTypeName}</span>
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
                {this.state.room !== '' ? <div className="row">
                    <div className="col-xl-6 col-lg-12">
                        <img src={this.readImage(this.state.room.image)} alt="room" style={{ 'width': '100%' }} />
                    </div>
                    <div className="col-xl-6 col-lg-12">
                        <span className="bg-text-reserve">{this.state.room.description}</span>
                        <span className="bg-text-reserve">Maximum Capacity: {this.state.room.capacity} People</span>
                        <span className="bg-text-reserve">Room Available: {this.state.room.freeRoom} Room</span>
                        <span className="bg-text-reserve">Room Price: {this.state.room.price.toLocaleString()} Baht</span>
                        <span className="bg-text-reserve">Promotion:
                            <form onSubmit={this.getdiscount}>
                                <input type="text" className="form-control" style={{ 'width': '40%', 'display': 'inline' }} value={this.state.dcCode} onChange={this.handleChange} name="dcCode" />
                                <button className="btn form-control dc-btn">GET DISCOUNT</button>
                            </form>
                        </span>
                        <span className="bg-text-reserve">Use point for disocunt:  10 points = 1 Baht
                            <form onSubmit={this.usepoint}>
                                <input type="number" className="form-control" min="0" max={this.state.point} style={{ 'width': '40%', 'display': 'inline' }} value={this.state.dcPoint} onChange={this.handleChange} name="dcPoint" />
                                <button className="btn form-control dc-btn">USE POINT</button>
                            </form>
                        </span>
                    </div>
                </div> : ''}

                <hr />
                <br />
                <span className="header-reserve" style={{ 'fontSize': '30px' }}>SUMMARY</span>
                <span className="bg-text-summary">
                    <div className="row">
                        <div className="col-6 bg-text-summary-left">Check-in time : {this.state.checkin}, Check-out time: {this.state.checkout}</div>
                        <div className="col-6 bg-text-summary-right">Total Days {this.state.date} Days</div>
                    </div>
                </span>
                <span className="bg-text-summary">
                    <div className="row">
                        <div className="col-6 bg-text-summary-left">Room Price: </div>
                        <div className="col-6 bg-text-summary-right">{this.state.sumPrice} Baht</div>
                    </div>
                </span>
                <span className="bg-text-summary">
                    <div className="row">
                        <div className="col-6 bg-text-summary-left">Discount Code: {this.state.saveDcCode}</div>
                        <div className="col-6 bg-text-summary-right">{this.state.dcCodePrice} Baht</div>
                    </div>
                </span>
                <span className="bg-text-summary">
                    <div className="row">
                        <div className="col-6 bg-text-summary-left">Use Point: {this.state.saveDcPoint} Points Discount: </div>
                        <div className="col-6 bg-text-summary-right">{this.state.dcPointPrice} Baht</div>
                    </div>
                </span>
                <span className="bg-text-summary-final">
                    <div className="row">
                        <div className="col-6 bg-text-summary-left">Total</div>
                        <div className="col-6 bg-text-summary-right">{this.state.sumPrice - this.state.dcCodePrice - this.state.dcPointPrice} Baht</div>
                    </div>
                </span>
                <button className="btn form-control dc-btn-summary" onClick={this.reserveroom}>RESERVE</button>
                <br />
                <br />
                <br />
            </div>
        )
    }
}

export default ReserveRoomComponent