import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink} from 'react-router-dom';

export default class Header extends React.Component
{

    state ={
        username:undefined,
        email: undefined,
        isActive: false,
        roles: [],
        loginSuccess: false
    };
    componentDidMount(){
        try{
            const json = localStorage.getItem('userObj');
            console.log(json);
            const userObj = JSON.parse(json);
            if(userObj){
                console.log(userObj);
                this.setState(() => {
                    return {
                        username:userObj.user.username,
                        email: userObj.user.email,
                        isActive: false,
                        roles: [userObj.user.role],
                        loginSuccess: true
                        }
                });
            }
            
        }catch(e){
            //do not do anything.
            alert('error in parsing Json');
        }
    }

    render(){    
        return (
            <header>
            <div id="header" className="dashboardheader">
              <h1><a href="/">Matrix Admin</a></h1>
            </div>
            <div id="user-nav" className="navbar navbar-inverse">
                <ul className="nav">
                    <li className="dropdown" id="profile-messages">
                        <a title="" href="#" data-toggle="dropdown"  data-target="#profile-messages" className="dropdown-toggle">
                            <i className="icon icon-user"></i> <span className="text">Welcome {this.state.username}</span><b className="caret"></b>
                        </a>
                        <ul className="dropdown-menu">
                            <li><a href="#"><i className="icon-user"></i> My Profile</a></li>
                            <li className="divider"></li>
                            <li><a href="#"><i className="icon-check"></i> My Tasks</a></li>
                            <li className="divider"></li>
                            <li><a href="login.html"><i className="icon-key"></i> Log Out</a></li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to='/' exact={true} activeclassName='is-active'><i className="icon icon-share-alt"></i> 
                        <span className="text">Categories</span></NavLink>
                    </li>
                    <li>
                        <NavLink to='/Create' activeclassName='is-active'><i className="icon icon-share-alt"></i> 
                        <span className="text">Purchase</span></NavLink>
                    </li>
                    <li>
                        <NavLink to='/edit' activeClassName='is-active'><i className="icon icon-share-alt"></i> 
                        <span className="text">Purchase</span></NavLink>
                    </li>
                    <li>
                        <NavLink to='/help' activeClassName='is-active'><i className="icon icon-share-alt"></i> 
                        <span className="text">Logout</span></NavLink>
                    </li>
                </ul>
            </div>
        </header>
        );
    }
}


