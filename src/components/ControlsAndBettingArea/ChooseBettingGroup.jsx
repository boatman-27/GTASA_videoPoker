import Button from "../../commonUI/Button";
import { useUser } from "../../contexts/UserContext";

function ChooseBettingGroup() {
  const { dispatch } = useUser();
  const handleBetting = (bettingGroup) => {
    dispatch({
      type: "SET_BETTING",
      payload: {
        choseBetting: true,
        bettingGroup: bettingGroup,
      },
    });
  };
  return (
    <div className="flex flex-col md:flex-row justify-around mt-2 w-full p-2 gap-2">
      <Button
        type="primary"
        onClick={() => {
          handleBetting(50);
        }}
      >
        Increments of $50
      </Button>
      <Button
        type="primary"
        onClick={() => {
          handleBetting(100);
        }}
      >
        Increments of $100
      </Button>
      <Button
        type="primary"
        onClick={() => {
          handleBetting(1000);
        }}
      >
        Increments of $1000
      </Button>
      <Button
        type="primary"
        onClick={() => {
          handleBetting(5000);
        }}
      >
        Increments of $5000
      </Button>
      <Button
        type="primary"
        onClick={() => {
          handleBetting(10000);
        }}
      >
        Increments of $10,000
      </Button>
    </div>
  );
}

export default ChooseBettingGroup;
