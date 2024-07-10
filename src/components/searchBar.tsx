import { useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import InputBox from "./inputBox";

export default function SearchBar({
  // currentFilter,
  updateFilter,
}: {
  updateFilter: (filter: Record<string, string>) => void;
  // currentFilter: Record<string, string>;
}) {
  const [visibleBox, setVisibleBox] = useState<boolean>(false);
  const filterCriteria = useRef<Record<string, string>>({});
  return (
    <div className="flex gap-4 justify-end w-full h-[10%] bg-slate-600 text-white">
      {!visibleBox && (
        <div className="h-full pr-4 flex items-center">
          <FaFilter color="white" onClick={() => setVisibleBox(true)} />
        </div>
      )}

      {visibleBox && (
        <div
          id="filterBox"
          className="flex flex-col gap-4 bg-slate-500 opacity-90 h-fit p-2 w-1/4 z-50"
        >
          <div id="filter_price" className="flex gap-2 pr-2">
            <div className="w-1/2">
              <InputBox
                inputType="number"
                labelText="min price"
                // value={currentFilter.minPrice ?? null}
                inputUpdate={(value: string) => {
                  filterCriteria.current.minPrice = value;
                }}
              />
            </div>
            <div className="w-1/2">
              <InputBox
                inputType="number"
                labelText="max price"
                // value={currentFilter.maxPrice ?? null}
                inputUpdate={(value: string) => {
                  filterCriteria.current.maxPrice = value;
                }}
              />
            </div>
          </div>
          <div id="filter_bed_bath" className="flex gap-2 pr-2">
            <div className="w-1/2">
              <InputBox
                inputType="number"
                labelText="bedrooms"
                // value={currentFilter.beds ?? ""}
                inputUpdate={(value: string) => {
                  filterCriteria.current.beds = value;
                }}
              />
            </div>
            <div className="w-1/2">
              <InputBox
                inputType="number"
                labelText="baths"
                // value={currentFilter.baths ?? ""}
                inputUpdate={(value: string) => {
                  filterCriteria.current.baths = value;
                }}
              />
            </div>
          </div>
          <div id="filter_actions" className="flex justify-around">
            <button onClick={() => setVisibleBox(false)}>Cancel</button>
            <button
              onClick={() => {
                updateFilter(filterCriteria.current);
                setVisibleBox(false);
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* 

      <InputBox
        inputType="number"
        labelText="sqft"
        inputUpdate={(value) => updateFunctions.sqft(parseInt(value))}
      />
      <InputBox
        inputType="text"
        labelText="state"
        inputUpdate={(value) => updateFunctions.state(value)}
      /> */}
    </div>
  );
}
