import React, { useEffect, useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { addChemoDrug, addPremedicationDrug, addTakeHomeDrug, getChemoDrug, getPremedicationDrug, updatePremedicaitonDrug, updateTakeHomeDrug } from '../../redux/actions/drugAction';
import { updateChemoDrug } from '../../redux/actions/drugAction'

import { premedicationClearMessages } from '../../redux/slices/preDrugSlice';
import { chemoClearMessages } from '../../redux/slices/chemoDrugSlice';
import { takeHomeClearMessages } from '../../redux/slices/takeHomeDrugSlice';


// import all form validation schema 
const {
    premedicationFromValidateSchema, chemoFormValidateSchema, takeHomeFormValidateSchema
} = require('../doctorComponents/AllValidation')


// ********************** Premedication Form Part Start ************************
// premedication single record insert record form 
export function PremedicationInsertForm({ preData, setPreData }) {

    const dispatch = useDispatch();

    //connect to store , fetct premedication data from Database
    const { isPreAddSuccessMsg, isPreAddErrorMsg } = useSelector((state) => state?.preDrugData);

    // const [closeModal, setCloseModal] = useState(false);
    // function handleCloseModal() {
    //     document.getElementById("PremedicationForm").classList.remove("show", "d-block");
    //     document.querySelectorAll(".modal-backdrop").forEach(el => el.classList.remove("modal-backdrop"));
    // }

    const {
        register: preRegister,
        reset: preReset,
        handleSubmit: preInsertHandleSubmit,
        formState: { errors: preError, isValid: preIsValid, isDirty: preIsDirty },
        clearErrors,
    } = useForm({
        resolver: yupResolver(premedicationFromValidateSchema),
        mode: "onChange",
    });

    const handleErrorClearForm = () => { clearErrors(); }




    const sendPreData = (data) => {
        const errCount = Object.keys(preError).length;
        if (errCount === 0) {
            dispatch(addPremedicationDrug(data))
        }
    };

    useEffect(() => {
        if (isPreAddSuccessMsg) {
            if (isPreAddErrorMsg) {
                toast.error(isPreAddErrorMsg)
                setTimeout(() => {
                    dispatch(premedicationClearMessages())
                }, 100)
                return;
            }

            if (isPreAddSuccessMsg.match("Drug")) {
                toast.warn(isPreAddSuccessMsg)
                setTimeout(() => {
                    dispatch(premedicationClearMessages())
                }, 100)
                return;
            }

            toast.success(isPreAddSuccessMsg)
            preReset();
            setTimeout(() => {
                dispatch(premedicationClearMessages())
            }, 100)
        }
    }, [isPreAddSuccessMsg, isPreAddErrorMsg])

    return (
        <>
            <div
                className="modal fade"
                id="PremedicationForm"
                data-backdrop="static"
                data-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
                {/* {!closeModal && */}
                <div className="modal-dialog modal-xl">

                    <div className="modal-content">
                        <form onSubmit={preInsertHandleSubmit(sendPreData)}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">
                                    Add Drug Items Into Premedication Library
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleErrorClearForm}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid p-0">
                                    <div className="form-row">
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Drug Type</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="INJ, TAB, SYP, CAP"
                                                {...preRegister("drugType")}
                                                name="drugType"
                                            />
                                            {preError?.drugType && (
                                                <p className="text-start text-danger">
                                                    {preError.drugType?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Drug Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Drug name.."
                                                {...preRegister("drugName")}
                                                name="drugName"
                                            />
                                            {preError?.drugName && (
                                                <p className="text-start text-danger">
                                                    {preError?.drugName?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Brand Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Brand Name.."
                                                {...preRegister("brandName")}
                                                name="brandName"
                                            />
                                            {preError?.brandName && (
                                                <p className="text-start text-danger">
                                                    {preError.brandName?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Dose Value</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Dose value.."
                                                {...preRegister("doseValue")}
                                            />
                                            {preError?.doseValue && (
                                                <p className="text-start text-danger">
                                                    {preError.doseValue?.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Unit</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Unit...."
                                                {...preRegister("unit")}
                                            />
                                            {preError?.unit && (
                                                <p className="text-start text-danger">
                                                    {preError.unit?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Duration (days)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Duration in days.."
                                                {...preRegister("duration")}
                                            />
                                            {preError?.duration && (
                                                <p className="text-start text-danger">
                                                    {preError.duration?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Frequency</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="0 1 0"
                                                {...preRegister("frequency")}
                                            />
                                            {preError?.frequency && (
                                                <p className="text-start text-danger">
                                                    {preError.frequency?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Administraion Details</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Details...."
                                                {...preRegister("details")}
                                            />
                                            {preError?.details && (
                                                <p className="text-start text-danger">
                                                    {preError.details?.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                    onClick={handleErrorClearForm}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={preIsDirty && !preIsValid}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* } */}
            </div>
        </>

    )

}


// Premedication Update form 

export const PremedicationUpdateForm = ({ preDrugPerPage, item, preData, setPreData, showPreModel, handlePreModelClose, handlePreModelShow, setShowPreModel, currentPrePage }) => {

    const { isPreUpdateSuccessMsg, isPreUpdateErrorMsg } = useSelector((state) => state?.preDrugData);
    const dispatch = useDispatch();
    const [errorsData, setErrors] = useState({})
    const [data, setData] = useState({
        drugType: '',
        drugName: '',
        brandName: '',
        doseValue: '',
        unit: '',
        duration: '',
        frequency: '',
        details: '',
    })

    useEffect(() => {
        if (item) {
            setData({
                drugType: item.drugType,
                drugName: item.drugName,
                brandName: item.brandName,
                doseValue: item.doseValue,
                unit: item.unit,
                duration: item.duration,
                frequency: item.frequency,
                details: item.details,
            })
        }
    }, [item])

    useEffect(() => {
        if (isPreUpdateSuccessMsg) {
            if (isPreUpdateErrorMsg) {
                toast.error(isPreUpdateErrorMsg, {
                    // delay: 1000,
                    // hideProgressBar: true
                });
                setTimeout(() => {
                    dispatch(premedicationClearMessages())
                }, 100)
                return;
            }

            if (isPreUpdateSuccessMsg.match("Drug")) {
                toast.warn(isPreUpdateSuccessMsg)
                setTimeout(() => {
                    dispatch(premedicationClearMessages())
                }, 100)
                return;
            }

            toast.success(isPreUpdateSuccessMsg, {
                // delay: 1000,
                // hideProgressBar: true
            });
            setData({
                drugType: '',
                drugName: '',
                brandName: '',
                doseValue: '',
                unit: '',
                duration: '',
                frequency: '',
                details: '',
            })

            setTimeout(() => {
                dispatch(premedicationClearMessages())
            }, 100)
            handleClearError();
        }
    }, [isPreUpdateSuccessMsg, isPreUpdateErrorMsg])


    const handleClearError = () => {
        setErrors({});
        handlePreModelClose();
    }

    const handleSubmitTest = async (e) => {
        e.preventDefault();
        try {
            await premedicationFromValidateSchema.validate(data, { abortEarly: false });
            dispatch(updatePremedicaitonDrug(item._id, preDrugPerPage, currentPrePage, data))
            setErrors({});
            // handleClearError();
        } catch (validationErrors) {
            const formattedErrors = {};
            if (validationErrors && Array.isArray(validationErrors.inner)) {
                validationErrors.inner.forEach(error => {
                    formattedErrors[error.path] = error.message;
                });
                setErrors(formattedErrors);
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }


    return (
        <>
            {/* ================= Premedication Edit form ========= */}
            <div
                className={`modal fade ${showPreModel ? 'show' : ''}`} tabIndex="-1" role="dialog"
                style={{ display: showPreModel ? 'block' : 'none', backgroundColor: 'rgb(0 0 0 / 50%)' }}
            >

                <div className="modal-dialog modal-xl">

                    <div className="modal-content" >
                        {/* onSubmit={handlePreDataUpdateOnSubmit} */}
                        <form onSubmit={handleSubmitTest}   >
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">
                                    Update Drug Item Into Premedication Library
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleClearError}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid p-0">
                                    <div className="form-row">
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Drug Type</label>
                                            <input
                                                id='drugType'
                                                type="text"
                                                className="form-control"
                                                placeholder="INJ, TAB, SYP, CAP"
                                                name="drugType"
                                                value={data.drugType}
                                                onChange={handleChange}
                                                readOnly
                                            />
                                            {errorsData?.drugType && <span className='text-danger'> {errorsData.drugType}</span>}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Drug Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Drug name.."
                                                name="drugName"
                                                value={data.drugName}
                                                onChange={handleChange}
                                                readOnly
                                            />
                                            {errorsData?.drugName && <span className='text-danger'> {errorsData.drugName}</span>}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Brand Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Brand Name.."
                                                name="brandName"
                                                value={data.brandName}
                                                onChange={handleChange}

                                            />
                                            {errorsData?.brandName && <span className='text-danger'> {errorsData.brandName}</span>}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Dose Value</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Dose value.."
                                                name='doseValue'
                                                value={data.doseValue}
                                                onChange={handleChange}
                                            />

                                            {errorsData.doseValue && <span className='text-danger'> {errorsData.doseValue}</span>}
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Unit</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Unit...."
                                                value={data.unit}
                                                name='unit'
                                                onChange={handleChange}

                                            />
                                            {errorsData.unit && <span className='text-danger'> {errorsData.unit}</span>}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Duration (days)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Duration in days.."
                                                value={data.duration}
                                                name='duration'
                                                onChange={handleChange}

                                            />
                                            {errorsData.duration && <span className='text-danger'> {errorsData.duration}</span>}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Frequency</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="0 1 0" name='frequency'
                                                value={data.frequency}
                                                onChange={handleChange}

                                            />
                                            {errorsData.frequency && <span className='text-danger'> {errorsData.frequency}</span>}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Administraion Details</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Details...."
                                                value={data.details}
                                                name='details'
                                                onChange={handleChange}
                                            />
                                            {errorsData.details && <span className='text-danger'> {errorsData.details}</span>}

                                            {/* {detailsError && (
                                                <p className="text-start text-danger">
                                                    {detailsError}
                                                </p>
                                            )} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                    onClick={handleClearError}
                                >
                                    Close
                                </button>
                                <button
                                    data-dismiss={Object.keys(errorsData).length == 0 && "modal"}
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
// ****************** Premedication Form Part End ************************


// ****************** Chemo Form Part Start ************************
// chemo single record  insert record form 
export function ChemoInsertForm({ chemoData, setChemoData }) {
    const { isChemoAddSuccessMsg, isChemoAddErrorMsg } = useSelector((state) => state?.chemoDrugData);

    const dispatch = useDispatch()
    const {
        register: chemoRegister,
        reset: chemoReset,
        handleSubmit: handleSubmitB,
        formState: {
            errors: chemoError,
            isValid: chemoIsValid,
            isDirty: chemoIsDirty,
        },
        clearErrors,
    } = useForm({
        resolver: yupResolver(chemoFormValidateSchema),
        mode: "onChange",
    });

    const handleErrorClearForm = () => {
        clearErrors();
    }

    useEffect(() => {
        if (isChemoAddSuccessMsg) {
            if (isChemoAddErrorMsg) {
                toast.error(isChemoAddErrorMsg)
                setTimeout(() => {
                    dispatch(chemoClearMessages())
                }, 100)
                return;
            }

            if (isChemoAddSuccessMsg.match("Drug")) {
                toast.warn(isChemoAddSuccessMsg)
                setTimeout(() => {
                    dispatch(chemoClearMessages())
                }, 100)
                return;
            }

            toast.success(isChemoAddSuccessMsg)
            chemoReset();
            setTimeout(() => {
                dispatch(chemoClearMessages())
            }, 100)
        }
    }, [isChemoAddSuccessMsg, isChemoAddErrorMsg])


    const sendChemoData = (data) => {
        // console.log("Send the data Chemo to server from chemo ::", data);
        const errCount = Object.keys(chemoError).length;
        if (errCount === 0) {
            dispatch(addChemoDrug(data))
        }
    };

    return (
        <>
            {/* ================= Chemotherapy form ========= */}
            <div
                className="modal fade"
                id="ChemotherapyForm"
                data-backdrop="static"
                data-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <form onSubmit={handleSubmitB(sendChemoData)}>
                            <div className="modal-header" >
                                <h5 className="modal-title" id="staticBackdropLabel">
                                    Add Drug Items Into Chemotherapy Library
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleErrorClearForm}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid p-0">
                                    <form>
                                        <div className="form-row">
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Drug Type</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="INJ, TAB, SYP, CAP"
                                                    {...chemoRegister("drugType")}
                                                    name="drugType"
                                                />
                                                {chemoError?.drugType && (
                                                    <p className="text-start text-danger">
                                                        {chemoError.drugType?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Drug Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Drug name.."
                                                    {...chemoRegister("drugName")}
                                                    name="drugName"
                                                />
                                                {chemoError?.drugName && (
                                                    <p className="text-start text-danger">
                                                        {chemoError.drugName?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Dose Range Value(A)</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Dose value A.."
                                                    {...chemoRegister("doseRangeA")}
                                                    name="doseRangeA"
                                                />
                                                {chemoError?.doseRangeA && (
                                                    <p className="text-start text-danger">
                                                        {chemoError.doseRangeA?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Dose Range Value(B)</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Dose value B.."
                                                    {...chemoRegister("doseRangeB")}
                                                    name="doseRangeB"
                                                />
                                                {chemoError?.doseRangeB && (
                                                    <p className="text-start text-danger">
                                                        {chemoError.doseRangeB?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Unit</label>
                                                <select
                                                    className="form-control"
                                                    name="doseUnit"
                                                    {...chemoRegister("doseUnit")}
                                                >
                                                    <option value="AUC">AUC</option>
                                                    <option value="mg">mg</option>
                                                    <option value="mg/m2">mg/m2</option>
                                                    <option value="mg/kg">mg/kg</option>
                                                </select>
                                                {chemoError?.doseUnit && (
                                                    <p className="text-start text-danger">
                                                        {chemoError.doseUnit?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Dilution Volume(ml)</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Value in ml...."
                                                    {...chemoRegister("dilution")}
                                                    name="dilution"
                                                />
                                                {chemoError?.dilution && (
                                                    <p className="text-start text-danger">
                                                        {chemoError.dilution?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Dose Percentage(%)</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="percentage %.."
                                                    {...chemoRegister("dosePct")}
                                                    name="dosePct"
                                                />
                                                {chemoError?.dosePct && (
                                                    <p className="text-start text-danger">
                                                        {chemoError.dosePct?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Brand Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Brand name.."
                                                    {...chemoRegister("brandName")}
                                                    name="brandName"
                                                />
                                                {chemoError?.brandName && (
                                                    <p className="text-start text-danger">
                                                        {chemoError.brandName?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Route</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Route...."
                                                    {...chemoRegister("route")}
                                                    name="route"
                                                />
                                                {chemoError?.route && (
                                                    <p className="text-start text-danger">
                                                        {chemoError.route?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Duration(hrs) </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="hrs.."
                                                    {...chemoRegister("duration")}
                                                    name="duration"
                                                />
                                                {chemoError?.duration && (
                                                    <p className="text-start text-danger">
                                                        {chemoError.duration?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Administraion Details</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Details...."
                                                    {...chemoRegister("details")}
                                                    name="details"
                                                />
                                                {chemoError?.details && (
                                                    <p className="text-start text-danger">
                                                        {chemoError.details?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={chemoIsDirty && !chemoIsValid}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

// chemo single record update record form 
export const ChemoUpdateForm = ({ chemoDrugPerPage, currentChemoPage, item, chemoData, setChemoData, showChemoModel, handleChemoModelClose, handleChemoModelShow, setShowChemoModel }) => {

    const { isChemoUpdateSuccessMsg, isChemoUpdateErrorMsg } = useSelector((state) => state?.chemoDrugData);

    const dispatch = useDispatch();
    const [errorsData, setErrors] = useState({})
    const [data, setData] = useState({
        drugType: '',
        drugName: '',
        doseRangeA: '',
        doseRangeB: '',
        doseUnit: '',
        dilution: '',
        dosePct: '',
        brandName: '',
        route: '',
        duration: '',
        details: ''
    })

    useEffect(() => {
        if (item) {
            setData({
                drugType: item.drugType,
                drugName: item.drugName,
                doseRangeA: item.doseRangeA,
                doseRangeB: item.doseRangeB,
                doseUnit: item.doseUnit,
                dilution: item.dilution,
                dosePct: item.dosePct,
                brandName: item.brandName,
                route: item.route,
                duration: item.duration,
                details: item.details,
            })
        }
    }, [item])


    useEffect(() => {
        if (isChemoUpdateSuccessMsg) {
            if (isChemoUpdateErrorMsg) {
                toast.error(isChemoUpdateErrorMsg, {
                    // delay: 1000,
                    // hideProgressBar: true
                });
                setTimeout(() => {
                    dispatch(chemoClearMessages())
                }, 100)
                return;
            }

            if (isChemoUpdateSuccessMsg.match("Drug")) {
                toast.warn(isChemoUpdateSuccessMsg)
                setTimeout(() => {
                    dispatch(chemoClearMessages())
                }, 100)
                return;
            }

            toast.success(isChemoUpdateSuccessMsg, {
                // delay: 1000,
                // hideProgressBar: true
            });
            setData({
                drugType: '',
                drugName: '',
                doseRangeA: '',
                doseRangeB: '',
                doseUnit: '',
                dilution: '',
                dosePct: '',
                brandName: '',
                route: '',
                duration: '',
                details: '',
            })
            setTimeout(() => {
                dispatch(chemoClearMessages())
            }, 100)
            handleClearError();
        }
    }, [isChemoUpdateSuccessMsg, isChemoUpdateErrorMsg])


    const handleClearError = () => {
        setErrors({});
        handleChemoModelClose();
    }

    const handleSubmitChemoTest = async (e) => {
        e.preventDefault();
        try {
            await chemoFormValidateSchema.validate(data, { abortEarly: false });
            dispatch(updateChemoDrug(item._id, currentChemoPage, chemoDrugPerPage, data))
            setErrors({});
        } catch (validationErrors) {
            const formattedErrors = {};
            if (validationErrors && Array.isArray(validationErrors.inner)) {
                validationErrors.inner.forEach(error => {
                    formattedErrors[error.path] = error.message;
                });
                setErrors(formattedErrors);
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const dropdownList = ["AUC", "mg", "mg/m2", "mg/kg"];


    return (
        <>
            {/* ================= Premedication Edit form ========= */}
            <div
                // className="modal fade"
                // id="ChemotherapyUpdateForm"
                // data-backdrop="static"
                // data-keyboard="false"
                // tabIndex="-1"
                // aria-labelledby="staticBackdropLabel"
                // aria-hidden="true"

                className={`modal fade ${showChemoModel ? 'show' : ''}`} tabIndex="-1" role="dialog"
                style={{ display: showChemoModel ? 'block' : 'none', backgroundColor: 'rgb(0 0 0 / 50%)' }}

            >
                <div className="modal-dialog modal-xl">

                    <div className="modal-content" >
                        {/* onSubmit={handlePreDataUpdateOnSubmit} */}
                        <form onSubmit={handleSubmitChemoTest}   >
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">
                                    Update Drug Item Into Chemotherapy Library
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleClearError}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid p-0">
                                    <div className="form-row">
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Drug Type</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="INJ, TAB, SYP, CAP"
                                                name="drugType"
                                                onChange={handleChange}
                                                value={data.drugType}
                                                readOnly
                                            />
                                            {errorsData?.drugType && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.drugType}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Drug Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Drug name.."
                                                name="drugName"
                                                value={data.drugName}
                                                onChange={handleChange}
                                                readOnly
                                            />
                                            {errorsData?.drugName && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.drugName}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Dose Range Value(A)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Dose value A.."
                                                name="doseRangeA"
                                                value={data.doseRangeA}
                                                onChange={handleChange}

                                            />
                                            {errorsData?.doseRangeA && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.doseRangeA}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Dose Range Value(B)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Dose value B.."
                                                name="doseRangeB"
                                                value={data.doseRangeB}
                                                onChange={handleChange}
                                                step="any"

                                            />
                                            {errorsData?.doseRangeB && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.doseRangeB}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Unit</label>
                                            <select
                                                className="form-control"
                                                name="doseUnit"
                                                onChange={handleChange}
                                                value={data?.doseUnit}
                                                placeholder="gks"
                                            >

                                                {dropdownList.map((unit) => (
                                                    <option key={unit} >
                                                        {unit} {console.log("data.doseUnit: ", data.doseUnit)}
                                                    </option>
                                                ))}


                                                {/* <option value={data.doseUnit} >{data.doseUnit}</option>
                                                <option value="AUC">AUC</option>
                                                <option value="mg">mg</option>
                                                <option value="mg/m2">mg/m2</option>
                                                <option value="mg/kg">mg/kg</option> */}
                                            </select>
                                            {errorsData?.doseUnit && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.doseUnit}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Dilution Volume(ml)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Value in ml...."
                                                name="dilution"
                                                value={data.dilution}
                                                onChange={handleChange}

                                            />
                                            {errorsData?.dilution && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.dilution}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Dose Percentage(%)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="percentage %.."
                                                name="dosePct"
                                                value={data.dosePct}
                                                onChange={handleChange}

                                            />
                                            {errorsData?.dosePct && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.dosePct}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Brand Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Brand name.."
                                                name="brandName"
                                                value={data.brandName}
                                                onChange={handleChange}
                                            />
                                            {errorsData?.brandName && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.brandName}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Route</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Route...."
                                                name="route"
                                                value={data.route}
                                                onChange={handleChange}

                                            />
                                            {errorsData?.route && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.route}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Duration(hrs) </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="hrs.."
                                                name="duration"
                                                value={data.duration}
                                                onChange={handleChange}

                                            />
                                            {errorsData?.duration && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.duration}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Administraion Details</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Details...."
                                                name="details"
                                                value={data.details}
                                                onChange={handleChange}

                                            />
                                            {errorsData?.details && (
                                                <p className="text-start text-danger">
                                                    {errorsData.details}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                    onClick={handleClearError}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
// ****************** Chemo Form Part End ************************


// ****************** Take Home Form Part Start ************************
// Take home single record  insert record form 

export function TakeHomeInsertForm({ takeHomeData, setTakeHomeData }) {

    const { isTakeHomeAddSuccessMsg, isTakeHomeAddErrorMsg } = useSelector((state) => state?.takeHomeDrugData);

    const dispatch = useDispatch();

    const {
        register: takeHomeRegister,
        reset: takeHomeReset,
        handleSubmit: handleSubmitC,
        formState: {
            errors: takeHomeError,
            isValid: takeHomeIsValid,
            isDirty: takeHomeIsDirty,
        },
        clearErrors,
    } = useForm({
        resolver: yupResolver(takeHomeFormValidateSchema),
        mode: "onChange",
    });

    const handleErrorClearForm = () => {
        clearErrors();
    }


    useEffect(() => {
        if (isTakeHomeAddSuccessMsg) {
            if (isTakeHomeAddErrorMsg) {
                toast.error(isTakeHomeAddErrorMsg)
                setTimeout(() => {
                    dispatch(takeHomeClearMessages())
                }, 100)
                return;
            }

            if (isTakeHomeAddSuccessMsg.match("Drug")) {
                toast.warn(isTakeHomeAddSuccessMsg)
                setTimeout(() => {
                    dispatch(takeHomeClearMessages())
                }, 100)
                return;
            }

            toast.success(isTakeHomeAddSuccessMsg);
            takeHomeReset();
            setTimeout(() => {
                dispatch(takeHomeClearMessages())
            }, 100)
        }
    }, [isTakeHomeAddSuccessMsg, isTakeHomeAddErrorMsg])

    const sendTakeHomeData = (data) => {
        const ErrorCount = Object.keys(takeHomeError).length
        if (ErrorCount === 0) {
            dispatch(addTakeHomeDrug(data))
        }
    };

    return (
        <>
            <div
                className="modal fade"
                id="TakeHomeMedicationForm"
                data-backdrop="static"
                data-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <form onSubmit={handleSubmitC(sendTakeHomeData)}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">
                                    Add Drug Items into Take Home Medication Library
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleErrorClearForm}

                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="form-row">
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Drug Type</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="INJ, TAB, SYP, CAP"
                                                {...takeHomeRegister("drugType")}
                                                name="drugType"
                                            />
                                            {takeHomeError?.drugType && (
                                                <p className="text-start text-danger">
                                                    {takeHomeError.drugType?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Drug Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Drug name.."
                                                {...takeHomeRegister("drugName")}
                                                name="drugName"
                                            />
                                            {takeHomeError?.drugName && (
                                                <p className="text-start text-danger">
                                                    {takeHomeError.drugName?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Brand Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Brand Name.."
                                                {...takeHomeRegister("brandName")}
                                                name="brandName"
                                            />
                                            {takeHomeError?.brandName && (
                                                <p className="text-start text-danger">
                                                    {takeHomeError.brandName?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Dose Value</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Dose value.."
                                                {...takeHomeRegister("doseValue")}
                                            />
                                            {takeHomeError?.doseValue && (
                                                <p className="text-start text-danger">
                                                    {takeHomeError.doseValue?.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Unit</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Unit...."
                                                {...takeHomeRegister("unit")}
                                            />
                                            {takeHomeError?.unit && (
                                                <p className="text-start text-danger">
                                                    {takeHomeError.unit?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Duration (days)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Duration in days.."
                                                {...takeHomeRegister("duration")}
                                            />
                                            {takeHomeError?.duration && (
                                                <p className="text-start text-danger">
                                                    {takeHomeError.duration?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Frequency</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="0 1 0"
                                                {...takeHomeRegister("frequency")}
                                            />
                                            {takeHomeError?.frequency && (
                                                <p className="text-start text-danger">
                                                    {takeHomeError.frequency?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Administraion Details</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Details...."
                                                {...takeHomeRegister("details")}
                                            />
                                            {takeHomeError?.details && (
                                                <p className="text-start text-danger">
                                                    {takeHomeError.details?.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                    onClick={handleErrorClearForm}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={takeHomeIsDirty && !takeHomeIsValid}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

// take home single record update record form 
export function TakeHomeUpdateForm({ takeHomeDrugPerPage, currentTakeHomePage, item, takeHomeData, setTakeHomeData, showTakeHomeModel, handleTakeHomeModelClose, handleTakeHomeModelShow, setShowTakeHomeModel }) {

    const { isTakeHomeUpdateSuccessMsg, isTakeHomeUpdateErrorMsg } = useSelector((state) => state?.takeHomeDrugData);
    const dispatch = useDispatch();
    const [errorsData, setErrors] = useState({})
    const [data, setData] = useState({
        drugType: '',
        drugName: '',
        brandName: '',
        doseValue: '',
        unit: '',
        duration: '',
        frequency: '',
        details: '',
    })

    useEffect(() => {
        if (item) {
            setData({
                drugType: item.drugType,
                drugName: item.drugName,
                brandName: item.brandName,
                doseValue: item.doseValue,
                unit: item.unit,
                duration: item.duration,
                frequency: item.frequency,
                details: item.details,
            })
        }
    }, [item])

    console.log("TakeHomeUpdateForm currentTakeHomePage:", currentTakeHomePage);
    console.log("TakeHomeUpdateForm takeHomeDrugPerPage:", takeHomeDrugPerPage);
    useEffect(() => {
        if (isTakeHomeUpdateSuccessMsg) {
            if (isTakeHomeUpdateErrorMsg) {
                toast.error(isTakeHomeUpdateErrorMsg, {
                    // delay: 1000,
                    // hideProgressBar: true
                });
                setTimeout(() => {
                    dispatch(takeHomeClearMessages())
                }, 100)
                return;
            }

            if (isTakeHomeUpdateSuccessMsg.match("Drug")) {
                toast.warn(isTakeHomeUpdateSuccessMsg)
                setTimeout(() => {
                    dispatch(takeHomeClearMessages())
                }, 100)
                return;
            }


            toast.success(isTakeHomeUpdateSuccessMsg, {
                // delay: 1000,
                // hideProgressBar: true
            });
            // clear the input field
            setData({
                drugType: '',
                drugName: '',
                brandName: '',
                doseValue: '',
                unit: '',
                duration: '',
                frequency: '',
                details: '',
            })
            setTimeout(() => {
                dispatch(takeHomeClearMessages())
            }, 100)
            handleClearError();
        }
    }, [isTakeHomeUpdateSuccessMsg, isTakeHomeUpdateErrorMsg])


    const handleClearError = () => {
        setErrors({});
        handleTakeHomeModelClose();
    }

    const handleSubmitTakeHomeUpdate = async (e) => {
        e.preventDefault();
        try {
            await takeHomeFormValidateSchema.validate(data, { abortEarly: false });
            console.log("takeHomeDrugPerPage currentTakeHomePage:", takeHomeDrugPerPage, currentTakeHomePage);
            dispatch(updateTakeHomeDrug(item._id, takeHomeDrugPerPage, currentTakeHomePage, data));
            setErrors({});
        } catch (validationErrors) {
            const formattedErrors = {};
            if (validationErrors && Array.isArray(validationErrors.inner)) {
                validationErrors.inner.forEach(error => {
                    formattedErrors[error.path] = error.message;
                });
                setErrors(formattedErrors);
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    return (
        <>
            <div
                // className="modal fade"
                // id="TakeHomeUpdateForm"
                // data-backdrop="static"
                // data-keyboard="false"
                // tabIndex="-1"
                // aria-labelledby="staticBackdropLabel"
                // aria-hidden="true"
                className={`modal fade ${showTakeHomeModel ? 'show' : ''}`} tabIndex="-1" role="dialog"
                style={{ display: showTakeHomeModel ? 'block' : 'none', backgroundColor: 'rgb(0 0 0 / 50%)' }}

            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <form onSubmit={handleSubmitTakeHomeUpdate}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">
                                    Update Drug Item into Take Home Medication Library
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleClearError}

                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="form-row">
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Drug Type</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="INJ, TAB, SYP, CAP"
                                                name="drugType"
                                                value={data.drugType}
                                                onChange={handleChange}

                                            />
                                            {errorsData?.drugType && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.drugType}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Drug Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Drug name.."
                                                name="drugName"
                                                value={data.drugName}
                                                onChange={handleChange}

                                            />
                                            {errorsData?.drugName && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.drugName}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Brand Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Brand Name.."
                                                name="brandName"
                                                value={data.brandName}
                                                onChange={handleChange}
                                            />
                                            {errorsData?.brandName && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.brandName}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Dose Value</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Dose value.."
                                                name='doseValue'
                                                value={data.doseValue}
                                                onChange={handleChange}
                                            />
                                            {errorsData?.doseValue && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.doseValue}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Unit</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Unit...."
                                                value={data.unit}
                                                name='unit'
                                                onChange={handleChange}
                                            />
                                            {errorsData?.unit && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.unit}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Duration (days)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Duration in days.."
                                                value={data.duration}
                                                name='duration'
                                                onChange={handleChange}
                                            />
                                            {errorsData?.duration && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.duration}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Frequency</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="0 1 0"
                                                value={data.frequency}
                                                name='frequency'
                                                onChange={handleChange}
                                            />
                                            {errorsData?.frequency && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.frequency}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Administraion Details</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Details...."
                                                value={data.details}
                                                name='details'
                                                onChange={handleChange}
                                            />
                                            {errorsData?.details && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.details}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                    onClick={handleClearError}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
// ****************** Take Home Form Part End ************************
