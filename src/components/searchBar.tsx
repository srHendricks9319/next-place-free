import { useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import InputBox from "./inputBox";

export default function SearchBar({
  // currentFilter,
  updateFilter,
  listingTypes,
}: {
  updateFilter: (filter: Record<string, string>) => void;
  listingTypes: Set<string>;
  // currentFilter: Record<string, string>;
}) {
  const [visibleBox, setVisibleBox] = useState<boolean>(false);
  const filterCriteria = useRef<Record<string, string>>({});

  const navigate = useNavigate();
  return (
    <div className="flex gap-4 justify-between w-full h-[10%] bg-slate-600 text-white">
      <div
        className="flex items-center gap-2 ml-8 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong color="white" />
        <p>Update search</p>
      </div>
      {!visibleBox && (
        <div className="h-full mr-8 flex items-center gap-6">
          <FaFilter
            color="white"
            className="cursor-pointer"
            onClick={() => setVisibleBox(true)}
          />
          {/* <FaFileDownload color="white" /> */}
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
          <InputBox
            inputType="select"
            labelText="type"
            value="all"
            options={Array.from(listingTypes).sort()}
            inputUpdate={(value: string) => {
              filterCriteria.current.type = value;
            }}
          />
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
