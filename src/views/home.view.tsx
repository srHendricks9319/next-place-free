import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/hero";
import InputBox from "../components/inputBox";
import { SearchContext } from "../context/searchContext";
import { SettingsContext } from "../context/settings.context";
import { InvalidParameterError, MissingKeyError } from "../models/error.model";
import decodeGeolocation from "../services/location.service";

const inputStyles = {
  container: "flex flex-col gap-1",
  input: "px-2 py-1 text-black",
  label: "text-xs",
};

export default function Home() {
  const navigate = useNavigate();
  const { setAddress, setDistance } = useContext(SearchContext);
  const { hereKey } = useContext(SettingsContext);
  const [error, setError] = useState<string | undefined>();
  let address: string | undefined;
  let distance: number | undefined;

  async function search() {
    setError(undefined);

    try {
      const coordinate = await decodeGeolocation(address, hereKey);
      setAddress({
        label: coordinate.label,
        position: {
          lat: coordinate.position.lat,
          lng: coordinate.position.lng,
        },
      });
      setDistance(distance || 10);
      navigate("/search");
    } catch (error) {
      if (
        error instanceof MissingKeyError ||
        error instanceof InvalidParameterError
      )
        setError(error.message);
    }
  }

  return (
    <div className="h-full">
      <Hero />
      <div className="flex flex-col items-center gap-4 my-12">
        <div className="flex gap-4">
          <div id="address" className={inputStyles.container + " w-5/6"}>
            <InputBox
              inputType="text"
              labelText="Address"
              placeholder="City, ZIP, Address"
              inputUpdate={(value: string) => (address = value)}
            />
          </div>
          <div id="distance" className={inputStyles.container + " w-1/6"}>
            <InputBox
              inputType="text"
              labelText="Distance (time)"
              placeholder="10"
              inputUpdate={(value: string) => (distance = Number(value))}
            />
          </div>
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button className="w-fit py-1 px-2 border" onClick={() => search()}>
          Search
        </button>
      </div>
    </div>
  );
}
