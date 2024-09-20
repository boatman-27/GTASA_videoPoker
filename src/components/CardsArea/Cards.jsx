import { useEffect } from "react";
import { useCards } from "../../contexts/CardContext";
import CardItem from "./CardItem";

function Cards() {
  const { dealt, drawnCards = [], dispatch } = useCards();

  useEffect(() => {
    const storedDrawnCards = localStorage.getItem("drawnCards");
    if (storedDrawnCards) {
      try {
        const parsedDrawnCards = JSON.parse(storedDrawnCards);
        if (Array.isArray(parsedDrawnCards)) {
          dispatch({ type: "DEAL", payload: parsedDrawnCards });
        } else {
          console.error("Invalid data in localStorage for drawnCards.");
        }
      } catch (error) {
        console.error("Error parsing drawnCards from localStorage:", error);
      }
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row justify-around mt-2 w-full p-2 gap-2">
      {dealt && Array.isArray(drawnCards)
        ? drawnCards?.map((card, index) => <CardItem card={card} key={index} />)
        : Array(5)
            .fill(0)
            .map((_, index) => (
              <img key={index} src="/src/PokerCards/2B.svg" alt="Card back" />
            ))}
    </div>
  );
}

export default Cards;
