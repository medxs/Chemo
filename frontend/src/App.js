import './App.css';
import Home from './pages/Home';
import Register from './pages/adminPage/Register';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './RootLayout/Layout';
import Dashboard from './pages/userPage/Dashboard';
import Error from './pages/Error';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddDrug from './pages/userPage/AddDrug';
import MasterRecords from './pages/userPage/MasterRecords';
import UserDetails from './pages/userPage/UserDetails';
import CreatePatientsProfile from './pages/userPage/CreatePatientsProfile';
import PremedicationForm from './pages/userPage/forms/FormOne';
import AllPatientList from './pages/userPage/TreatmentsTables/AllPatientList';
import StartTreatmentList from './pages/userPage/TreatmentsTables/StartTreatmentList';
import TodayTreatmentList from './pages/userPage/TreatmentsTables/TodayTreatmentList';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './redux/actions/authAction';
import FormOne from './pages/userPage/forms/FormOne';
import FormTwo from './pages/userPage/forms/FormTwo';
import CreateMasterRecord from './pages/userPage/masterPage/CreateMasterRecord';
import ViewMasterRecord from './pages/userPage/masterPage/ViewMasterRecord';
import ViewUserDetails from './pages/userPage/userDetails/ViewUserDetails';
import ViewPatientDrugDetails from './pages/userPage/userDetails/ViewPatientDrugDetails';
import EditForm from './pages/userPage/forms/EditForm';
import ViewDrugsDetailsFrom from './pages/userPage/forms/ViewDrugsDetailsFrom';
import PdfForm from './pages/userPage/forms/PdfForm';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [])

  return (
    <div className="App">

      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Layout />} >
            {/* ============== Doctor Routers ========= */}
            <Route path='/dashboard' element={<ProtectedRoute roles={['user']}><Dashboard /></ProtectedRoute>} />
            {/* <Route path='/dashboard' element={<Dashboard />} /> */}

            <Route path='/dashboard/CreatePatientsProfile' exact element={<ProtectedRoute roles={['user']}> <CreatePatientsProfile /> </ProtectedRoute>} />
            {/* <Route path='/dashboard/table' exact element={<TreatmentTable />} /> */}
            <Route path='/dashboard/allPatients' exact element={<ProtectedRoute roles={['user']}>   <AllPatientList />  </ProtectedRoute>} />
            <Route path='/dashboard/allPatients/f1' exact element={<ProtectedRoute roles={['user']}>   < FormOne />  </ProtectedRoute>} />
            <Route path='/dashboard/allPatients/f1/f2' exact element={<ProtectedRoute roles={['user']}>    < FormTwo /> </ProtectedRoute>} />
            <Route path='/dashboard/allPatients/f1/edit' exact element={<ProtectedRoute roles={['user']}>  < EditForm />   </ProtectedRoute>} />
            <Route path='/dashboard/allPatients/f1/view' exact element={<ProtectedRoute roles={['user']}>  < ViewDrugsDetailsFrom />   </ProtectedRoute>} />
            <Route path='/dashboard/view/pdf' exact element={<ProtectedRoute roles={['user']}>  < PdfForm />   </ProtectedRoute>} />



            <Route path='/dashboard/startTreatment' exact element={<ProtectedRoute roles={['user']}>    <StartTreatmentList /> </ProtectedRoute>} />
            <Route path='/dashboard/todayTreatment' exact element={<ProtectedRoute roles={['user']}>  <TodayTreatmentList />   </ProtectedRoute>} />




            <Route path='/addDrug' element={<ProtectedRoute roles={['user']}>   <AddDrug />  </ProtectedRoute>} />
            <Route path='/addDrug/preFrom' element={<ProtectedRoute roles={['user']}>   <PremedicationForm />  </ProtectedRoute>} />




            {/* ************** Master Records ************** */}
            <Route path='/masterRecords' element={<ProtectedRoute roles={['user']}>  <MasterRecords />   </ProtectedRoute>} />
            <Route path='/masterRecords/create' element={<ProtectedRoute roles={['user']}>  <CreateMasterRecord />   </ProtectedRoute>} />
            <Route path='/masterRecords/view' element={<ProtectedRoute roles={['user']}>   <ViewMasterRecord />  </ProtectedRoute>} />





            {/* ************** User Details ************** */}

            <Route path='/userDetails' element={<ProtectedRoute roles={['user']}>  <UserDetails />   </ProtectedRoute>} />
            <Route path='/userDetails/view' element={<ProtectedRoute roles={['user']}>   <ViewUserDetails />  </ProtectedRoute>} />
            <Route path='/userDetails/view/getTreatmentRecord' element={<ProtectedRoute roles={['user']}>  <ViewPatientDrugDetails />   </ProtectedRoute>} />

          </Route>

          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          {/* <Route path='/register' element={<ProtectedRoute roles={['user', 'admin']}><Register /></ProtectedRoute>} /> */}
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Error />} />

        </Routes>

      </BrowserRouter>
      <ToastContainer
        theme="colored"
      />
    </div>
  );
}

export default App;
