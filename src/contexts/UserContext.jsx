import { useContext, createContext, useReducer } from "react";
const UserContext = createContext();

const initialState = {
  balance: localStorage.getItem("balance") || 10000,
  choseBetting: localStorage.getItem("choseBetting") || false,
  bettingGroup: localStorage.getItem("bettingGroup") || 0,
  wager: localStorage.getItem("wager") || 0,
  bettingLevel: localStorage.getItem("bettingLevel") || 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "BET":
      localStorage.setItem("balance", state.balance - action.payload);
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "WIN":
      localStorage.setItem("balance", state.balance + action.payload);
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "LOSE":
      localStorage.setItem("balance", state.balance - action.payload);
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "SET_BETTING":
      localStorage.setItem("choseBetting", action.payload.choseBetting);
      localStorage.setItem("bettingGroup", action.payload.bettingGroup);
      localStorage.setItem("wager", action.payload.bettingGroup);
      return {
        ...state,
        choseBetting: action.payload.choseBetting,
        bettingGroup: action.payload.bettingGroup,
        wager: action.payload.bettingGroup,
      };
    case "SET_BALANCE":
      localStorage.setItem("balance", action.payload);
      return {
        ...state,
        balance: action.payload,
      };
    case "MODIFY_WAGER":
      localStorage.setItem("wager", action.payload.wager);
      localStorage.setItem("bettingLevel", action.payload.bettingLevel);
      return {
        ...state,
        wager: action.payload.wager,
        bettingLevel: action.payload.bettingLevel,
      };
    case "RESET_USER":
      localStorage.removeItem("choseBetting");
      localStorage.removeItem("bettingGroup");
      localStorage.removeItem("wager");
      localStorage.removeItem("bettingLevel");
      return {
        ...state,
        choseBetting: false,
        bettingGroup: 0,
        wager: 0,
        bettingLevel: 1,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function UserProvider({ children }) {
  const [
    { balance, choseBetting, bettingGroup, wager, bettingLevel },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider
      value={{
        balance,
        choseBetting,
        bettingGroup,
        wager,
        bettingLevel,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
