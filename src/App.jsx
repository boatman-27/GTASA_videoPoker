import { useUser } from "./contexts/UserContext";

import Cards from "./components/CardsArea/Cards";
import ChooseBettingGroup from "./components/ControlsAndBettingArea/ChooseBettingGroup";
import BettingAreaPage from "./components/ControlsAndBettingArea/BettingAreaPage";
import ReturnTable from "./components/ReturnTable/ReturnTable";
import { Toaster } from "react-hot-toast";
import UserInfo from "./components/UserInfo/UserInfo";

function App() {
  const { choseBetting } = useUser();
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <ReturnTable />

      <div className="w-full">
        <UserInfo />
      </div>

      <div className="w-full">
        <Cards />
      </div>

      <div className="w-full">
        {!choseBetting ? <ChooseBettingGroup /> : <BettingAreaPage />}
      </div>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </div>
  );
}

export default App;
