import * as yup from "yup";

const premedicationFromValidateSchema = yup.object({
    drugType: yup.string().trim().min(3, 'Must be at least 3 characters long').max(5, 'Only allow 5 characters').required("Drug Type is required").uppercase(),
    drugName: yup.string().trim().min(3, 'Must be at least 3 characters long').required("Drug Name is required"),
    brandName: yup.string().trim().min(3, 'Must be at least 3 characters long').required("Brand Name is required"),
    doseValue: yup.number().typeError('Dose Value is required.').positive("Must be a positive number.").required("Dose Value is required"),
    unit: yup.string().trim().required("Unit is required"),
    duration: yup.number("Must be in Number.").typeError('Please enter a duration. The field cannot be left blank.').positive("Must be a positive number.").required("Duration is required"),
    frequency: yup.string().matches(/^[0-1]+$/, "Enter between 0 or 1 digits").trim().min(3, "Must be at least 3 characters long").max(3, "Must be at most 3 characters long").required("Frequency is required"),
    details: yup.string().trim().required("Administraion Details is required.."),
});

const chemoFormValidateSchema = yup.object({
    drugType: yup.string().trim().min(3, 'Must be at least 3 characters long').max(5, 'Only allow 5 characters').required("Drug Type is required").uppercase(),
    drugName: yup.string().trim().min(3, 'Must be at least 3 characters long').required("Drug Name is required"),
    doseRangeA: yup.number().typeError("Please enter a valid number").positive("Must be a positive number").required("Dose Range A is required"),
    doseRangeB: yup.number().typeError("Please enter a valid number").required("Dose Range B is required").moreThan(yup.ref("doseRangeA")),
    doseUnit: yup.string().required("Unit is required."),
    dilution: yup.number().typeError("Please enter a valid number").positive("Must be a positive number.").required("Dilution Volume is required"),
    dosePct: yup.number().typeError("Please enter a valid number").positive("Must be a positive number.").max(100, "Enter between 0 to 100 value.").required("Dose percentage is required"),
    brandName: yup.string().trim().required("Brand Name is required"),
    route: yup.string().trim().required("Route is required"),
    duration: yup.number().typeError("Please enter a valid number").positive('Must be a positive number.').required("Duration is required"),
    details: yup.string().trim().required("Administraion Details is required"),
});

const takeHomeFormValidateSchema = yup.object({
    drugType: yup.string().trim().min(3, 'Must be at least 3 characters long').max(5, 'Only allow 5 characters').required("Drug Type is required").uppercase(),
    drugName: yup.string().trim().min(3, 'Must be at least 3 characters long').required("Drug Name is required"),
    brandName: yup.string().trim().min(3, 'Must be at least 3 characters long').required("Brand Name is required"),
    doseValue: yup.number().typeError('Dose Value is required').positive("Must be a positive number.").required("Dose Value is required"),
    unit: yup.string().trim().required("Unit is required"),
    duration: yup.number("Must be in Number.").typeError('Please enter a duration. The field cannot be left blank.').positive("Must be a positive number.").required("Duration is required"),
    frequency: yup.string().matches(/^[0-1]+$/, "Enter between 0 or 1 digits").trim().min(3, "Must be at least 3 characters long").max(3, "Must be at most 3 characters long").required("Frequency is required"),
    details: yup.string().trim().required("Administraion Details is required.."),
});


const createNewMasterRecordValidation = yup.object({
    typeOfCancer: yup.string().trim().min(3, 'Must be at least 3 characters long').required("Type of Cancer is required"),
    typeOfRegimen: yup.string().trim().min(3, 'Must be at least 3 characters long').required("Type of Regimen is required"),
})



const premedicationTreatmentFromValidateSchema = yup.object({
    drugType: yup.string().trim().min(3, 'Must be at least 3 characters long').max(5, 'Only allow 5 characters').required("Drug Type is required").uppercase(),
    drugName: yup.string().trim().min(3, 'Must be at least 3 characters long').required("Drug Name is required"),
    brandName: yup.string().trim().min(3, 'Must be at least 3 characters long').required("Brand Name is required"),
    doseValue: yup.number().typeError('Please enter a dose value. The field cannot be left blank.').positive("Must be a positive number.").required("Dose Value is required"),
    unit: yup.string().trim().required("Unit is required"),
    duration: yup.number("Must be in Number.").typeError('Please enter a duration. The field cannot be left blank.').positive("Must be a positive number.").required("Duration is required"),
    frequency: yup.string().matches(/^[0-1]+$/, "Enter between 0 or 1 digits").trim().min(3, "Must be at least 3 characters long").max(3, "Must be at most 3 characters long").required("Frequency is required"),
    details: yup.string().trim().required("Administraion Details is required.."),
    startTime: yup.date().required('Select the Start Date'),
    endTime: yup.date().required('Select the End Date')
});


const chemotherapyTreatmentFromValidateSchema = yup.object({
    drugType: yup.string().trim().min(3, 'Must be at least 3 characters long').max(5, 'Only allow 5 characters').required("Drug Type is required").uppercase(),
    drugName: yup.string().trim().min(3, 'Must be at least 3 characters long').required("Drug Name is required"),
    doseRangeA: yup.number().typeError("Please enter a valid number").positive("Must be a positive number").required("Dose Range A is required"),
    doseRangeB: yup.number().typeError("Please enter a valid number").required("Dose Range B is required").moreThan(yup.ref("doseRangeA")),
    dose: yup.number().min(yup.ref("doseRangeA")).max(yup.ref("doseRangeB")).typeError("Please enter a valid number").required("Dose is required"),
    doseUnit: yup.string().required("Unit is required."),
    dilution: yup.number().typeError("Please enter a valid number").positive("Must be a positive number.").required("Dilution Volume is required"),
    dosePct: yup.number().typeError("Please enter a valid number").positive("Must be a positive number.").max(100, "Enter between 0 to 100 value.").required("Dose percentage is required"),
    brandName: yup.string().trim().required("Brand Name is required"),
    route: yup.string().trim().required("Route is required"),
    duration: yup.number().typeError("Please enter a valid number").positive('Must be a positive number.').required("Duration is required"),
    details: yup.string().trim().required("Administraion Details is required"),
    expiredDate: yup.date().required('Select the Start Date'),
    startTime: yup.date().required('Select the Start Date'),
    endTime: yup.date().required('Select the End Date')
});



const takeHomeTreatmentFromValidateSchema = yup.object({
    drugType: yup.string().trim().min(3, 'Must be at least 3 characters long').max(5, 'Only allow 5 characters').required("Drug Type is required").uppercase(),
    drugName: yup.string().trim().min(3, 'Must be at least 3 characters long').required("Drug Name is required"),
    brandName: yup.string().trim().min(3, 'Must be at least 3 characters long').required("Brand Name is required"),
    doseValue: yup.number().typeError('Please enter a dose value. The field cannot be left blank.').positive("Must be a positive number.").required("Dose Value is required"),
    unit: yup.string().trim().required("Unit is required"),
    duration: yup.number("Must be in Number.").typeError('Please enter a duration. The field cannot be left blank.').positive("Must be a positive number.").required("Duration is required"),
    frequency: yup.string().matches(/^[0-1]+$/, "Enter between 0 or 1 digits").trim().min(3, "Must be at least 3 characters long").max(3, "Must be at most 3 characters long").required("Frequency is required"),
    details: yup.string().trim().required("Administraion Details is required.."),
    dispensed: yup.string().trim().min(3, 'Must be at least 3 characters long').required("Dispensed is required")
});



// const doseUnitOptions = ["AUC", "mg", "mg/m2", "mg/kg"];
//     const drop = doseUnitOptions.filter(option => option !== data.doseUnit)
export {
    premedicationFromValidateSchema, chemoFormValidateSchema, takeHomeFormValidateSchema, createNewMasterRecordValidation,
    premedicationTreatmentFromValidateSchema, chemotherapyTreatmentFromValidateSchema, takeHomeTreatmentFromValidateSchema
};



// .when(['doseRangeA', 'doseRangeB'], {
//     is: (doseRangeA, doseRangeB) => doseRangeA !== undefined && doseRangeB !== undefined,
//     then: yup.number()
//         .min(yup.ref('doseRangeA'), "Dose must be at least Dose Range A")
//         .max(yup.ref('doseRangeB'), "Dose must be at most Dose Range B")
// }),