import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import TreatmentTable from '../../../components/TreatmentTable'

import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { getTodayCasesPatientRecordsList } from "../../../redux/actions/patientsAction";

const TodayTreatmentList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const { todayCasesPatitentsCount, todayCasesPatitentsList, isLoading } = useSelector((state) => state.todayCasesTreatmentProfiles);


    useEffect(() => {
        dispatch(getTodayCasesPatientRecordsList(currentPage, perPage, search));
    }, [currentPage, perPage, search, dispatch]);

    const patientTableColumns = [
        {
            name: "Patient ID",
            selector: (row) => `${row.customId}`,
            sortable: true,
        },
        {
            name: "Admission Date",
            selector: (row) => `${row.joinAt}`,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => `${row.name}`,
            sortable: true,
        },
        {
            name: "UHID No.",
            selector: (row) => `${row.uhid}`,
            sortable: true,
        },
        {
            name: "IP No.",
            selector: (row) => `${row.ip}`,
            sortable: true,
        },
        // {
        //     name: "Treatments Status",
        //     selector: (row) => `Null`,
        //     sortable: true,
        // },
        {
            name: "Admission Status",
            selector: (row) => `${row.status}`,
            sortable: true,
        },
        {
            name: "View Details",
            cell: (item) => (
                <div className="">
                    <Link
                        type="button"
                        className="btn btn-primary btn-sm  mr-1 mr-xl-3"
                        to={`/dashboard/allPatients/f1?product_id=${item._id}`}
                    // onClick={() => testIdFun(item)}
                    >
                        Proceed
                    </Link>
                </div>
            ),
        },
    ];

    const patientsTableData = todayCasesPatitentsList?.map((item) => {
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

    // ====== Table header style ======

    const customTableStyle = {
        rows: {
            style: {
                fontSize: "15px",
            },
        },
        headCells: {
            style: {
                backgroundColor: "#0fa3b1",
                fontSize: "15px",
                color: "white",
            },
        },
    };
    // console.log("patients Table Data:", patientsTableData);

    // pagination controller

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


    return (
        <>
            <div className="container-fluid">
                <div className="mx-3 my-3">
                    <div className="row py-1 align-items-center " style={{ backgroundColor: "#8ddee5", borderRadius: "5px" }}>
                        <div className="col-sm-12 col-md-6 my-1">
                            <p className='h4 m-0 text text-center text-md-left'>List of cases</p>
                        </div>
                        <div className="col-sm-12 col-md-6 my-1 d-flex justify-content-end">
                            <input
                                className="form-control col-md-10 col-xl-4 mr-sm-2"
                                type="search" placeholder="Search"
                                aria-label="Search"
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="container-fluid px-0 my-3  ">
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
                            progressPending={isLoading}
                            paginationDefaultPage={currentPage} // Default page start with 1
                            onChangePage={handlePageChange} // // Handle page change
                            paginationTotalRows={todayCasesPatitentsCount} // Total number of rows for pagination
                            paginationPerPage={perPage} // Ensure default rows per page is set to 10
                            onChangeRowsPerPage={handlePerRowsChange} // per page how many pages do u want
                        />
                    </div>
                    <div className="d-flex justify-content-between pb-3">
                        <button
                            type="button"
                            className="btn btn-info px-md-5"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TodayTreatmentList