import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
class ListUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      ufirstname: "",
      ulastname: "",
      uplace: "",
      uid: "",
    };
  }

  getUsers = () => {
    axios
      .get("http://localhost:5005/user/", { mode: "cors" })
      .then((res) => {
        res.data.map((data) => {
          return console.log(
            data.firstname + " " + data.lastname + " " + data.place
          );
        });
        this.setState({ users: res.data });
        console.log("data received..........");
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.getUsers();
  }
  handleUpdate = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  handleModalUpdate = (e) => {
    axios
      .put("http://localhost:5005/user/" + this.state.uid, {
        firstname: this.state.ufirstname,
        lastname: this.state.ulastname,
        place: this.state.uplace,
      })
      .then((res) => {
        console.log("successfully updated");
        window.location = "/";
      });
  };
  handleDelete = (id) => {
    console.log(id);
    axios.delete("http://localhost:5005/user/" + id).then((res) => {
      console.log("successfully deleted " + id);
      window.location = "/";
    });
  };
  render() {
    return (
      <div>
        <div class="row mt-4">
          {this.state.users.map((user) => (
            <div class="col-md-3">
              <div key={user._id} class="card bg-warning text-left mb-2">
                <div class="card-body">
                  <p>
                    <b>FirstName: </b>
                    {user.firstname}
                  </p>
                  <p>
                    <b>LastName: </b>
                    {user.lastname}
                  </p>
                  <p>
                    <b>Place: </b>
                    {user.place}
                  </p>
                  <button
                    class="btn btn-primary mr-2"
                    data-toggle="modal"
                    data-target="#staticBackdrop"
                    onClick={() =>
                      this.setState({
                        uid: user._id,
                        ufirstname: user.firstname,
                        ulastname: user.lastname,
                        uplace: user.place,
                      })
                    }
                  >
                    Update
                  </button>
                  <button
                    onClick={() => this.handleDelete(user._id)}
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          class="modal fade"
          id="staticBackdrop"
          data-backdrop="static"
          data-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Update Your Info
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <input
                  name="ufirstname"
                  value={this.state.ufirstname}
                  onChange={(e) => this.handleUpdate(e)}
                  type="text"
                  class="form-control mb-2"
                  placeholder="First Name"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <input
                  name="ulastname"
                  value={this.state.ulastname}
                  onChange={(e) => this.handleUpdate(e)}
                  type="text"
                  class="form-control mb-2"
                  placeholder="Last Name"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <input
                  name="uplace"
                  value={this.state.uplace}
                  onChange={(e) => this.handleUpdate(e)}
                  type="text"
                  class="form-control"
                  placeholder="Place"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={(e) => this.handleModalUpdate(e)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ListUser;
