import { useContext, createContext, useReducer } from "react";
import { determineHandRank } from "../services/CardManager";
const CardContext = createContext();
const initialState = {
  drawnCards: localStorage.getItem("drawnCards") || [],
  heldCards: localStorage.getItem("heldCards") || [],
  dealt: localStorage.getItem("dealt") || false,
  handRank: localStorage.getItem("handRank") || null,
};

function reducer(state, action) {
  switch (action.type) {
    case "DEAL": {
      const heldCards = JSON.parse(localStorage.getItem("heldCards")) || [];
      let newDrawnCards = [...action.payload];

      if (heldCards.length > 0 && Array.isArray(heldCards)) {
        for (let i = 0; i < heldCards.length; i++) {
          const heldCard = heldCards[i];
          newDrawnCards[heldCard.index] = heldCard;
        }
      }

      localStorage.setItem("drawnCards", JSON.stringify(newDrawnCards));
      localStorage.setItem("dealt", true);

      return {
        ...state,
        drawnCards: newDrawnCards,
        dealt: true,
      };
    }
    case "HOLDCARD":
      localStorage.setItem(
        "heldCards",
        JSON.stringify([...state.heldCards, action.payload])
      );
      return {
        ...state,
        heldCards: [...state.heldCards, action.payload],
      };
    case "REMOVEHOLD": {
      const updatedHeldCards = state.heldCards.filter(
        (card) => card !== action.payload
      );
      localStorage.setItem("heldCards", JSON.stringify(updatedHeldCards));
      return {
        ...state,
        heldCards: updatedHeldCards,
      };
    }
    case "RESET_CARDS":
      localStorage.removeItem("drawnCards");
      localStorage.removeItem("heldCards");
      localStorage.removeItem("dealt");
      return {
        ...state,
        drawnCards: [],
        heldCards: [],
        dealt: false,
      };
    case "DETERMINE_HAND": {
      const drawnCards = localStorage.getItem("drawnCards");
      const drawnCardsArray = JSON.parse(drawnCards);
      const rank = determineHandRank(drawnCardsArray);
      localStorage.setItem("handRank", rank);
      return {
        ...state,
        handRank: rank,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function CardProvider({ children }) {
  const [{ drawnCards, heldCards, score, dealt, handRank }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <CardContext.Provider
      value={{ drawnCards, heldCards, score, dealt, handRank, dispatch }}
    >
      {children}
    </CardContext.Provider>
  );
}

function useCards() {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error("useCards must be used within a CardProvider");
  }
  return context;
}

export { CardProvider, useCards };
