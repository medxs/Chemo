import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getPatients } from '../../redux/actions/patientsAction';
import { EyeFill, Trash3Fill } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { deletePatientAllRecordDetails } from '../../redux/actions/deletePatientRecordsAction';
import { deleteClearMessage } from '../../redux/slices/deletePatientDetailsSlice';
import { toast } from 'react-toastify';

const UserDetails = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");


  const { patients: patientsList, patientsCount, loading } = useSelector((state) => state.patientsState);
  const { deleteErrorMsg, deleteSuccessMsg } = useSelector((state) => state.deletePatientProfileAllRecord);

  console.log("deleteErrorMsg:", deleteErrorMsg);

  useEffect(() => {
    dispatch(getPatients(currentPage, perPage, search));
  }, [currentPage, perPage, search, dispatch]);


  console.log("currentPage:", currentPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const patientsTableData = patientsList?.map((item) => {
    return {
      _id: item._id,
      address: item.address,
      age: item.age,
      customId: item.customId,
      email: item.email,
      gender: item.gender,
      ip: item.ip,
      joinAt: item.joinAt,
      mobileNo: item.mobileNo,
      name: item.name,
      occupation: item.occupation,
      patientId: item.patientsId,
      status: item.status,
      uhid: item.uhid,
    };
  });


  console.log("List of Patients:", patientsList);

  const patientTableColumns = [
    {
      name: "Patient ID",
      selector: row => row.customId,
      sortable: true
    },
    {
      name: "Patients Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name: "Join Date",
      selector: row => row.joinAt,
      sortable: true
    },
    {
      name: "Email ID",
      selector: row => row.email,
      sortable: true
    },
    {
      name: "Mobile No",
      selector: row => row.mobileNo,
      sortable: true
    },
    {
      name: "UHID No.",
      selector: row => row.mobileNo,
      sortable: true
    },
    {
      name: "IP No.",
      selector: row => row.ip,
      sortable: true
    },
    {
      name: "Profiles",
      cell: (item) => (
        <div className="d-flex flex-row">
          <Link
            type="button"
            className="btn btn-primary btn-sm  mr-1 mr-xl-3"
            to={`/userDetails/view?p_id=${item._id}`}
            onClick={() => viewProfileDetails(item._id)}
          >

            <EyeFill />

            {/* View */}
          </Link>
          <button
            type="button"
            className="btn btn-danger btn-sm  mr-1 mr-xl-3"
            onClick={() => deleteProfile(item._id)}
          >
            <Trash3Fill />

            {/* Delete */}
          </button>
        </div>
      )
    },

  ]

  const customTableStyle = {
    rows: {
      style: {
        fontSize: "15px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#0fa3b1",
        color: "white",
        fontSize: "15px",
      },
    },
  };



  useEffect(() => {

    if (deleteSuccessMsg) {
      if (deleteErrorMsg) {
        toast.error(deleteErrorMsg, {
          // delay: 1000,
          // hideProgressBar: true
        });
        setTimeout(() => {
          dispatch(deleteClearMessage())
        }, 100)
        return;
      }

      toast.success(deleteSuccessMsg, {
        // delay: 1000,
        // hideProgressBar: true
      });
      setTimeout(() => {
        dispatch(deleteClearMessage())
      }, 100)
      return;
    }

  }, [deleteErrorMsg, deleteSuccessMsg])

  const deleteProfile = (id) => {
    console.log("Log:", id);
    if (window.confirm("Are you sure wanna Permanently Delete this Patient Record because you cant retrieve this record again?")) {
      dispatch(deletePatientAllRecordDetails(id));
      dispatch(getPatients(currentPage, perPage, search));
    }
  }

  const viewProfileDetails = (id) => {
    console.log("Tesdt ID:", id);
  }

  return (
    <>

      <div className="container-fluid">
        <div className="my-2">
          <nav className="navbar navbar-light " style={{ backgroundColor: '#8ddee5' }}>
            <h3 className=" m-0"> All Patient Profiles </h3>
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search" placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={handleSearchChange}
              />
            </form>
          </nav>
        </div>

        <div className="m-2">
          <DataTable
            showGridlines
            className="border"
            columns={patientTableColumns}
            data={patientsTableData}
            striped={true}
            pagination
            customStyles={customTableStyle}
            selectableRowsHighlight
            highlightOnHover

            // pagination content
            paginationServer // Use server-side pagination if needed
            paginationRowsPerPageOptions={[10, 15, 20]}
            progressPending={loading}
            paginationDefaultPage={currentPage} // Default page start with 1
            onChangePage={handlePageChange} // // Handle page change
            paginationTotalRows={patientsCount} // Total number of rows for pagination
            paginationPerPage={perPage} // Ensure default rows per page is set to 10
            onChangeRowsPerPage={handlePerRowsChange} // per page how many pages do u want

          />
        </div>
        <div className="d-flex justify-content-between py-3">
          <button
            type="button"
            className="btn btn-info px-md-5"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>

      </div>

    </>
  )
}

export default UserDetails