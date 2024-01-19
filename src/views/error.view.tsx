import { PiSmileySadLight } from "react-icons/pi";

export default function ErrorView() {
  return (
    <div className="h-full flex flex-col gap-4 justify-center items-center">
      <PiSmileySadLight size={64} />
      <p className="text-gray-500">Something went wrong</p>
    </div>
  );
}
