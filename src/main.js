import $ from "jquery";
import ls from "local-storage";

import Login from "./controllers/login.js";
import Profile from "./controllers/profile.js";
import ProfilingStep1 from "./controllers/profilingstep1.js";
import ProfilingStep2 from "./controllers/profilingstep2.js";

class App { 

  constructor() {
    this.profile = ls.get('profile');
    this.id_token = ls.get('id_token');
    this.access_token = ls.get('access_token');
  }

  logOut() {
    this.profile = null;
    this.id_token = null;
    this.access_token = null;

    ls.remove('profile');
    ls.remove('id_token');
    ls.remove('access_token');

    this.render();
  }

  getUser() {
    return this.profile;
  }

  updateMetadata(metadata) { 
    this.profile.user_metadata = metadata;

    fetch('https://' + auth0_config.domain + '/api/v2/users/' + this.profile.user_id, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.id_token
          },
          body: JSON.stringify({ user_metadata: this.profile.user_metadata })
        })
        .then( response => response.json() )
        .then( response => {
          this.setUser(this.profile);
          this.render();
        })
        .catch( e => alert(e) )
  }

  setUser(profile) {
    this.profile = profile;
    this.profile.user_metadata = this.profile.user_metadata || {};
    ls.set('profile', this.profile);
  }

  getIdToken() {
    return this.id_token;
  }

  getAccessToken() {
    return this.access_token;
  }

  logIn(id_token, access_token, profile) {
    
    this.access_token = access_token;
    this.id_token = id_token;

    this.setUser(profile);
    
    ls.set('id_token', this.id_token);
    ls.set('access_token', this.access_token);

    this.render( ! this.profile.is_singup );
  }

  render(do_profiling) {

    do_profiling = do_profiling || false;

    if (!this.id_token) {
      let login = new Login(this);
      login.render();
    } else if (do_profiling) {

      switch(this.profile.user_metadata.last_profiling_step || 0) {
        case 0:
          let profiler1 = new ProfilingStep1(this);
          profiler1.render();
          break;

        case 1:
          let profiler2 = new ProfilingStep2(this);
          profiler2.render();
          break;

        default:
          let profile = new Profile(this);
          profile.render();
      }

    } else {
      let profile = new Profile(this);
      profile.render();
    }
  }

}

let app = new App();
app.render();