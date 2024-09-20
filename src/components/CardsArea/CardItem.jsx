import Button from "../../commonUI/Button";
import { useCards } from "../../contexts/CardContext";

function CardItem({ card }) {
  const { dispatch, heldCards } = useCards();
  const { value, suite, index } = card;

  function handleHold() {
    const cardInfo = { value, suite, index };
    dispatch({ type: "HOLDCARD", payload: cardInfo });
  }

  const heldCardsArray = Array.isArray(heldCards) ? heldCards : [];

  // Check if the current card is in the heldCards array by comparing its index
  const isHeld = heldCardsArray.some(
    (heldCard) =>
      heldCard.index === card.index &&
      heldCard.value === card.value &&
      heldCard.suite === card.suite
  );

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <img
        key={index}
        src={`/src/PokerCards/${value}${suite}.svg`}
        alt={`${value} of ${suite}`}
      />
      <Button
        type="small"
        customClass={`h-12 ${isHeld ? "bg-yellow-500" : ""}`}
        onClick={handleHold}
      >
        {` ${isHeld ? "Held" : "Hold"}`}
      </Button>
    </div>
  );
}

export default CardItem;
