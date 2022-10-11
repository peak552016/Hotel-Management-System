import { Component } from "react"
import bg from '../asset/image/main.jpg';
import RoomComponent from "./RoomComponent";

class HotelComponent extends Component {
    state = {}

    render() {
        return (
            <div className="bg-div">
                <img src={bg} style={{'width':'100%'}} alt='background'/>
                <h1 className="centered"><i>Welcome to VENESSA Hotel</i></h1>
                <RoomComponent/>
            </div>
        )
    }
}

export default HotelComponent