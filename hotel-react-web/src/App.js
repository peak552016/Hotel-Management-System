import './App.css';
import HotelComponent from './components/HotelComponent';
import logo from './asset/image/logo.png'

import React, { Component } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RoomComponent from './components/RoomComponent';
import RegisComponent from './components/RegisComponent';
import LoginComponent from './components/LoginComponent';
import LogoutComponent from './components/LogoutComponent';
import ReserveComponent from './components/ReserveComponent';
import ReserveRoomComponent from './components/ReserveRoomComponent';
import HistoryComponent from './components/HistoryComponent';
import CancelComponent from './components/CancelComponent';
import ProfileComponent from './components/ProfileComponent';
import AdminLoginComponent from './components/Admin/AdminLoginComponent';
import AdminComponent from './components/Admin/AdminComponent';
import PaymentComponent from './components/Admin/PaymentComponent';
import PaymentUpdateComponent from './components/Admin/PaymentUpdateComponent';
import CheckComponent from './components/Admin/CheckComponent';
import CheckInComponent from './components/Admin/CheckInComponent';
import RoomAdminComponent from './components/Admin/RoomAdminComponent';
import CheckOutComponent from './components/Admin/CheckOutComponent';
import CustomerComponent from './components/Admin/CustomerComponent';
import ReviewComponent from './components/ReviewComponent';
import StaffComponent from './components/Admin/StaffComponent';
import StaffAddComponent from './components/Admin/StaffAddComponent';
import StaffEditComponent from './components/Admin/StaffEditComponent';
import DiscountComponent from './components/Admin/DiscountComponent';
import DiscountAddComponent from './components/Admin/DiscountAddComponent';

class App extends Component {
  loginStorage = '';
  state = {};

  componentDidMount() {
    this.loginStorage = JSON.parse(localStorage.getItem('login'));
    this.loginAdminStorage = JSON.parse(localStorage.getItem('login-admin'));
    if (this.loginStorage == null && this.loginAdminStorage == null) {
      this.setState({ 'login': <li className="nav-item"><a className="nav-link mx-2" href="/login">Login/Register</a></li> });
      this.setState({ 'room': <li className="nav-item"><a className="nav-link mx-2" href="/room">Room</a></li> });
    } else {
      if (this.loginStorage != null) {
        this.setState({ 'history': <li className="nav-item"><a className="nav-link mx-2" href="/history">History</a></li> });
        this.setState({ 'reserve': <li className="nav-item"><a className="nav-link mx-2" href="/reserve">Reserve</a></li> });
        this.setState({ 'login': <li className="nav-item"><a className="nav-link mx-2" href="/profile">Profile</a></li> });
        this.setState({ 'logout': <li className="nav-item"><a className="nav-link mx-2" href="/logout">Logout</a></li> });
        this.setState({ 'room': <li className="nav-item"><a className="nav-link mx-2" href="/room">Room</a></li> });
      }
      if (this.loginAdminStorage != null) {
        if(this.loginAdminStorage.pName === 'Manager') {
          this.setState({ 'staff': <li className="nav-item"><a className="nav-link mx-2" href="/staff">Staff</a></li> });
          this.setState({ 'discount': <li className="nav-item"><a className="nav-link mx-2" href="/discount">Discount</a></li> });
        }
        this.setState({ 'reserve': <li className="nav-item"><a className="nav-link mx-2" href="/admin">Admin</a></li> });
        this.setState({ 'history': <li className="nav-item"><a className="nav-link mx-2" href="/payment">Payment</a></li> });
        this.setState({ 'login': <li className="nav-item"><a className="nav-link mx-2" href="/check">Checkin/Checkout</a></li> });
        this.setState({ 'logout': <li className="nav-item"><a className="nav-link mx-2" href="/logout">Logout</a></li> });
        this.setState({ 'room': <li className="nav-item"><a className="nav-link mx-2" href="/room-admin">Room</a></li> });
        this.setState({ 'customer': <li className="nav-item"><a className="nav-link mx-2" href="/customer">Customer</a></li> });
      }
    }
    console.log(this.state)
    console.log(localStorage.getItem('login'))
  }
  render() {
    return (
      <div id="context">
        <nav className="navbar navbar-expand-sm navbar-light" id="neubar">
          <div className="container">
            <a className="navbar-brand" href="/"><img src={logo} height="60" alt='logo' /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className=" collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto ">
                <li className="nav-item">
                  <a className="nav-link mx-2" aria-current="page" href="/">Home</a>
                </li>
                {this.state.room}
                {this.state.reserve}
                {this.state.history}
                {this.state.login}
                {this.state.customer}
                {this.state.discount}
                {this.state.staff}
                {this.state.logout}
              </ul>
            </div>
          </div>
        </nav>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HotelComponent />} />
            <Route path="/room" element={<RoomComponent />} />
            <Route path="/room-admin" element={<RoomAdminComponent />} />
            <Route path="/register" element={<RegisComponent />} />
            <Route path="/reserve" element={<ReserveComponent />} />
            <Route path="/reserve-room" element={<ReserveRoomComponent />} />
            <Route path="/history" element={<HistoryComponent />} />
            <Route path="/profile" element={<ProfileComponent />} />
            <Route path="/cancel-room" element={<CancelComponent />} />
            <Route path="/review-room" element={<ReviewComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route exact path="/admin" element={<AdminComponent />} />
            <Route path="/admin/login" element={<AdminLoginComponent />} />
            <Route exact path="/payment" element={<PaymentComponent />} />
            <Route path="/payment/booking" element={<PaymentUpdateComponent />} />
            <Route exact path="/check" element={<CheckComponent />} />
            <Route exact path="/check-in" element={<CheckInComponent />} />
            <Route exact path="/check-out" element={<CheckOutComponent />} />
            <Route exact path="/customer" element={<CustomerComponent />} />
            <Route exact path="/staff" element={<StaffComponent />} />
            <Route exact path="/staff-add" element={<StaffAddComponent />} />
            <Route exact path="/staff-edit" element={<StaffEditComponent />} />
            <Route exact path="/discount" element={<DiscountComponent />} />
            <Route exact path="/discount-add" element={<DiscountAddComponent />} />
            <Route path="/logout" element={<LogoutComponent />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;