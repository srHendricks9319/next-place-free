import InputBox from "./inputBox";

interface onUpdates {
  price: (value: number) => void;
  bedrooms: (value: number) => void;
  baths: (value: number) => void;
  sqft: (value: number) => void;
  state: (value: string) => void;
}

export default function SearchBar({
  updateFunctions,
}: {
  updateFunctions: onUpdates;
}) {
  return (
    <div className="flex gap-4 items-center w-full h-16 p-2 bg-slate-600 text-white">
      <InputBox
        inputType="number"
        labelText="max price"
        inputUpdate={(value) => updateFunctions.price(parseInt(value))}
      />
      <InputBox
        inputType="number"
        labelText="required bedrooms"
        inputUpdate={(value) => updateFunctions.bedrooms(parseInt(value))}
      />
      <InputBox
        inputType="number"
        labelText="required baths"
        inputUpdate={(value) => updateFunctions.baths(parseInt(value))}
      />
      <InputBox
        inputType="number"
        labelText="sqft"
        inputUpdate={(value) => updateFunctions.sqft(parseInt(value))}
      />
      <InputBox
        inputType="text"
        labelText="state"
        inputUpdate={(value) => updateFunctions.state(value)}
      />
    </div>
  );
}
