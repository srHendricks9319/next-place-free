import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../components/inputBox";
import { SettingsContext } from "../context/settings.context";

export default function Settings() {
  const navigate = useNavigate();
  const hereInput = useRef<string>("");
  const openRouteInput = useRef<string>("");
  const { setHereKey, setOpenRouteServiceKey } = useContext(SettingsContext);
  return (
    <div
      id="settings"
      className="h-full flex flex-col justify-center items-center gap-6"
    >
      <div id="here" className="text-left">
        <a
          href="https://www.here.com/docs/bundle/identity-and-access-management-developer-guide/page/topics/dev-apikey.html"
          className="underline decoration-dashed"
        >
          Here Developer Key
        </a>
        <InputBox
          inputType="text"
          labelText="Key"
          inputUpdate={(value: string) => {
            hereInput.current = value;
          }}
        />
      </div>
      <div id="openRoute">
        <a
          href="https://openrouteservice.org/plans/"
          className="underline decoration-dashed"
        >
          ORS Developer Key
        </a>
        <InputBox
          inputType="text"
          labelText="Key"
          inputUpdate={(value: string) => {
            openRouteInput.current = value;
          }}
        />
      </div>
      <button
        className="border  py-1 px-4"
        onClick={() => {
          console.log("we save");
          setHereKey(hereInput.current);
          setOpenRouteServiceKey(openRouteInput.current);
          navigate("/");
        }}
      >
        Save
      </button>
    </div>
  );
}
