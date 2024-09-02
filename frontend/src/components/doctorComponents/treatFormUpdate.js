import moment, { monthsShort } from "moment";
import { useEffect, useRef, useState } from "react";
import { chemotherapyTreatmentFromValidateSchema, premedicationTreatmentFromValidateSchema, takeHomeTreatmentFromValidateSchema } from "./AllValidation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { toast } from "react-toastify";
export const PremedicationTreatmentUpdateForm = ({ item, handleGetUpdatedPremedicationData, showPreModel, handlePreModelClose, handlePreModelShow, setShowPreModel }) => {

    // const { isPreUpdateSuccessMsg, isPreUpdateErrorMsg } = useSelector((state) => state?.preDrugData);
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
        startTime: '',
        endTime: ''
    });

    function preSetData() {
        setData({
            _id: item._id,
            drugType: item.drugType,
            drugName: item.drugName,
            brandName: item.brandName,
            doseValue: item.doseValue,
            unit: item.unit,
            duration: item.duration,
            frequency: item.frequency,
            details: item.details,
            startTime: item.startTime ? moment(item.startTime).format('YYYY-MM-DD') : '',
            endTime: item.endTime ? moment(item.endTime).format('YYYY-MM-DD') : ''
        })
    }
    useEffect(() => {
        if (item) {
            preSetData();
        }
    }, [item]);

    const handleClearError = () => {
        setErrors({});
        preSetData();
        handlePreModelClose();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const handlePreDataUpdateOnSubmit = async (e) => {

        try {
            e.preventDefault();
            await premedicationTreatmentFromValidateSchema.validate(data, { abortEarly: false });
            handleGetUpdatedPremedicationData(data);
            setErrors({});
            toast.success("Update in Local Storage")
            handleClearError();
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

    return (
        <>
            <>



                <>
                    {/* ================= Premedication Edit form ========= */}
                    <div
                        // className="modal fade"
                        // id="PremedicationForm"
                        // data-backdrop="static"
                        // data-keyboard="false"
                        // tabIndex="-1"
                        // aria-labelledby="staticBackdropLabel"
                        // aria-hidden="true"
                        // style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        className={`modal fade ${showPreModel ? 'show' : ''}`}
                        tabIndex="-1" role="dialog"
                        style={{ display: showPreModel ? 'block' : 'none', backgroundColor: 'rgb(0 0 0 / 50%)' }}
                    >
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                                <form onSubmit={handlePreDataUpdateOnSubmit}>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">
                                            Edit Premedication Drug Item In Treatment Form
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
                                                        name="drugType"
                                                        value={data.drugType}
                                                        onChange={(e) => handleChange(e)}
                                                    />
                                                    {errorsData?.drugType && <span className='text-danger'> {errorsData.drugType}</span>}
                                                </div>
                                                <div className="form-group col-12 col-md-6 col-lg-3">
                                                    <label>Drug Name</label>
                                                    <input
                                                        type="text"
                                                        value={data.drugName}
                                                        className="form-control"
                                                        name="drugName"
                                                        onChange={(e) => handleChange(e)}
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
                                                        onChange={(e) => handleChange(e)}
                                                        value={data.brandName}
                                                    />
                                                    {errorsData?.brandName && <span className='text-danger'> {errorsData.brandName}</span>}
                                                </div>
                                                <div className="form-group col-12 col-md-6 col-lg-3">
                                                    <label>Dose Value</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Dose value.."
                                                        name="doseValue"
                                                        onChange={(e) => handleChange(e)}
                                                        value={data.doseValue}
                                                    />
                                                    {errorsData?.doseValue && <span className='text-danger'> {errorsData.doseValue}</span>}
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col-12 col-md-6 col-lg-3">
                                                    <label>Unit</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Unit...."
                                                        name="unit"
                                                        onChange={(e) => handleChange(e)}
                                                        value={data.unit}
                                                    />
                                                    {errorsData?.unit && <span className='text-danger'> {errorsData.unit}</span>}
                                                </div>
                                                <div className="form-group col-12 col-md-6 col-lg-3">
                                                    <label>Duration (days)</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Duration in days.."
                                                        name="duration"
                                                        onChange={(e) => handleChange(e)}
                                                        value={data.duration}
                                                    />
                                                    {errorsData?.duration && <span className='text-danger'> {errorsData.duration}</span>}
                                                </div>
                                                <div className="form-group col-12 col-md-6 col-lg-3">
                                                    <label>Frequency</label>
                                                    <input
                                                        type="number"
                                                        value={data.frequency}
                                                        onChange={(e) => handleChange(e)}
                                                        className="form-control"
                                                        placeholder="0 1 0"
                                                        name="frequency"
                                                    />
                                                    {errorsData?.frequency && <span className='text-danger'> {errorsData.frequency}</span>}
                                                </div>
                                                <div className="form-group col-12 col-md-6 col-lg-3">
                                                    <label>Administraion Details</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Details...."
                                                        name="details"
                                                        onChange={(e) => handleChange(e)}
                                                        value={data.details}
                                                    />
                                                    {errorsData?.details && <span className='text-danger'> {errorsData.details}</span>}
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-12 col-md-6 col-lg-3">
                                                    <label>Start Time</label>
                                                    <input
                                                        type="date"
                                                        onChange={(e) => handleChange(e)}
                                                        value={data.startTime}
                                                        className="form-control"
                                                        name="startTime"
                                                    />
                                                    {errorsData?.startTime && <span className='text-danger'> {errorsData.startTime}</span>}
                                                </div>
                                                <div className="form-group col-12 col-md-6 col-lg-3">
                                                    <label>End Time</label>
                                                    <input
                                                        type="date"
                                                        value={data.endTime}
                                                        onChange={(e) => handleChange(e)}
                                                        className="form-control"
                                                        name="endTime"
                                                    />
                                                    {errorsData?.endTime && <span className='text-danger'> {errorsData.endTime}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                            onClick={handleClearError}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-success">
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            </>

        </>
    );
}

// ****************** Premedication Form Part End ************************



// ************ chemo single record update record form treatment form ******************
export const ChemotherapyTreatmentUpdateForm = ({ item, handleGetUpdatedChemotherapyData, showChemoModel, handleChemoModelClose, handleChemoModelShow, setShowChemoModel }) => {

    console.log("Data ID:", item);


    const [errorsData, setErrors] = useState({})
    const [data, setData] = useState({
        drugType: '',
        drugName: '',
        doseRangeA: '',
        doseRangeB: '',
        dose: '',
        doseUnit: '',
        dilution: '',
        dosePct: '',
        brandName: '',
        route: '',
        duration: '',
        details: '',
        expiredDate: '',
        startTime: '',
        endTime: ''
    })


    function chemoSetData() {
        setData({
            _id: item._id,
            drugType: item.drugType,
            drugName: item.drugName,
            doseRangeA: item.doseRangeA,
            doseRangeB: item.doseRangeB,
            dose: item.doseRangeA,
            doseUnit: item.doseUnit,
            dilution: item.dilution,
            dosePct: item.dosePct,
            brandName: item.brandName,
            route: item.route,
            duration: item.duration,
            details: item.details,
            expiredDate: item.expiredDate ? moment(item.expiredDate).format('YYYY-MM-DD') : '',
            startTime: item.startTime ? moment(item.startTime).format('YYYY-MM-DD') : '',
            endTime: item.endTime ? moment(item.endTime).format('YYYY-MM-DD') : ''
        })
    }

    useEffect(() => {
        if (item) {
            chemoSetData()
        }
    }, [item])

    const handleClearError = () => {
        setErrors({});
        chemoSetData();
        handleChemoModelClose();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }


    const handleChemoDataUpdateOnSubmit = async (e) => {

        console.log("handleChemoDataUpdateOnSubmit before:", data);

        try {
            e.preventDefault();
            await chemotherapyTreatmentFromValidateSchema.validate(data, { abortEarly: false });
            handleGetUpdatedChemotherapyData(data);
            console.log("handleChemoDataUpdateOnSubmit After:", data);
            setErrors({});
            toast.success("Update in Local Storage")
            handleClearError();
        } catch (validationErrors) {

            console.log("validationErrors:", validationErrors?.message);
            const formattedErrors = {};
            if (validationErrors && Array.isArray(validationErrors.inner)) {
                validationErrors.inner.forEach(error => {
                    formattedErrors[error.path] = error.message;
                });
                setErrors(formattedErrors);
            }
        }
    }

    const dropdownList = ["AUC", "mg", "mg/m2", "mg/kg"];

    return (
        <>



            {/* ================= Chemotherapy Edit form ========= */}
            <div
                className={`modal fade ${showChemoModel ? 'show' : ''}`} tabIndex="-1" role="dialog"
                style={{ display: showChemoModel ? 'block' : 'none', backgroundColor: 'rgb(0 0 0 / 50%)' }}
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content" >
                        <form onSubmit={handleChemoDataUpdateOnSubmit}   >
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">
                                    Edit Chemotherapy Drug Item In Treatment Form
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
                                                onChange={(e) => handleChange(e)}
                                                value={data.drugType}
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
                                                onChange={(e) => handleChange(e)}

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
                                                placeholder="Brand name.."
                                                name="brandName"
                                                value={data.brandName}
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {errorsData?.brandName && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.brandName}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label >Dose Range b/w <span className="text-danger">  [{` ${data.doseRangeA}  - ${data.doseRangeB}  `}] * </span></label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Dose...."
                                                name="dose"
                                                value={data.dose}
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {errorsData?.dose && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.dose}
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
                                                value={data?.doseUnit}
                                                onChange={(e) => handleChange(e)}
                                            >
                                                {dropdownList.map((unit) => (
                                                    <option key={unit} >
                                                        {unit} {console.log("data.doseUnit: ", data.doseUnit)}
                                                    </option>
                                                ))}
                                                {/* <option value={data.doseUnit} onChange={(e) => handleChange(e)} key={data.doseUnit}>
                                                    {data.doseUnit}
                                                </option> */}
                                            </select>
                                            {errorsData?.doseUnit && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.doseUnit}
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
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {errorsData?.dosePct && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.dosePct}
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
                                                onChange={(e) => handleChange(e)}

                                            />
                                            {errorsData?.dilution && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.dilution}
                                                </p>
                                            )}
                                        </div>

                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Route</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Route...."
                                                name="route"
                                                value={data.route}
                                                onChange={(e) => handleChange(e)}

                                            />
                                            {errorsData?.route && (
                                                <p className="text-start text-danger">
                                                    {errorsData?.route}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-row">

                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Duration(hrs) </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="hrs.."
                                                name="duration"
                                                value={data.duration}
                                                onChange={(e) => handleChange(e)}

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
                                                onChange={(e) => handleChange(e)}

                                            />
                                            {errorsData?.details && (
                                                <p className="text-start text-danger">
                                                    {errorsData.details}
                                                </p>
                                            )}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Expried Date</label>
                                            <input
                                                type="date"
                                                onChange={(e) => handleChange(e)}
                                                value={data.expiredDate}
                                                className="form-control"
                                                name="expiredDate"
                                            />
                                            {errorsData?.expiredDate && <span className='text-danger'> {errorsData.expiredDate}</span>}
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>Start Time</label>
                                            <input
                                                type="date"
                                                onChange={(e) => handleChange(e)}
                                                value={data.startTime}
                                                className="form-control"
                                                name="startTime"
                                            />
                                            {errorsData?.startTime && <span className='text-danger'> {errorsData.startTime}</span>}
                                        </div>
                                    </div>
                                    <div className="form-row">

                                        <div className="form-group col-12 col-md-6 col-lg-3">
                                            <label>End Time</label>
                                            <input
                                                type="date"
                                                value={data.endTime}
                                                onChange={(e) => handleChange(e)}
                                                className="form-control"
                                                name="endTime"
                                            />
                                            {errorsData?.endTime && <span className='text-danger'> {errorsData.endTime}</span>}
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


export const TakeHomeTreatmentUpdateForm = ({ item, handleGetUpdatedTakeHomeData, showTakeHomeModel, handleTakeHomeModelClose, handleTakeHomeModelShow, setShowTakeHomeModel }) => {

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
        dispensed: '',
    })

    function takeHomeSetData() {
        setData({
            _id: item._id,
            drugType: item.drugType,
            drugName: item.drugName,
            brandName: item.brandName,
            doseValue: item.doseValue,
            unit: item.unit,
            duration: item.duration,
            frequency: item.frequency,
            details: item.details,
            dispensed: item.dispensed
        })
    }

    useEffect(() => {
        if (item) {
            takeHomeSetData()
        }
    }, [item])

    const handleClearError = () => {
        setErrors({});
        takeHomeSetData();
        handleTakeHomeModelClose();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const handleTakeHomeDataUpdateOnSubmit = async (e) => {
        // console.log("handleTakeHomeDataUpdateOnSubmit before:", data);
        try {
            e.preventDefault();
            await takeHomeTreatmentFromValidateSchema.validate(data, { abortEarly: false });
            handleGetUpdatedTakeHomeData(data);
            console.log("handleTakeHomeDataUpdateOnSubmit After:", data);
            setErrors({});
            toast.success("Update in Local Storage")
            handleClearError();
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

    return (
        <>
            <>
                {/* ================= Take Home Edit form ========= */}
                <div
                    // className="modal fade"
                    // id="TakeHomeUpdateInTreatmentForm"
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
                            <form onSubmit={handleTakeHomeDataUpdateOnSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">
                                        Edit Take Home Drug Item In Treatment Form
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
                                                    name="drugType"
                                                    value={data.drugType}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                {errorsData?.drugType && <span className='text-danger'> {errorsData.drugType}</span>}
                                            </div>
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Drug Name</label>
                                                <input
                                                    type="text"
                                                    value={data.drugName}
                                                    className="form-control"
                                                    name="drugName"
                                                    onChange={(e) => handleChange(e)}
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
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.brandName}
                                                />
                                                {errorsData?.brandName && <span className='text-danger'> {errorsData.brandName}</span>}
                                            </div>
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Dose Value</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Dose value.."
                                                    name="doseValue"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.doseValue}
                                                />
                                                {errorsData?.doseValue && <span className='text-danger'> {errorsData.doseValue}</span>}
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Unit</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Unit...."
                                                    name="unit"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.unit}
                                                />
                                                {errorsData?.unit && <span className='text-danger'> {errorsData.unit}</span>}
                                            </div>
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Duration (days)</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Duration in days.."
                                                    name="duration"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.duration}
                                                />
                                                {errorsData?.duration && <span className='text-danger'> {errorsData.duration}</span>}
                                            </div>
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Frequency</label>
                                                <input
                                                    type="number"
                                                    value={data.frequency}
                                                    onChange={(e) => handleChange(e)}
                                                    className="form-control"
                                                    placeholder="0 1 0"
                                                    name="frequency"
                                                />
                                                {errorsData?.frequency && <span className='text-danger'> {errorsData.frequency}</span>}
                                            </div>
                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Administraion Details</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Details...."
                                                    name="details"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.details}
                                                />
                                                {errorsData?.details && <span className='text-danger'> {errorsData.details}</span>}
                                            </div>
                                        </div>
                                        <div className="form-row">

                                            <div className="form-group col-12 col-md-6 col-lg-3">
                                                <label>Dispensed</label>
                                                <input
                                                    type="text"
                                                    value={data.dispensed}
                                                    onChange={(e) => handleChange(e)}
                                                    className="form-control"
                                                    name="dispensed"
                                                />
                                                {errorsData?.dispensed && <span className='text-danger'> {errorsData.dispensed}</span>}
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
                                        // id="close_btn"
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
        </>
    );
}

// ****************** Premedication Form Part End ************************






