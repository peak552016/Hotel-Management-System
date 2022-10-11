import { Component } from "react";

class LogoutComponent extends Component {
    
    componentDidMount() {
        localStorage.clear();
        window.location.href = "/";
    }

    render() {
        return (
            <span></span>
        )
    }
}

export default LogoutComponent