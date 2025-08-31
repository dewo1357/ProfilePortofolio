import { useState } from "react";

export default function Switch({ checked = false, onChange }) {
  const [enabled, setEnabled] = useState(checked);

  const toggle = () => {
    const newVal = enabled ? false : true;
    console.log(newVal)
    setEnabled(newVal);
    onChange(newVal);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shadow-lg ${
        enabled ? "bg-slate-300" : "bg-gray-300 dark:bg-slate-600"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-slate-900 dark:bg-slate-200 shadow-md transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
