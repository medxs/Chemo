import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { registerForm } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const registerSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  role: yup.string().required(),
  password: yup.string().required().min(4).max(8),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password", "mismatch"), null]),
});

const Register = () => {
  const { error, successMsg } = useSelector((state) => state.authState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const sendInfo = (data) => {
    console.log("Send the data to server ::", data);
    dispatch(registerForm(data));
  };

  useEffect(() => {

    console.log("successMsg:", successMsg);
    if (successMsg) {
      if (error) {
        toast.error(error);
        return;
      }
      toast.success(successMsg);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  }, [error, successMsg]);

  return (
    <>
      <section className="bg-primary-green vh-100 d-flex justify-content-center align-items-center">
        <div className="container py-5">
          <div className="row py-5">
            <div className="col-md-8 col-lg-6 mx-auto">
              <div className="card ">
                <div className="card-body">
                  <div className="row my-auto">
                    <div className="col-12">
                      <div className="mb-4">
                        <h2 className="h3">Register Here</h2>
                        <p className="h5 font-weight-normal text-secondary m-0">
                          Enter your details to register
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
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Name"
                        {...register("name")}
                      />
                      {errors?.name && (
                        <p className="text-start text-danger">
                          {" "}
                          {errors.name?.message}{" "}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
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
                      <label>Select the role</label>
                      <select
                        className="form-control"
                        name="role"
                        {...register("role")}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        {...register("password")}
                      />
                      {errors?.password && (
                        <p className="text-start text-danger">
                          {" "}
                          {errors.password?.message}{" "}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        title="At least 6 characters with letters and numbers"
                        {...register("confirmPassword")}
                      />
                      {errors?.confirmPassword && (
                        <p className="text-start text-danger">
                          {" "}
                          {errors.confirmPassword?.message}{" "}
                        </p>
                      )}
                    </div>
                    <div className="form-group d-flex justify-content-center d-block">
                      <button
                        type="submit"
                        className="btn btn-success btn-lg  btn-block"
                        disabled={isDirty && !isValid}
                      >
                        Register
                      </button>
                    </div>
                    <div className="form-group d-flex justify-content-center d-block">
                      <p className="m-0">
                        Already have Account?{" "}
                        <Link to={"/login"}>Login here</Link>{" "}
                      </p>
                    </div>
                    <div className="form-group d-flex justify-content-center d-block">
                      <p className="m-0">
                        <Link className="btn btn-info" to={"/"}> Back to Home Page</Link>{" "}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
