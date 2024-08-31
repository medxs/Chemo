import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
// import { setPatients } from '../../redux/slices/patientSlice';
import { createPatientProfile } from "../../redux/actions/patientAction";
import { patientClearMessage } from "../../redux/slices/patientSlice";

const patientSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  age: yup
    .number("Must be in Number")
    .positive("Must Value in Positive")
    .integer()
    .required("Age is requird"),
  dob: yup.string().trim().required("Date of birth is required"),
  gender: yup.string().trim().required("Gender is required"),
  mobileNo: yup
    .string()
    .trim()
    .required("Mobile No is Required.")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  email: yup.string().trim().email().required("Email ID is required."),
  occupation: yup.string().trim().required("occupation is required"),
  address: yup.string().trim().required("Address is required"),
  uhid: yup
    .number()
    .positive("Must be positive number")
    .integer()
    .required("UHID is required."),
  ip: yup
    .number()
    .positive("Must be positive number")
    .integer()
    .required("IP is required"),
  status: yup.string().trim().required("Select the Status"),
});

const CreatePatientsProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { patientErrorMsg, patientSuccessMsg } = useSelector(
    (state) => state.patientInfo
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(patientSchema),
    mode: "onChange",
  });

  const sendInfo = (data) => {
    const errCount = Object.keys(errors).length;
    if (errCount === 0) {
      dispatch(createPatientProfile(data));
    }
  };

  useEffect(() => {
    console.log("============= St");
    if (patientSuccessMsg) {
      console.log("patientErrorMsg:", patientErrorMsg);

      if (patientErrorMsg) {
        console.log("============= E");
        toast.error(patientErrorMsg);
        setTimeout(() => {
          dispatch(patientClearMessage());
        }, 100);
        return;
      }

      if (typeof patientSuccessMsg === 'string' && patientSuccessMsg.match(/Email already exist|UHID already exist|Mobile NO already exist/)) {
        toast.warn(patientSuccessMsg);
        setTimeout(() => {
          dispatch(patientClearMessage());
        }, 100);
        return;
      }

      toast.success(patientSuccessMsg);
      navigate("/dashboard");
      setTimeout(() => {
        dispatch(patientClearMessage());
      }, 100);
    }
  }, [patientSuccessMsg, patientErrorMsg]);

  return (
    <>
      <div className="container-fluid py-2">
        <h1 className="text-center">Create Patients Profile</h1>

        <div className="bg-info p-2 px-4 rounded">
          <div className="row">
            <div className="col-12">
              <h4 className="m-0 text-white text-center text-lg-left">
                General Information
              </h4>
            </div>
          </div>
        </div>

        <div className="my-3 px-md-4">
          <form onSubmit={handleSubmit(sendInfo)}>
            <div className="form-row">
              <div className="form-group  col-md-6 col-lg-3">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="form-control"
                  {...register("name")}
                />
                {errors?.name && (
                  <p className="text-start text-danger">
                    {" "}
                    {errors.name?.message}{" "}
                  </p>
                )}
              </div>
              <div className="form-group  col-md-6 col-lg-3">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  className="form-control"
                  {...register("age")}
                />
                {errors?.age && (
                  <p className="text-start text-danger">
                    {" "}
                    {errors.age?.message}{" "}
                  </p>
                )}
              </div>
              <div className="form-group  col-md-6 col-lg-3">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  {...register("dob")}
                />
                {errors?.dob && (
                  <p className="text-start text-danger">
                    {" "}
                    {errors.dob?.message}{" "}
                  </p>
                )}
              </div>
              <div className="form-group  col-md-6 col-lg-3">
                <label>Gender</label>
                <select
                  className="form-control"
                  name="gender"
                  {...register("gender")}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                {errors?.gender && (
                  <p className="text-start text-danger">
                    {" "}
                    {errors.gender?.message}{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group  col-md-6 col-lg-3">
                <label>Mobile No.</label>
                <input
                  type="number"
                  name="mobileNo"
                  className="form-control"
                  placeholder="Mobile No.."
                  {...register("mobileNo")}
                />
                {errors?.mobileNo && (
                  <p className="text-start text-danger">
                    {" "}
                    {errors.mobileNo?.message}{" "}
                  </p>
                )}
              </div>
              <div className="form-group  col-md-6 col-lg-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email..."
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="text-start text-danger">
                    {" "}
                    {errors.email?.message}{" "}
                  </p>
                )}
              </div>
              <div className="form-group  col-md-6 col-lg-3">
                <label>Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  className="form-control"
                  placeholder="Occupation..."
                  {...register("occupation")}
                />
                {errors?.occupation && (
                  <p className="text-start text-danger">
                    {" "}
                    {errors.occupation?.message}{" "}
                  </p>
                )}
              </div>
              <div className="form-group  col-md-6 col-lg-3">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Address.."
                  {...register("address")}
                />
                {errors?.address && (
                  <p className="text-start text-danger">
                    {" "}
                    {errors.address?.message}{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="form-row justify-content-md-center justify-content-lg-start">
              <div className="form-group  col-md-6 col-lg-3">
                <label>UHID No.</label>
                <input
                  type="number"
                  className="form-control"
                  name="uhid"
                  placeholder="0000 0000 0000"
                  {...register("uhid")}
                />
                {errors?.uhid && (
                  <p className="text-start text-danger">
                    {" "}
                    {errors.uhid?.message}{" "}
                  </p>
                )}
              </div>

              <div className="form-group  col-md-6 col-lg-3">
                <label>IP No.</label>
                <input
                  type="number"
                  className="form-control"
                  name="ip"
                  {...register("ip")}
                  placeholder="000 000"
                />
                {errors?.ip && (
                  <p className="text-start text-danger">
                    {" "}
                    {errors.ip?.message}{" "}
                  </p>
                )}
              </div>

              <div className="form-group  col-md-6 col-lg-3">
                <label>Admission Status</label>
                <select
                  className="form-control"
                  name="status"
                  {...register("status")}
                >
                  <option value="Ward">Ward</option>
                  <option value="Day Care">Day Care</option>
                </select>
                {errors?.status && (
                  <p className="text-start text-danger">
                    {" "}
                    {errors.status?.message}{" "}
                  </p>
                )}
              </div>
            </div>
            <div className="form-row flex-row-reverse bd-highlight justify-content-center  justify-content-lg-start">
              <button
                type="submit"
                className="btn btn-primary mx-2 px-md-5"
                disabled={isDirty && !isValid}
              >
                Submit
              </button>
              <Link
                type="button"
                className="btn btn-warning mx-2 px-md-5"
                to={"/dashboard/"}
              >
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePatientsProfile;
