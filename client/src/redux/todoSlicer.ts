export const initialState = {
  todo: "",
  todos: [],
  dummy: 0,
  modal: { open: false, data: null },
};

type TodoAction =
  | { type: "ADD" | "DELETE" | "UPDATE"; payload: any[] }
  | { type: "ON_CHANGE"; payload: string }
  | { type: "ON_CLEAR" }
  | { type: "ON_DUMMY" }
  | { type: "OPEN_MODAL"; payload: { open: boolean; data: any } };

type TodoState = {
  todo: string;
  todos: any[];
  dummy: number;
  modal: { open: boolean; data: any };
};

export const reducer = (state: TodoState, action: TodoAction) => {
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
