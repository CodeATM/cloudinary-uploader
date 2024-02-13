import { ChangeEvent, FC, LegacyRef } from "react";

type Props = {
  disabled?: boolean;
  inputRef: LegacyRef<HTMLInputElement>;
  onClick: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Button: FC<Props> = (props) => {
  const { disabled = false, inputRef, onChange, onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="normal-case bg-gray-900 text-gray-50 font-medium py-2.5 px-4 rounded-[10px] shadow-xl shadow-gray-500/50"
    >
      Choose a file
      <input
        type="file"
        name="image"
        accept="image/png, image/gif, image/jpeg"
        hidden
        onChange={onChange}
        ref={inputRef}
      />
    </button>
  );
};

export default Button;
