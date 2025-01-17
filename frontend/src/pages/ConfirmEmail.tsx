import { ErrorMessage } from "@hookform/error-message";
import { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useConfirmEmailMutation,
  useRegisterMutation,
} from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";

type Inputs = {
  randomCode: string;
};

function ConfirmEmail() {
  const [registerMutation] = useRegisterMutation({});

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(typeof data.randomCode);
    registerMutation({
      variables: {
        data: parseFloat(data.randomCode),
      },
      onCompleted: (result) => {
        console.log(result);
        navigate("/login");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="new-ad">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label className="label">
          Enter the code we've send you here:
          <input
            className="text-field"
            type="number"
            {...register("randomCode", {
              required: "This field is required",
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="randomCode"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              );
            })
          }
        />

        <input type="submit" className="button" />
      </form>
    </div>
  );
}

export default ConfirmEmail;
