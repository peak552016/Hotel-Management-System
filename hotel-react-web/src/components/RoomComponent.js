import { Component } from "react"
import { Buffer } from 'buffer';

class RoomComponent extends Component {
    state = {}
    constructor() {
        super();
        this.state = {
            "room": []
        }
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:3001/room', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'room': data });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    readImage(img) {
        var buffer = new Buffer(img, 'base64');
        return buffer;
      }

    render() {
        return (
            <div className="bg-div" style={{ 'paddingLeft': '10%', 'paddingRight': '10%' }}>
                <div className="header-topic">
                    <span>ROOM</span>
                    <hr />
                </div>
                <div>
                    <div className="row">
                        {this.state.room.map((room, index) => (
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12" key={index} style={{'marginBottom' : '20px'}}>
                                <div className="card">
                                    <div className="card-header">
                                        <h4>{room.roomTypeName}</h4>
                                    </div>
                                    <div className="card-body">
                                        <img src={this.readImage(room.image)} alt="room" style={{'width': '100%'}}/><br />
                                        <span>{room.description}</span><br />
                                        <span>Maximum Capacity:{room.capacity} People</span><br /><br />
                                        <span>Room Price: {room.price.toLocaleString()} Baht</span><br />
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

export default RoomComponent