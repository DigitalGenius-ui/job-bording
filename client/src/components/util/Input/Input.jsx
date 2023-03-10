const Input = ({ name, type, placeHolder, setValue }) => {
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <input
      className="border p-3 text-sm outline-none rounded-md"
      type={type}
      placeholder={placeHolder}
      name={name}
      onChange={onChangeHandler}
      required
    />
  );
};

export default Input;
