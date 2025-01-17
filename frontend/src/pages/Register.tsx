import { ErrorMessage } from "@hookform/error-message";
import { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useConfirmEmailMutation,
  useRegisterMutation,
} from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

function Register() {
  // const [registerMutation] = useRegisterMutation();

  const [confirmEmailMutation] = useConfirmEmailMutation({});

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    confirmEmailMutation({
      variables: {
        data: {
          email: data.email,
          password: data.password,
        },
      },
      onCompleted: (result) => {
        console.log(result);
        navigate("/confirm_email");
      },
      onError: (error) => {
        console.log(error);
      },
    });

    // registerMutation({
    //   variables: {
    //     data: {
    //       email: data.email,
    //       password: data.password,
    //     },
    //   },
    //   onCompleted: (result) => {
    //     console.log(result);
    //     localStorage.setItem("token", result.register);
    //     navigate("/");
    //   },
    //   onError: (error) => {
    //     console.log(error);
    //   },
    // });
  };

  return (
    <div className="new-ad">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label className="label">
          Email:
          <input
            className="text-field"
            {...register("email", {
              required: "This field is required",
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="email"
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

        <label className="label">
          Password:
          <input
            type="password"
            className="text-field"
            {...register("password", {
              required: "This field is required",
            })}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name="password"
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

export default Register;
