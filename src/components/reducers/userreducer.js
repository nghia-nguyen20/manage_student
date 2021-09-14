const initialState = [
    { id: 0, name: "Nguyễn Thị Nghĩa", Email: "nghia.nguyen.2022000@gmail.com",Phone: "0931541234", Location: "Lâm Đồng"},
  ];
  
  export const contactReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_CONTACT":
        state = [...state, action.payload];
        return state;
      case "DELETE_CONTACT":
        const contactFilter = state.filter((contact) =>
          contact.id === action.payload ? null : contact
        );
        state = contactFilter;
        return state;
      case "UPDATE_CONTACT":
        const contactUpdate = state.filter((contact) =>
          contact.id === action.payload.id
            ? Object.assign(contact, action.payload)
            : contact
        );
        state = contactUpdate;
        return state;
      case "RESET_CONTACT":
        state = [{ name: null, Email: null, Phone: null, Location: null, Aboutme: null }];
        return state;
      default:
        return state;
    }
  };
  