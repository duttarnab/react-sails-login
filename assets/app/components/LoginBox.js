import React from 'react';
export default class LoginBox extends React.Component
{
    constructor(props){
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.onSuccessfulLogin = this.onSuccessfulLogin.bind(this);
        
    }
    handleOnSubmit(e)
    {
        e.preventDefault();
        const username = e.target.elements.username.value.trim();
        const password = e.target.elements.password.value.trim();
        
        const data = 'username=' + username + '&password=' + password;
        var self = this;
		$.ajax({
			data: data,
			timeout: 1000,
			type: 'POST',
			url: '/User/login'

		}).done(function(data, textStatus, jqXHR) {
            alert('Success!!'+data.message);
            console.log(data);
            self.props.handleAfterLogin(data);
			
		}).fail(function(jqXHR, textStatus, errorThrown) {
			alert('Booh! Wrong credentials, try again!'+errorThrown);
		});
        /*if(username && password){
            $('#login-form').sumit();
        }*/
    };
    onSuccessfulLogin(data)
    {
        
    }
    render(){
        return(
            <div id="loginbox">
                <form id='login-form' className="form-vertical" onSubmit={this.handleOnSubmit} action='/login' method='post'>
                    <div className="control-group normal_text"> <h3><img src="img/logo.png" alt="Logo" /></h3></div>
                    <div className="control-group">
                        <div className="controls">
                            <div className="main_input_box">
                                <span className="add-on bg_lg"><i className="icon-user"> </i></span>
                                <input type="text" placeholder="username" name='username' id='username' />
                            </div>
                        </div>
                    </div>
                    <div className="control-group">
                        <div className="controls">
                            <div className="main_input_box">
                                <span className="add-on bg_ly"><i className="icon-lock"></i></span>
                                <input type="password" placeholder="password" name='password' id='password'/>
                            </div>
                        </div>
                    </div>
                    <div className="form-actions">
                        <span className="pull-left"><a href="#" className="flip-link btn btn-info" id="to-recover">Lost password?</a></span>
                        <span className="pull-right"><button className="btn btn-success">Login</button></span>
                    </div>
                </form>
            </div>
        );
    }
}