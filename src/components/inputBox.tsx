type InputType = "text" | "toggle";

interface props {
  inputType: InputType;
  placeholder?: string;
  labelText: string;
  value?: string;
  inputUpdate: (value: string) => void;
}

export default function InputBox({
  inputType,
  placeholder,
  labelText,
  value,
  inputUpdate,
}: props) {
  return (
    <div className="flex flex-col gap-1">
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => inputUpdate(e.target.value)}
        className="bg-transparent border-b-2 border-white text-ellipsis"
      ></input>
      <label className="text-xs">{labelText}</label>
    </div>
  );
}
