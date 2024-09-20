import { returnTableData } from "../../services/ReturnTableData";
import ReturnTableItem from "./ReturnTableItem";

function ReturnTable() {
  return (
    <div className="relative mx-auto w-full overflow-x-auto sm:rounded-lg p-2">
      <div className="overflow-x-auto">
        <table className="min-w-full md:w-full border-4 border-green-700 border-rounded-lg">
          <tbody>
            {returnTableData?.map((payout) => (
              <ReturnTableItem payout={payout} key={payout.hand} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReturnTable;
