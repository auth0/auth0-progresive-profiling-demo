import profilingstep1_template from "../templates/profilingstep1.ejs";
import $ from "jquery";

export default class ProfilingStep1 { 

  constructor(app) { 

    this.app = app;

  }

  render() {
    $('#main-container').html( profilingstep1_template({profile:this.app.getUser()}) );
    $('#logout-button').click( () => this.app.logOut() );
    $('#profiler-step1').submit( (event) => {
      event.preventDefault();

      let user = this.app.getUser();
      user.user_metadata = $('#profiler-step1').serializeArray().reduce(function(obj, item) {
          obj[item.name] = item.value;
          return obj;
      }, user.user_metadata);

      user.user_metadata.last_profiling_step = 1;

      this.app.updateMetadata(user.user_metadata);
    });
  }

}
