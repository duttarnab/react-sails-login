import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter'
import LoginBox from './components/LoginBox'
//import './styles/styles.scss';


class ApplicationComponent extends React.Component
{
    constructor(props){
        super(props);
        this.handleAfterLogin = this.handleAfterLogin.bind(this);
        this.state ={
            username:undefined,
            email: undefined,
            isActive: false,
            roles: [],
            loginSuccess: false
        };
    }
    

    handleAfterLogin(data) 
    {
        alert(data.user.username);
        this.setState(() => {
            return {
                username:data.user.username,
                email: data.user.email,
                isActive: false,
                roles: [data.user.role],
                loginSuccess: true
                }
        });

        const json = JSON.stringify(data);
        localStorage.setItem('userObj',json);
    }

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
    componentDidUpdate(prevProps, prevState){
        /*if(prevState.options.length != this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }*/
    }

    render(){    
        return (
            <div>
                {this.state.loginSuccess ? <AppRouter /> : <LoginBox handleAfterLogin={this.handleAfterLogin} />}

            </div>
        );
    }
}

var app = ReactDOM.render(<ApplicationComponent a/>, document.getElementById('app'))
