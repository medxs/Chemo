import { configureStore } from "@reduxjs/toolkit"
import patientSlice from '../slices/patientSlice'
import patientsSlice from '../slices/patientsSlice'
import takeHomeSlice from '../slices/takeHomeDrugSlice'
import preDrugSlice from '../slices/preDrugSlice'
import chemoDrugSlice from '../slices/chemoDrugSlice'
import authSlice from '../slices/authSlice'
import masterRecordReducer from '../slices/master-record-slices/masterRecordSlice'
import getCancerListSlice from '../slices/master-record-slices/getCancerListSlice'
import getRegimenListSlice from '../slices/master-record-slices/getRegimenListSlice'
import getPreMedicationMasterListSlice from '../slices/master-record-slices/getPreMedicationMasterListSlice'
import getChemotherapyMasterListSlice from '../slices/master-record-slices/getChemotherapyMasterListSlice'
import getTakeHomeMasterListSlice from '../slices/master-record-slices/getTakeHomeMasterListSlice'
import preDrugTreatmentSlice from '../slices/treatmentSlice/preDrugTreatmentSlice'

import dateSlice from '../slices/date-Slice/dateSlice'
import treatmentDateSlice from '../slices/treatmentSlice/treatmentDateSlice'

import mainTreatmentSlice from '../slices/treatmentSlice/mainTreatmentSlice'

import viewPatientDrugTreatmentDetailsSlice from '../slices/treatmentSlice/viewPatientDrugTreatmentDetailsSlice'

import deletePatientDetailsSlice from '../slices/deletePatientDetailsSlice'

import yetToStartTreatmentSlice from '../slices/treatmentSlice/yetToStartSlice'

import todayCasesTreatmentSlice from '../slices/treatmentSlice/todayCasesSlice'

import bloodReportSlice from '../slices/viewDetails/bloodReportSlice'

const store = configureStore({
    reducer: {
        // auth 
        authState: authSlice,
        // drug item
        preDrugData: preDrugSlice,
        chemoDrugData: chemoDrugSlice,
        takeHomeDrugData: takeHomeSlice,

        //single patient
        patientInfo: patientSlice,

        // yet to start treatments
        startTreatmentProfiles: yetToStartTreatmentSlice,

        //today cases list
        todayCasesTreatmentProfiles: todayCasesTreatmentSlice,

        //all patients
        patientsState: patientsSlice,

        // test
        masterRecordState: masterRecordReducer,


        // master records store details
        cancerDataState: getCancerListSlice,
        regimenDataState: getRegimenListSlice,
        premedicationDataState: getPreMedicationMasterListSlice,
        chemotherapyDataState: getChemotherapyMasterListSlice,
        takeHomeDataState: getTakeHomeMasterListSlice,


        //  **********  treatments data handle ************
        preDrugTreatmentData: preDrugTreatmentSlice,
        patientCycleTestAndDate: dateSlice,

        // ********* handle main treatment form **********
        createMainTreatmentForm: mainTreatmentSlice,


        // get Single Date records for particular patient
        getPatientRecordForDate: treatmentDateSlice,
        getPatientTreatmentRecordDrugDetails: viewPatientDrugTreatmentDetailsSlice,

        // delete patient record all details 
        deletePatientProfileAllRecord: deletePatientDetailsSlice,


        // get report details
        getBloodReportDetails: bloodReportSlice

    }
})

export default store;