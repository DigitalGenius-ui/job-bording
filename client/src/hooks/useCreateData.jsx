import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

const useCreateData = ({ key, func }) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error, isError } = useMutation({
    mutationFn: func,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const submitData = async ({ inputData, alertMsg }) => {
    const data = inputData ? await mutateAsync(inputData) : await mutateAsync();
    toast.success(alertMsg);

    return data;
  };

  useClickError({ isError, error });

  return {
    submitData,
    isPending,
  };
};

export default useCreateData;

export const useClickError = ({ isError, error }) => {
  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [error, isError]);
};
