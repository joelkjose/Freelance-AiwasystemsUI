import React, { useEffect, useState } from 'react';
import { fetchCategories, createCategory, deleteCategory, updateCategory } from '../../api';
import DeleteCatModal from '../../components/ConfirmCat';
import { toast } from 'react-toastify';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  useEffect(() => {
    fetchCategories()
      .then(categories => {
        setCategories(categories);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    if (selectedCategoryId) {
      updateCategory(selectedCategoryId, name)
        .then(() => {
          fetchCategories()
            .then(categories => {
              setCategories(categories);
              showSuccessToast('Category updated successfully');
              setNewCategoryName('');
            })
            .catch(error => {
              console.error('Error fetching categories:', error);
              showErrorToast('Failed to update category');
            });
          setSelectedCategoryId(null);
          setNewCategoryName('');
        })
        .catch(error => {
          console.error('Error updating category:', error);
        });
    } else {
      createCategory(name)
        .then(() => {
          fetchCategories()
            .then(categories => {
              setCategories(categories);
              setNewCategoryName('');
              showSuccessToast('Category created successfully');
            })
            .catch(error => {
              console.error('Error fetching categories:', error);
              showErrorToast('Failed to create category');
            });
        })
        .catch(error => {
          console.error('Error creating category:', error);
        });
    }
  };

  const handleEditCategory = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setNewCategoryName(categoryName);
  };

  const handleNameChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleDeleteCategory = (categoryId) => {
    setCategoryToDelete(categoryId);
    setShowDeleteConfirmationModal(true);
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete)
        .then(() => {
          fetchCategories()
            .then(categories => {
              setCategories(categories);
            })
            .catch(error => {
              console.error('Error fetching categories:', error);
            });
          setShowDeleteConfirmationModal(false);
          showSuccessToast('Category deleted successfully');
        })
        .catch(error => {
          console.error('Error deleting category:', error);
          showErrorToast('Failed to delete category');
        });
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="col-lg-5">
        <div className="card" style={{ boxShadow: '0px 0px 6px rgba(1, 41, 112, 0.1)' }}>
          <div className="card-body">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h5 className="card-title">Categories</h5>
              <button style={{ width: "auto", height: "fit-content", marginTop: "10px", color: "#012970", background: "#f6f9ff" }}
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#verticalycenteredsecond"
                className="btn btn-info"
              ><i className="bi bi-plus-square-dotted"></i></button>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th style={{ color: "#012970" }}>#</th>
                  <th style={{ color: "#012970" }} scope="col">Name</th>
                  <th style={{ color: "#012970" }} scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((category, index) => (
                  <tr key={category.id}>
                    <th>{index + 1}</th>
                    <td>{category.name}</td>
                    <td>
                      <i
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#verticalycenteredsecond"
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        className="bi bi-pencil-fill"
                        onClick={() => handleEditCategory(category.id, category.name)}
                      ></i>

                      <i
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        className="bi bi-trash-fill"
                        data-bs-toggle="modal"
                        data-bs-target="#verticalycenteredDeleteCat"
                        onClick={() => handleDeleteCategory(category.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Previous"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }).map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
                <li className={`page-item ${currentPage === Math.ceil(categories.length / itemsPerPage) ? 'disabled' : ''}`}>
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Next"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="modal fade" id="verticalycenteredsecond" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedCategoryId ? 'Edit Category' : 'Add Category'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleCategorySubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter category name"
                    value={newCategoryName}
                    onChange={handleNameChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">{selectedCategoryId ? 'Save Changes' : 'Add Category'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <DeleteCatModal
        show={showDeleteConfirmationModal}
        onClose={() => setShowDeleteConfirmationModal(false)}
        onDelete={confirmDeleteCategory}
      />
    </>
  );
};

export default Categories;
