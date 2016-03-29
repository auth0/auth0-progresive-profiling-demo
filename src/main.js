import $ from "jquery";
import ls from "local-storage";

import Login from "./controllers/login.js";
import Profile from "./controllers/profile.js";

class App { 

  constructor() {
    this.profile = ls.get('profile');
    this.id_token = ls.get('id_token');
  }

  logOut() {
    this.profile = null;
    this.id_token = null;

    ls.remove('profile');
    ls.remove('id_token');

    this.render();
  }

  getUser() {
    return this.profile;
  }

  logIn(id_token, profile) {
    this.profile = profile;
    this.id_token = id_token;

    ls.set('profile', this.profile);
    ls.set('id_token', this.id_token);

    this.render();
  }

  render() {
    if (!this.id_token) {
      let login = new Login(this);
      login.render();
    } else {
      let profile = new Profile(this);
      profile.render();
    }
  }

}

let app = new App();
app.render();