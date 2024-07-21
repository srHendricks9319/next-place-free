type InputType = "text" | "toggle" | "number" | "select";

interface props {
  inputType: InputType;
  placeholder?: string;
  labelText: string;
  value?: string;
  options?: string[];
  inputUpdate: (value: string) => void;
}

export default function InputBox({
  inputType,
  placeholder,
  labelText,
  value,
  options,
  inputUpdate,
}: props) {
  if (inputType === "select") {
    return (
      <div className="flex flex-col gap-1">
        <select
          className="bg-transparent border-b-2 border-white text-ellipsis"
          onChange={(e) => inputUpdate(e.target.value)}
        >
          {options?.map((element) => {
            return <option value={element}>{element.replace("_", " ")}</option>;
          })}
        </select>
      </div>
    );
  }
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
