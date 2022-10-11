import { Component } from "react"
import { Buffer } from 'buffer';

class RoomAdminComponent extends Component {
    state = {}
    constructor() {
        super();
        this.state = {
            room: []
        };
    }

    componentDidMount() {
        this.loginAdminStorage = JSON.parse(localStorage.getItem('login-admin'));
        if (this.loginAdminStorage == null)
            window.location.href = "/";

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:3001/room-admin', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'room': data }, function () {
                    console.log(this.state.room)
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('Error while inserting data');
            });
    }

    readImage(img) {
        console.log(img)
        var buffer = new Buffer(img, 'base64');
        return buffer;
    }

    clean(roomid) {
        if (window.confirm("clean room id : " + roomid)) {
            let raw = JSON.stringify({
                "room": roomid
            });
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: raw
            };
            fetch('http://localhost:3001/room/clean', requestOptions)
                .then(response => response)
                .then(data => {
                    alert('Update information successfully');
                    window.location.href = "/room-admin";
                })
                .catch(error => {
                    console.log(error)
                    alert('Some information is incorrect. Please try again');
                });
        }
    }

    render() {
        return (
            <div className="bg-div" style={{ 'paddingLeft': '2%', 'paddingRight': '2%' }}>
                <div className="header-topic">
                    <span className="header-reserve">ROOM</span>
                    <hr />
                </div>
                <br />
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Room ID</th>
                                <th scope="col">Room Name</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Status</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Floor</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Clean Status</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Capacity</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Price</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Image</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Description</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.room.map((room, index) => (
                                <tr key={index} style={{ 'verticalAlign': 'middle' }}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{room.RoomID}</td>
                                    <td>{room.RoomTypeName}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.rStatus}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.rfloor}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.rCleaningState === 'Y' ? 'Cleaned' : <button onClick={e => this.clean(room.RoomID)} className="btn btn-success">Not Clean</button>}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.rCapacity}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.rDefaultPrice}</td>
                                    <td style={{ 'textAlign': 'center' }}><img src={this.readImage(room.rImage)} alt="room" style={{ 'width': '100px' }} /></td>
                                    <td style={{ 'textAlign': 'center' }}>{room.rDescription}</td>
                                    <td style={{ 'textAlign': 'center' }}>{room.rRating}</td>
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

export default RoomAdminComponent