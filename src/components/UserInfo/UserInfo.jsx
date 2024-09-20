import { useCards } from "../../contexts/CardContext";
import { useUser } from "../../contexts/UserContext";

function UserInfo() {
  const { balance, bettingGroup, bettingLevel } = useUser();
  const { handRank } = useCards();
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 p-4 text-white">
        <div className="flex justify-between p-2 border-r-4 border-b-4 border-green-500">
          <span className="text-lg font-medium">Balance:</span>
          <span className="text-lg">${balance}</span>
        </div>

        <div className="flex justify-between p-2 border-r-4 border-b-4 border-green-500">
          <span className="text-lg font-medium">Betting Group:</span>
          <span className="text-lg">${bettingGroup}</span>
        </div>

        <div className="flex justify-between p-2 border-r-4 border-b-4 border-green-500">
          <span className="text-lg font-medium">Betting Level:</span>
          <span className="text-lg">{bettingLevel}</span>
        </div>

        <div className="flex justify-between p-2 border-r-4 border-b-4 border-green-500">
          <span className="text-lg font-medium">Latest Hand Rank:</span>
          <span className="text-lg">{handRank || "Not Available"}</span>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
