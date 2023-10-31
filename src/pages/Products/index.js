import React, { useEffect, useState } from 'react'
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../../apiProd';
import { getSubcategories } from '../../apiseb';
import DeleteConfirmationModalProd from '../../components/ConfirmProdDelte';
import { toast } from 'react-toastify';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [subCategorey, setSubCategorey] = useState([]);
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

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.error('Error fetching sub-categories:', error);
      });
    getSubcategories()
      .then((data) => {
        setSubCategorey(data);
      })
      .catch((error) => {
        console.error('Error fetching main categories:', error);
      });
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sub_category_id: '',
    imageUrl: '',
    CATCODE: '',
    subCategoryId: "",
    price: ""

  });
  const [selectedProducts, setselectedProducts] = useState(null);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.error('Error fetching sub-categories:', error);
      });
  }, []);

  const openModal = (subCategory) => {
    if (subCategory) {
      setFormData(subCategory);
      setselectedProducts(subCategory);
    } else {
      setFormData({
        name: '',
        description: '',
        sub_category_id: '27',
        imageUrl: 'www',
        CATCODE: '',
        subCategoryId: "",
        price: "",
        
      });
      setselectedProducts(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProducts) {
      updateProduct(selectedProducts.id, formData)
        .then(() => {
          getAllProducts()
            .then((data) => {
              setProducts(data.data);
              showSuccessToast('product updated successfully');

              closeModal();
            })
            .catch((error) => {
              console.error('Error fetching sub-categories:', error);
              showErrorToast('Failed to update product');

            });
        })
        .catch((error) => {
          console.error('Error updating sub-category:', error);
        });
    } else {
      createProduct(formData)
        .then(() => {
          getAllProducts()
            .then((data) => {
              setProducts(data.data);
              showSuccessToast('product created successfully');

              closeModal();
            })
            .catch((error) => {
              console.error('Error fetching sub-categories:', error);
              showErrorToast('Failed to create product');

            });
        })
        .catch((error) => {
          console.error('Error creating sub-category:', error);
        });
    }
  };
  const handleMainCategoryChange = (e) => {
    const selectedMainCategoryId = e.target.value ;
    setFormData({ ...formData, sub_category_id: selectedMainCategoryId, subCategoryId: selectedMainCategoryId });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFormData({ ...formData, imageUrl: base64 })
  };
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // ... Existing code ...

  const handleDelete = (productId) => {
    setProductToDelete(productId); // Store the product ID to be deleted
    setShowDeleteConfirmationModal(true); // Show the confirmation modal
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      deleteProduct(productToDelete)
        .then(() => {
          getAllProducts()
            .then((data) => {
              setProducts(data.data);
              showSuccessToast('product deleted successfully');

            })
            .catch((error) => {
              showErrorToast('Failed to delete product');

              console.error('Error fetching sub-categories:', error);
            });
          setShowDeleteConfirmationModal(false); // Close the confirmation modal
        })
        .catch((error) => {
          console.error('Error deleting sub-category:', error);
        });
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
    <section className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card" style={{ boxShadow: '0px 0px 6px rgba(1, 41, 112, 0.1)' }}>
            <div className="card-body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5 className="card-title"></h5>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#verticalycenteredProducts"
                  style={{ width: "auto", height: "fit-content", marginTop: "10px", color: "#012970", background: "#f6f9ff" }} class="btn btn-info"><i class="bi bi-plus-square-dotted"></i></button>
              </div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th style={{ color: "#012970" }} scope="col">ID</th>
                    <th style={{ color: "#012970" }} scope="col">Name</th>
                    <th style={{ color: "#012970" }} scope="col">Description</th>
                    <th style={{ color: "#012970" }} scope="col">Price</th>
                    <th style={{ color: "#012970" }} scope="col">CATCODE</th>
                    <th style={{ color: "#012970" }} scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                    {currentProducts.map((product, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>{product.price}</td>
                          <td>{product.CATCODE}</td>
                          <td>
                            <i data-bs-toggle="modal"
                              data-bs-target="#verticalycenteredProducts" onClick={() => openModal(product)} style={{ marginLeft: "10px", cursor: "pointer" }} className="bi bi-pencil-fill"></i>
                            <i
                              data-bs-toggle="modal"
                              data-bs-target="#verticalycenteredDeleteProduct"
                              style={{ marginLeft: "10px", cursor: "pointer" }} onClick={() => handleDelete(product.id)} className="bi bi-trash-fill"></i>
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
                        onClick={() => handlePageChange(currentPage - 1)}>
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <a
                          className="page-link"
                          href="#"
                          onClick={() => handlePageChange(index + 1)}>
                          {index + 1}
                        </a>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(products.length / itemsPerPage) ? 'disabled' : ''}`}>
                      <a
                        className="page-link"
                        href="#"
                        aria-label="Next"
                        onClick={() => handlePageChange(currentPage + 1)}>
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="modal fade" id="verticalycenteredProducts" tabIndex={-1}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Product</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Enter product price" />
                </div>
                <div className="mb-3">
                  <label htmlFor="subCategoryId" className="form-label">
                    Sub Category
                  </label>
                  <select
                    className="form-select"
                    id="subCategoryId"
                    value={formData.sub_category_id || formData.subCategoryId}
                    onChange={handleMainCategoryChange}
                  >
                    <option value="">Select Sub Category</option>
                    {subCategorey.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Product Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    onChange={handleFileUpload}

                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="catcode" className="form-label">
                    Catcode
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="catcode"
                    placeholder="Enter catcode"
                    value={formData.CATCODE}
                    onChange={(e) => setFormData({ ...formData, CATCODE: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  data-bs-dismiss="modal"
                  type="submit" className="btn btn-primary">
                  {selectedProducts ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <DeleteConfirmationModalProd
        show={showDeleteConfirmationModal}
        onClose={() => setShowDeleteConfirmationModal(false)}
        onDelete={confirmDeleteProduct}
      />
    </>

  )
}

export default Products