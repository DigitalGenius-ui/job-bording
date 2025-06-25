import Input from "../util/Input/Input";
import { signUp } from "../../api-calls/auth-api";
import { UserContext } from "../../Context/Context";
import { Box, CircularProgress } from "@mui/material";
import Select from "../util/Select/Select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerValidSchemas } from "../../schemas/auth-schema";
import FormError from "../../utils/FormError";
import { AUTH_KEYS } from "../../constants/query-keys";
import useCreateData from "../../hooks/useCreateData";

const Register = () => {
  const { setActiveForm } = UserContext();

  const { submitData, isPending } = useCreateData({
    key: [AUTH_KEYS],
    func: signUp,
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerValidSchemas),
    defaultValues: {
      email: "admin@gmail.com",
      fullName: "admin",
      confirmPassword: "admin@123",
      password: "admin@123",
      signupAs: "Employer",
      acceptTerm: true,
    },
  });

  const submitHandler = async (values) => {
    await submitData({
      inputData: values,
      alertMsg: "User is registred successfully!",
    });
    setActiveForm(true);
  };

  return (
    <>
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold">Create your Account!</h1>
        <p className="pt-2 text-gray-500">
          If you Have an Account
          <span className="text-orang cursor-pointer"> Login</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col px-3 lg:px-6 gap-4"
      >
        <Input
          type="text"
          placeHolder="User Name"
          register={register}
          name="fullName"
          errors={errors}
        />
        <Input
          type="email"
          placeHolder="Email Address"
          register={register}
          name="email"
          errors={errors}
        />
        <Input
          type="password"
          placeHolder="Password"
          register={register}
          name="password"
          errors={errors}
        />
        <Input
          type="password"
          placeHolder="Repeat Password"
          register={register}
          name="confirmPassword"
          errors={errors}
        />

        <Select
          placeHolder="Sign UpAs..."
          data={["Employer", "Candidate"]}
          form="auth"
          setValue={setValue}
          name="signupAs"
          errors={errors}
          errorMsg={"Please choose you account type!"}
        />

        <div className="flex items-center gap-2 flex-wrap text-sm md:text-md">
          <input
            {...register("acceptTerm")}
            name="acceptTerm"
            type="checkbox"
          />
          I Have Read and Agree to the
          <span className="text-orang cursor-pointer">Terms & Conditions</span>
          <FormError errors={errors} name={"acceptTerm"} classname={"-mt-3"} />
        </div>

        <button
          type="submit"
          className={`bg-orang w-full py-3 mb-4 rounded-md text-white
        hover:bg-orange-400 flex items-center justify-center gap-2
        ${isPending && "pointer-events-none"}`}
        >
          {isPending && (
            <Box sx={{ display: "flex", marginTop: "0.2rem" }}>
              <CircularProgress size="1rem" />
            </Box>
          )}
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
