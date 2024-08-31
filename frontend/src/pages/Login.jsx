import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authAction";
import { registerClearMsg } from "../redux/slices/authSlice";

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(4).max(8),
});

const Login = () => {
  const { isAuthenticated, error, message } = useSelector(
    (state) => state.authState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const sendInfo = (data) => {
    console.log("Send the data to server ::", data);
    dispatch(login(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setTimeout(() => {
        dispatch(registerClearMsg());
      }, 100);
      return;
    }

    if (isAuthenticated) {
      toast.success(message);
      setTimeout(() => {
        dispatch(registerClearMsg());
        navigate("/dashboard");
      }, 1000);

      return;
    }
  }, [isAuthenticated, error, message]);

  return (
    <>
      <section className="bg-primary-green vh-100 d-flex justify-content-center align-items-center">
        <div className="container py-5">
          <div className="row ">
            <div className="col-md-12">
              <div className="row ">
                <div className="col-md-8 col-lg-6 mx-auto ">
                  <div className="card">
                    <div className="card-body ">
                      <div className="row my-auto">
                        <div className="col-12">
                          <div className="mb-4">
                            <h2 className="h3">Login Here</h2>
                            <p className="h5 font-weight-normal text-secondary m-0">
                              Enter your details to login
                            </p>
                          </div>
                        </div>
                      </div>
                      <form
                        className="form"
                        onSubmit={handleSubmit(sendInfo)}
                        autoComplete="off"
                      >
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="email@gmail.com"
                            {...register("email")}
                          />
                          {errors?.email && (
                            <p className="text-start text-danger">
                              {" "}
                              {errors.email?.message}{" "}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="password"
                            {...register("password")}
                          />
                          {errors?.password && (
                            <p className="text-start text-danger">
                              {" "}
                              {errors.password?.message}{" "}
                            </p>
                          )}
                        </div>
                        <div className="form-group d-flex justify-content-center d-block">
                          <button
                            type="submit"
                            className="btn btn-success btn-lg  btn-block"
                            disabled={isDirty && !isValid}
                          >
                            Login
                          </button>
                        </div>
                        <div className="form-group d-flex justify-content-center d-block">
                          <p>
                            Don't have an Account ?{" "}
                            <Link to={"/register"}>Signin here</Link>{" "}
                          </p>

                        </div>
                        <div className="form-group d-flex justify-content-center d-block">
                          <p className="m-0">
                            <Link  className="btn btn-info" to={"/"}> Back to Home Page</Link>{" "}
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
