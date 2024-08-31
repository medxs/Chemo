// import axios from 'axios';
import React from "react";
// import { useEffect, useState } from 'react';

const TreatmentTable = () => {
 

  return (
    <>
      <div className="container-fluid px-0 my-3  ">
        <div className="table-responsive">
          <table className="table table-striped border ">
            <thead className="bg-info text-white">
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Admission Date</th>
                <th scope="col">Name</th>
                <th scope="col">UHID No.</th>
                <th scope="col">IP No.</th>
                <th scope="col">Admission Status</th>
                <th scope="col">Treatments Status</th>
                <th scope="col">View Details</th>
              </tr>
            </thead>
            <tbody>
              {/* {data.map((item) => (

                                <tr key={item._id}>
                                    <td>UID001</td>
                                    <td>15/03/2024</td>
                                    <td>{item.name}</td>
                                    <td>000000000111</td>
                                    <td>00011</td>
                                    <td>Cycle 1</td>
                                    <td>Ward</td>
                                    <td>
                                        <button type="button" className="btn btn-primary btn-sm">Proceed</button>
                                    </td>
                                </tr>
                            ))} */}

              <tr>
                <td>UID001</td>
                <td>15/03/2024</td>
                <td>User 1</td>
                <td>000000000111</td>
                <td>00011</td>
                <td>Cycle 1</td>
                <td>Ward</td>
                <td>
                  <button type="button" className="btn btn-primary btn-sm">
                    Proceed
                  </button>
                </td>
              </tr>
              <tr>
                <td>UID002</td>
                <td>15/03/2024</td>
                <td>User 2</td>
                <td>000000000111</td>
                <td>00011</td>
                <td>Cycle 1</td>
                <td>Ward</td>
                <td>
                  <button type="button" className="btn btn-primary btn-sm">
                    Proceed
                  </button>
                </td>
              </tr>
              <tr>
                <td>UID002</td>
                <td>15/03/2024</td>
                <td>User 3</td>
                <td>000000000111</td>
                <td>00011</td>
                <td>Cycle 1</td>
                <td>Ward</td>
                <td>
                  <button type="button" className="btn btn-primary btn-sm">
                    Proceed
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TreatmentTable;
