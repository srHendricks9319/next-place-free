import { PiGearLight, PiHouseSimpleLight } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="py-4 px-8 bg-[#026fca] flex flex-row border-b border-white justify-between items-center">
      <Link to="">
        <div id="left" className="flex gap-1 items-center">
          <PiHouseSimpleLight size={24} />
          <h1 className="text-lg">Next Place</h1>
        </div>
      </Link>

      <div id="right">
        <Link to="settings">
          <PiGearLight size={24} />
        </Link>
      </div>
    </header>
  );
}
