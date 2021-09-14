import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Table ={
    padding: "30px"
}
const styleTable = {
    border: "1px solid #DDDDDD ",
    width: "1180px",
    padding: " 5px",
    textAlign: 'center',
    borderRadius: "10px",
}
const Btn = {
    width: "70px",
    height: "30px",
    marginLeft: "10px",
    border: "none",
    color: "white",
    backgroundColor: "red",
    borderRadius: "5px",
}



const Home = ({ contacts, deleteContact }) => {
  return (
    <div>
      <div>
        <div style={Table}>
          <table style={styleTable}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Họ & Tên</th>
                <th>Email</th>
                <th>Phone </th>
                <th>Location</th>
                <th>Aboutme</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact, id) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.Email}</td>
                    <td>{contact.Phone}</td>
                    <td>{contact.Location}</td>
                    <td>{contact.Aboutme}</td>
                    <td>
                      <Link 
                        style={{textDecoration:"none"}}
                        to={`/edit/${contact.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        style = {Btn}
                        type="button"
                        onClick={() => deleteContact(contact.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>Danh sách trống !!</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
