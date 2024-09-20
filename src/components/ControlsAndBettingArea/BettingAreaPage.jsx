import { useEffect, useState } from "react";
import { useCards } from "../../contexts/CardContext";
import { useUser } from "../../contexts/UserContext";
import { calculateWinnings, chooseCards } from "../../services/CardManager";
import toast from "react-hot-toast";
import BettingArea from "./BettingArea";

function BettingAreaPage() {
  const {
    wager,
    bettingGroup,
    dispatch: userDispatch,
    balance,
    bettingLevel,
  } = useUser();
  const { dispatch: cardsDispatch } = useCards();
  const allowedNumberofDeals = 2;
  const [numberOfDeals, setNumberOfDeals] = useState(0);

  const canDealCards =
    numberOfDeals < allowedNumberofDeals
      ? numberOfDeals === 1
        ? true
        : wager > balance
        ? false
        : true
      : false;
  console.log("canDealCards:", canDealCards);

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    if (storedBalance) {
      userDispatch({ type: "SET_BALANCE", payload: parseFloat(storedBalance) });
    }
  }, [userDispatch, cardsDispatch]);

  function handleExit() {
    userDispatch({ type: "RESET_USER" });
    cardsDispatch({ type: "RESET_CARDS" });
  }

  function increaseWager() {
    userDispatch({
      type: "MODIFY_WAGER",
      payload: { wager: wager + bettingGroup, bettingLevel: bettingLevel + 1 },
    });
  }

  function decreaseWager() {
    userDispatch({
      type: "MODIFY_WAGER",
      payload: { wager: wager - bettingGroup, bettingLevel: bettingLevel - 1 },
    });
  }

  function dealCards() {
    const newDealCount = numberOfDeals + 1;
    setNumberOfDeals(newDealCount);
    const cards = chooseCards();
    if (numberOfDeals === 0) {
      userDispatch({ type: "BET", payload: wager });
    }
    cardsDispatch({ type: "DEAL", payload: cards });

    if (newDealCount >= allowedNumberofDeals) {
      handleDeal();
    }
  }

  async function handleDeal() {
    // Determine hand rank and update local storage
    cardsDispatch({ type: "DETERMINE_HAND" });

    // Use setTimeout to allow state updates
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Retrieve updated hand rank from localStorage
    const updatedHandRank = localStorage.getItem("handRank");
    if (updatedHandRank === "No Winning Hand") {
      toast.error("No Winning Hand");
    } else {
      const winnings = calculateWinnings(updatedHandRank, wager, bettingLevel);

      // Retrieve and update balance
      const currentBalance =
        parseFloat(localStorage.getItem("balance")) || balance;
      const newBalance = currentBalance + winnings - wager;

      // Update balance in context and localStorage
      userDispatch({ type: "SET_BALANCE", payload: newBalance });
      localStorage.setItem("balance", newBalance);

      // Provide feedback to user
      toast.success(`Payout: ${winnings}!`);
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Reset cards and deals
    cardsDispatch({ type: "RESET_CARDS" });
    setNumberOfDeals(0);
  }

  return (
    <BettingArea
      wager={wager}
      bettingGroup={bettingGroup}
      handleExit={handleExit}
      increaseWager={increaseWager}
      decreaseWager={decreaseWager}
      canDealCards={canDealCards}
      dealCards={dealCards}
    />
  );
}

export default BettingAreaPage;
