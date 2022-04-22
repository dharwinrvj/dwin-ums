import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
class CreateUser extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    place: "",
  };
  handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.firstname !== "" &&
      this.state.lastname !== "" &&
      this.state.place !== ""
    ) {
      axios
        .post("https://dwin-ums.herokuapp.com/users", this.state)
        .then((res) => {
          console.log("successfully posted");
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({
        firstname: "",
        lastname: "",
        place: "",
      });
    }
    window.location = "/";
  };
  render() {
    return (
      <div>
        <div class="row justify-content-center mt-4">
          <div class="col-lg-4 mt-3">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div class="input-group mb-3">
                <input
                  required
                  name="firstname"
                  value={this.state.firstname}
                  onChange={(e) => this.handleChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
              </div>
              <div class="input-group mb-3">
                <input
                  required
                  name="lastname"
                  value={this.state.lastname}
                  onChange={(e) => this.handleChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Last Name"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
              </div>
              <div class="input-group mb-3">
                <input
                  required
                  name="place"
                  value={this.state.place}
                  onChange={(e) => this.handleChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Place"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
              </div>
              <button class="btn btn-danger" type="submit" id="button-addon1">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateUser;
