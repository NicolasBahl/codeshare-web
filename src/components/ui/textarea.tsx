"use client";

import React from "react";

import cn from "@/utils/cn";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  loading?: boolean;
  error?: string;
  label?: string;
  minHeight?: string;
}

const TextArea: React.FC<TextareaProps> = ({
  loading,
  error,
  minHeight = "3rem",
  ...props
}) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = React.useState<string>("");

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setValue(val);
  };

  return (
    <div>
      {props.label && (
        <label
          className="text-black-500 text-sm font-bold"
          htmlFor={props.label.toLowerCase()}
        >
          {props.label}
        </label>
      )}
      <textarea
        ref={textAreaRef}
        id={props.label?.toLowerCase() || undefined}
        disabled={loading}
        onChange={handleChange}
        rows={1}
        style={{ resize: "none", minHeight }}
        value={value}
        {...props}
        className={cn(
          "border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 ring-red-100",
          props.className
        )}
      />
      {error && <p className="ml-1 mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

TextArea.displayName = "TextArea";

export default TextArea;

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  React.useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};
