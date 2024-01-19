import { useContext, useEffect, useRef } from "react";
import InputBox from "../components/inputBox";
import Map, { PolygonDetails } from "../components/map";
import { SearchContext } from "../context/searchContext";
import { SettingsContext } from "../context/settings.context";
import getIntersectingArea from "../services/iso.service";

export default function Search() {
  const { address, distance } = useContext(SearchContext);

  return (
    <div className="w-full h-full flex flex-col">
      <div id="content" className="flex h-full">
        <div id="sidebar" className="w-1/4 mx-5 mt-6">
          <h2>Locations</h2>
          <InputBox
            inputType="text"
            labelText="Address 1"
            value={address?.label}
            inputUpdate={() => {}}
          ></InputBox>
          <div className="flex justify-between">
            <div className="w-[40%]">
              <InputBox
                inputType="text"
                labelText="Distance (time)"
                value={distance?.toString()}
                inputUpdate={() => {}}
              ></InputBox>
            </div>
            <div className="w-[55%]">
              <InputBox
                inputType="text"
                labelText="Label"
                value="Home"
                inputUpdate={() => {}}
              ></InputBox>
            </div>
          </div>
        </div>
        <div
          id="map"
          className="w-3/4 flex justify-center items-center bg-slate-300"
        >
          <Map address={address} distance={distance} />
        </div>
      </div>
    </div>
  );
}
