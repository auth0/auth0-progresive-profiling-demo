import Auth0Lock from "auth0-lock/lib/classic"; 
import login_template from "../templates/login.ejs";
import $ from "jquery";


export default class Login { 

  constructor(app) { 

    this.app = app;

    this.lock = new Auth0Lock(
      auth0_config.client_id, 
      auth0_config.domain, 
      {
        additionalSignUpFields: [
          {
            name: "name",
            icon: "img/name.svg",
            placeholder: "your name"
          },
          {
            name: "lastName",
            icon: "img/name.svg",
            placeholder: "your last name"
          }
        ]
      }, 
      (error, result) => {
        if (error) {

        }
        if (result) {
          this.app.logIn(result.idToken,result.accessToken,result.profile);
        }
    });

  }

  render() {
    $('#main-container').html( login_template() );
    $('#login-button').click( () => this.lock.show() );
  }

}
