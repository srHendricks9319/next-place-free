import { useContext } from "react";
import InputBox from "../components/inputBox";
import Map from "../components/map";
import { SearchContext } from "../context/searchContext";
import { SearchAddress } from "../models/address.model";

export default function Search() {
  const { addresses } = useContext(SearchContext);

  return (
    <div className="w-full h-full flex flex-col">
      <div id="content" className="flex h-full">
        <div id="sidebar" className="w-1/4 mt-6 flex flex-col justify-between">
          <div id="top" className="mx-4">
            <h2>Locations</h2>
            <div id="addresses" className="flex flex-col gap-4">
              {addresses?.map((address: SearchAddress, index: number) => {
                return (
                  <div key={index}>
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
                          value={address.distance.toString()}
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
                );
              })}
            </div>

            {/* TODO: Implement adding additional addresses
            <button
              className="border rounded-xl px-2 flex items-center mt-4 gap-1"
              onClick={() => {}}
            >
              <PiPlusLight size={16} />
              Add
            </button> */}
          </div>

          {/* // TODO: Implement updating of address(es)
          <div id="bottom" className="w-full border-t">
            <button className="text-align py-2 w-full">Search</button>
          </div> */}
        </div>
        <div
          id="map"
          className="w-3/4 flex justify-center items-center bg-slate-300"
        >
          <Map addresses={addresses} />
        </div>
      </div>
    </div>
  );
}
