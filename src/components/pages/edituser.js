import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";


const style = {
  display : "flex",
}
const styleInput = {
  width : "570px",
  height : "40px",
  borderRadius: "10px",
  border: "1px solid #DDDDDD"
}
const styleDiv = {
  margin: "15px"
}
const styleAbout = {
  width: "1185px",
  height: "70px",
  margin: "10px",
  marginRight: "35px",
  borderRadius: "10px",
  border: "1px solid #DDDDDD"
}
const styleP = {
  marginRight: "500px",
}
const styleButton = {
  width: "150px",
  height: "50px",
  backgroundColor: "#000080",
  color: "white",
  fontSize: "16px",
  marginLeft: "1000px",
  borderRadius: "10px",
  border: "none"
}

const EditContact = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const history = useHistory();
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentContact.name);
    setEmail(currentContact.Email); 
    setPhone(currentContact.Phone);
    setLocation(currentContact.Location);
    setAboutme(currentContact.Aboutme);
  }, [currentContact]);

  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Location, setLocation] = useState("");
  const [Aboutme, setAboutme] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.Email === Email && contact.id !== currentContact.id
        ? contact
        : null
    );
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.Phone === Phone && contact.id !== currentContact.id
        ? contact
        : null
    );
    const checkContactLocationExists = contacts.filter((contact) =>
      contact.Location === Location && contact.id !== currentContact.id
        ? contact
        : null
    );
    const checkContactAboutExists = contacts.filter((contact) =>
      contact.Aboutme === Aboutme && contact.id !== currentContact.id
        ? contact
        : null
    );

    if (!Email || !name || !Phone || !Location || !Aboutme) {
      return toast.warning("Vui lòng nhập thông tin!!");
    }

    const data = {
      id: currentContact.id,
      Email,
      name,
      Phone,
      Location,
      Aboutme,
    };

    updateContact(data);
    toast.success("Cập nhật thành công!!");
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => history.push("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentContact ? (
            <form action="" onSubmit={handleSubmit}>
              <h2>Profile infomation</h2>
              <div style = {style}>
                  <div style= {styleDiv}>
                      <p style= {styleP}>Full name: </p>
                      <input name="name" style={styleInput} value={name} type="text" placeholder= "Admin" onChange={(e) => setName(e.target.value)}/>
                  </div>
                  <div style= {styleDiv}>
                      <p style= {styleP}>Email: </p>
                      <input name="email" style={styleInput} value={Email} type="email" placeholder= "Admin@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                  </div>
              </div>
              <div style = {style}>
                  <div style= {styleDiv}>
                      <p style= {styleP}>Phone:</p>
                      <input name="phone" style={styleInput} value={Phone} type="number" placeholder= "0123456789" onChange={(e) => setPhone(e.target.value)}/>
                      <br />
                  </div>
                  <div style= {styleDiv}>
                      <p style= {styleP}>Location: </p>
                      <input name="location" style={styleInput} value={Location} type="text" placeholder= "Location" onChange={(e) => setLocation(e.target.value)}/>
                  </div>
              </div>

              <div>
                  <p style= {{marginRight: "1120px"}}>About me: </p>
                  <input name="aboutme" style= {styleAbout} value={Aboutme} type="text" placeholder= "Say something about yourself" onChange={(e) => setAboutme(e.target.value)} />
              </div>
              
              <button style= {styleButton}>
                          SEVE CHANGES
              </button>
          </form>
          ) : (
            <h1 className="text-center">Danh sách trống !!</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
