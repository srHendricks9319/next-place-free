import { TbError404 } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col gap-4 justify-center items-center">
      <TbError404 size={64} />
      <p className="text-gray-500">Page Not Found</p>
    </div>
  );
}
