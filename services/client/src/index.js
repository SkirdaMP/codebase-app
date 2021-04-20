import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import UsersList from './components/UsersList'

class App extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <br/>
                        <h1>All Users</h1>
                        <hr/><br/>
                            <UsersList users={this.state.users} />
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
        .then((res) => {this.setState({users: res.data.data.users}); })
        .catch((err) => {console.log(err); } )
    }
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

