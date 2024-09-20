import Button from "../../commonUI/Button";

function BettingArea({
  wager,
  bettingGroup,
  handleExit,
  increaseWager,
  decreaseWager,
  canDealCards,
  dealCards,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-2 p-4 mt-2">
      <div className="flex flex-col items-center justify-center border-4 border-black bg-white h-20 p-3 w-60">
        <h2 className="text-2xl font-bold text-center">Wager: ${wager}</h2>
      </div>

      <div className="flex flex-row  items-center justify-center gap-2">
        <Button
          type="small"
          customClass="h-12"
          onClick={decreaseWager}
          disabled={wager === bettingGroup}
        >
          -
        </Button>
        <div className="flex flex-row items-center justify-center border-4 border-black bg-white h-20 p-3">
          <h2 className="text-2xl font-bold text-center">
            Coin: ${bettingGroup}
          </h2>
        </div>
        <Button
          type="small"
          customClass="h-12"
          onClick={increaseWager}
          disabled={wager >= bettingGroup * 5}
        >
          +
        </Button>
      </div>

      <div className="flex flex-row items-center justify-center gap-2">
        <Button type="primary" customClass="h-20 w-20" onClick={handleExit}>
          Exit
        </Button>
        <Button
          type="primary"
          customClass="h-20 w-40"
          onClick={dealCards}
          disabled={!canDealCards}
        >
          Deal Cards
        </Button>
      </div>
    </div>
  );
}

export default BettingArea;
