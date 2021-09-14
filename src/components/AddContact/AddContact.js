import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
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

const AddPost = ({ contacts, addContact }) => {
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Location, setLocation] = useState("");
  const [Aboutme, setAboutme] = useState("");
  

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactMSSVExists = contacts.filter((contact) =>
      contact.Email === Email ? contact : null
    );
    const checkContactDcExists = contacts.filter((contact) =>
      contact.Phone === Phone ? contact : null
    );
    const checkContactTuoiExists = contacts.filter((contact) =>
      contact.Location === Location ? contact : null
    );

    if (!Email || !name|| !Phone || !Location  || !Aboutme) {
      return toast.warning("Vui lòng nhập thông tin!!");
    }

    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      Email,
      name,
      Phone,
      Location,
      Aboutme,

    };

    addContact(data);
    toast.success("Đã thêm thành công!!");
    history.push("/");
  };

  return (
    <div className="container-fluid">
      <div style= {styleDiv}>
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
            </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    dispatch({ type: "ADD_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
