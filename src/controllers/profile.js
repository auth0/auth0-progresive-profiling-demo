import profile_template from "../templates/profile.ejs";
import $ from "jquery";
import prettyjson from "prettyjson";

export default class Profile { 

  constructor(app) { 

    this.app = app;

  }

  render() {
    let profile = this.app.getUser();
    $('#main-container').html( profile_template({profile:profile, prettyjson:prettyjson}) );
    $('#logout-button').click( () => this.app.logOut() );
  }

}
