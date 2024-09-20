import { useUser } from "../../contexts/UserContext";

function ReturnTableItem({ payout }) {
  const { hand, firstLevel, secondLevel, thirdLevel, fourthLevel, fifthLevel } =
    payout;
  const { bettingLevel } = useUser();

  const levels = [firstLevel, secondLevel, thirdLevel, fourthLevel, fifthLevel];

  return (
    <tr className="space-y-3 text-xl font-extrabold uppercase">
      <td className="px-4 py-2 text-left whitespace-nowrap text-yellow-300 border-2 border-green-700 w-2/6">
        {hand}
      </td>
      {levels.map((level, index) => (
        <td
          key={index}
          className={`px-4 py-2 text-center border-2 border-green-700 text-white ${
            bettingLevel === index + 1 ? "bg-red-500" : ""
          }`}
        >
          {level}
        </td>
      ))}
    </tr>
  );
}

export default ReturnTableItem;
