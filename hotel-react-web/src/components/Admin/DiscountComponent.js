import { Component } from "react"
import moment from 'moment';

class DiscountComponent extends Component {
    state = {}
    constructor() {
        super();
        this.state = {
            discount: []
        };
    }

    componentDidMount() {
        this.loginAdminStorage = JSON.parse(localStorage.getItem('login-admin'));
        if (this.loginAdminStorage == null || this.loginAdminStorage.pName !== 'Manager')
            window.location.href = "/";

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:3001/discount-info', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'discount': data }, function () {
                    console.log(this.state.discount)
                });
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
                    <span className="header-reserve">DISCOUNT</span>
                    <hr />
                    <div className="row">
                        <div className="col-12" style={{ 'textAlign': 'right' }}><a href="/discount-add"><button className="btn btn-success">ADD DISCOUNT</button></a></div>
                    </div>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">DISCOUNT CODE</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>DISCOUNT RATE</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>DATE START</th>
                                <th scope="col" style={{ 'textAlign': 'center' }}>DATE END</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.discount.map((item, index) => (
                                <tr key={index} style={{ 'verticalAlign': 'middle' }}>
                                    <td>{item.dcCode}</td>
                                    <td style={{ 'textAlign': 'center' }}>{item.dcRate} %</td>
                                    <td style={{ 'textAlign': 'center' }}>{moment(item.startDate).format('DD-MM-YYYY')}</td>
                                    <td style={{ 'textAlign': 'center' }}>{moment(item.endDate).format('DD-MM-YYYY')}</td>
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

export default DiscountComponent