export const initialState = {
  todo: "",
  todos: [],
  dummy: 0,
  modal: { open: false, data: null },
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD":
    case "DELETE":
    case "UPDATE":
      return { ...state, todos: action.payload };
    case "ON_CHANGE":
      return { ...state, todo: action.payload };
    case "ON_CLEAR":
      return { ...state, todo: "" };
    case "ON_DUMMY":
      return { ...state, dummy: state.dummy + 1 };
    case "OPEN_MODAL":
      return {
        ...state,
        modal: { open: action.payload.open, data: action.payload.data },
      };
    default:
      return state;
  }
};
