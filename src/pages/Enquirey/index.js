import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Enquiry = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  useEffect(() => {
    axios.get('http://localhost:4000/cart/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);
  const handleViewClick = (user) => {
    setSelectedUser(user);
    axios.get(`http://localhost:4000/cart/user/${user.user_id}`)
      .then(response => {
        setUserProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching user products:', error);
      });
  };
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  return (
    <><main id="main" className="main">
      <div className="pagetitle">
        <h1>Enquirey</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item">Enquirey</li>
          </ol>
        </nav>
      </div>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h5 className="card-title">User Enquiry</h5>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th style={{ color: "#012970" }}>#</th>
                      <th style={{ color: "#012970" }} scope="col">User Name</th>
                      <th style={{ color: "#012970" }} scope="col">User Phone</th>
                      <th style={{ color: "#012970" }} scope="col">User Email</th>
                      <th style={{ color: "#012970" }} scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {currentUsers.map((user, index) => (
            <tr key={user.id}>
              <th>{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>
                <i
                  data-bs-toggle="modal"
                  data-bs-target="#verticalycentered"
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleViewClick(user)}
                  className="bi bi-eye-fill"
                ></i>
              </td>
            </tr>
          ))}
                  </tbody>
                </table>
                <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          {users.length > itemsPerPage &&
            Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
        </ul>
      </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main><div className="modal fade" id="verticalycentered" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">User Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              {selectedUser && (
                <div>
                  <h5>Name: {selectedUser.name}</h5>
                  <p>Email: {selectedUser.email}</p>
                  <p>Phone: {selectedUser?.phone}</p>
                </div>
              )}
              <h6>User Products</h6>
              <ul>
                {userProducts && userProducts.map((product) => (
                  <li key={product.productId}>
                    {product.product_name} - {product.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div></>
  );
}

export default Enquiry;
