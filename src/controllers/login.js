import Auth0Lock from "auth0-lock/lib/classic"; 
import ls from "local-storage";
import login_template from "../templates/login.ejs";
import $ from "jquery";


export default class Login { 

  constructor(app) { 

    this.app = app;

    this.lock = new Auth0Lock(
      'GTOKRbb07FjepocQ7R9qRX6EFIaLfDjI', 
      'wptest.auth0.com', 
      {}, 
      (error, result) => {
        if (error) {

        }
        if (result) {
          this.app.logIn(result.idToken, result.profile);
        }
    });

  }

  render() {
    $('#main-container').html( login_template() );
    $('#login-button').click( () => this.lock.show() );
  }

}
