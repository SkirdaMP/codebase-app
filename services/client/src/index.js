import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import AddUser from "./components/AddUser";
import UsersList from './components/UsersList'

class App extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            username: '',
            email: ''
        };
        this.addUser = this.addUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <br/>
                        <h1>All Users</h1>
                        <hr/><br/>
                        <AddUser
                            username={this.state.username}
                            email={this.state.email}
                            handleChange={this.handleChange}
                            addUser={this.addUser}
                        />
                        <br/>
                        <UsersList users={this.state.users} />
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getUsers();
    }

    addUser(event) {
        event.preventDefault();
        const data = {
            username: this.state.username,
            email: this.state.email
        };
        axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
            .then((res) => {
                this.getUsers();
                this.setState({username: '', email: ''});
            })
            .catch((err) => { console.log(err); });
        console.log("sanity check!");
    }

    getUsers() {
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
        .then((res) => {this.setState({users: res.data.data.users}); })
        .catch((err) => {console.log(err); } )
    }

    handleChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

