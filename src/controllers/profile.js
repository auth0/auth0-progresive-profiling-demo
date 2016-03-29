import ls from "local-storage";
import profile_template from "../templates/profile.ejs";
import $ from "jquery";


export default class Profile { 

  constructor(app) { 

    this.app = app;

  }

  render() {
    $('#main-container').html( profile_template({profile:this.app.getUser()}) );
    $('#logout-button').click( () => this.app.logOut() );
  }

}
