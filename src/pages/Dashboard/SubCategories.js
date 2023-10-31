import React, { useState, useEffect } from 'react';
import {
    getSubcategories,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
} from '../../apiseb';
import { fetchCategories } from '../../api';

import TagsInput from 'react-tagsinput';
import DeleteConfirmationModal from '../../components/ConfirmationModal';
import { toast } from 'react-toastify';

const SubCategories = () => {

    const [subCategories, setSubCategories] = useState([]);
    const [mainCategories, setMainCategories] = useState([]);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);
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
        getSubcategories()
            .then((data) => {
                setSubCategories(data);
            })
            .catch((error) => {
                console.error('Error fetching sub-categories:', error);
            });
        fetchCategories()
            .then((data) => {
                setMainCategories(data);
            })
            .catch((error) => {
                console.error('Error fetching main categories:', error);
            });
    }, []);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        main_category_id: '',
        image: '',
        catcode: '',
        mainCategoryId: ""
    });
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    useEffect(() => {

        getSubcategories()
            .then((data) => {
                setSubCategories(data);
            })
            .catch((error) => {
                console.error('Error fetching sub-categories:', error);
            });
    }, []);

    const openModal = (subCategory) => {
        if (subCategory) {
            setFormData(subCategory);
            setSelectedSubCategory(subCategory);
        } else {
            setFormData({
                name: '',
                description: '',
                main_category_id: '27',
                image: 'www',
                catcode: '',
                mainCategoryId: ""

            });
            setSelectedSubCategory(null);
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedSubCategory) {
            updateSubcategory(selectedSubCategory.id, formData)
                .then(() => {
                    getSubcategories()
                        .then((data) => {
                            setSubCategories(data);
                            showSuccessToast('Subcategory updated successfully');

                            closeModal();
                        })
                        .catch((error) => {
                            console.error('Error fetching sub-categories:', error);
                            showErrorToast('Failed to update sub-category');

                        });
                })
                .catch((error) => {
                    console.error('Error updating sub-category:', error);
                });
        } else {
            createSubcategory(formData)
                .then(() => {
                    getSubcategories()
                        .then((data) => {
                            setSubCategories(data);
                            showSuccessToast('Subcategory created successfully');

                            closeModal();
                        })
                        .catch((error) => {
                            console.error('Error fetching sub-categories:', error);
                            showErrorToast('Failed to create sub-category');

                        });
                })
                .catch((error) => {
                    console.error('Error creating sub-category:', error);
                });
        }
    };
    const handleMainCategoryChange = (e) => {
        const selectedMainCategoryId = e.target.value;
        setFormData({ ...formData, main_category_id: selectedMainCategoryId, mainCategoryId: selectedMainCategoryId });
    };
    const handleDelete = (subCategoryId) => {
        setSubCategoryToDelete(subCategoryId);
        setShowDeleteConfirmationModal(true);
    };
    const confirmDelete = () => {
        if (subCategoryToDelete) {
            deleteSubcategory(subCategoryToDelete)
                .then(() => {
                    getSubcategories()
                        .then((data) => {
                            setSubCategories(data);
                            setShowDeleteConfirmationModal(false);
                            showSuccessToast('Subcategory deleted successfully');

                        })
                        .catch((error) => {
                            console.error('Error fetching sub-categories:', error);
                            showErrorToast('Failed to delete sub-category');

                        });
                })
                .catch((error) => {
                    console.error('Error deleting sub-category:', error);
                });
        }
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
        setFormData({ ...formData, image: base64 })
    };
    const [tags, setTags] = useState([]);

    const handleTagChange = (newTags) => {
        setTags(newTags);
        const description = newTags.join(', ');
        setFormData({ ...formData, description });
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSubCategories = subCategories.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const getMainCategoryName = (mainCategoryId) => {
        const mainCategory = mainCategories.find((category) => category.id === mainCategoryId);
        return mainCategory ? mainCategory.name : 'Main Category Not Found';
    };
    
    return (
        <><div className="col-lg-7">
            <div className="card" style={{ boxShadow: '0px 0px 6px rgba(1, 41, 112, 0.1)' }}>
                <div className="card-body">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h5 className="card-title">Sub-categories</h5>
                        <button
                            onClick={() => openModal()}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#verticalycentered"
                            style={{ width: "auto", height: "fit-content", marginTop: "10px", color: "#012970", background: "#f6f9ff" }} class="btn btn-info"><i class="bi bi-plus-square-dotted"></i></button>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th style={{ color: "#012970" }} scope="col">#</th>
                                <th style={{ color: "#012970" }} scope="col">Name</th>
                                <th style={{ color: "#012970" }} scope="col">Description</th>
                                <th style={{ color: "#012970" }} scope="col">Catcode</th>
                                <th style={{ color: "#012970" }} scope="col">Main_Catogorey</th>
                                <th style={{ color: "#012970" }} scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSubCategories.map((subcategory, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{subcategory.name}</td>
                                    <td>{subcategory.description}</td>
                                    <td>{subcategory.catcode}</td>
                                    <td>{getMainCategoryName(subcategory.main_category_id)}</td>

                                    <td>
                                        <i
                                            data-bs-toggle="modal"
                                            data-bs-target="#verticalycentered"
                                            onClick={() => openModal(subcategory)}
                                            style={{ marginLeft: "10px", cursor: "pointer" }}
                                            className="bi bi-pencil-fill">
                                        </i>
                                        <i
                                            data-bs-toggle="modal"
                                            data-bs-target="#verticalycenteredDelete"
                                            style={{ marginLeft: "10px", cursor: "pointer" }}
                                            onClick={() => handleDelete(subcategory.id)}
                                            className="bi bi-trash-fill">
                                        </i>
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
                            {Array.from({ length: Math.ceil(subCategories.length / itemsPerPage) }).map((_, index) => (
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
                            <li className={`page-item ${currentPage === Math.ceil(subCategories.length / itemsPerPage) ? 'disabled' : ''}`}>
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
            <div className="modal fade" id="verticalycentered" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {selectedSubCategory ? 'Edit Sub-category' : 'Add Sub-category'}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
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
                                        placeholder="Enter sub-category name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <TagsInput
                                        value={tags}
                                        onChange={handleTagChange}
                                        inputProps={{ placeholder: 'Add a tag' }}
                                    />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mainCategoryId" className="form-label">
                                        Main Category
                                    </label>
                                    <select
                                        className="form-select"
                                        id="mainCategoryId"
                                        value={formData.main_category_id || formData.mainCategoryId}
                                        onChange={handleMainCategoryChange}
                                    >
                                        <option value="">Select Main Category</option>
                                        {mainCategories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">
                                        Image
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
                                        catcode
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="catcode"
                                        placeholder="Enter catcode"
                                        value={formData.catcode}
                                        onChange={(e) => setFormData({ ...formData, catcode: e.target.value })}
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
                                    {selectedSubCategory ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <DeleteConfirmationModal
                show={showDeleteConfirmationModal}
                onClose={() => setShowDeleteConfirmationModal(false)}
                onDelete={confirmDelete}
            />
        </>
    )
}

export default SubCategories