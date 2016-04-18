import profilingstep2_template from "../templates/profilingstep2.ejs";
import $ from "jquery";

export default class ProfilingStep2 { 

  constructor(app) { 

    this.app = app;

  }

  render() {
    $('#main-container').html( profilingstep2_template({profile:this.app.getUser()}) );
    $('#logout-button').click( () => this.app.logOut() );
    $('#profiler-step2').submit( (event) => {
      event.preventDefault();

      let user = this.app.getUser();
      user.user_metadata = $('#profiler-step2').serializeArray().reduce(function(obj, item) {
          obj[item.name] = item.value;
          return obj;
      }, user.user_metadata);

      user.user_metadata.last_profiling_step = 2;

      this.app.updateMetadata(user.user_metadata);
    });
  }

}
