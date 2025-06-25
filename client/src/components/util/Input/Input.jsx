import { clsx } from "clsx";
import FormError from "../../../utils/FormError";

const Input = ({ type, placeHolder, register, name, errors }) => {
  return (
    <div>
      <input
        className={clsx(
          `border p-3 text-sm outline-none rounded-md w-full`,
          errors && errors[name]?.message && "border-red-400"
        )}
        type={type}
        placeholder={placeHolder}
        {...register(name)}
      />
      <FormError errors={errors} name={name} />
    </div>
  );
};

export default Input;
