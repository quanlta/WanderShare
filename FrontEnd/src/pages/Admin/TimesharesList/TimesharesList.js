import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import classNames from 'classnames/bind';
import styles from './TimesharesList.module.scss';
import AdminLayout from '../AdminLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';

import axios from 'axios';

const cx = classNames.bind(styles);

// xu li chuoi rong
// const isEmptyValue = (value) => {
//     return !value || value.trim() === '';
// };

const isValidURL = (url) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
};

function TimeshareList() {
    const [timeshares, setTimeshares] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newTimeshare, setNewTimeshare] = useState({
        category_id: '',
        name: '',
        description: '',
        amount: '',
        price: '',
        timeshare_image: '',
    });
    const [editTimeshare, setEditTimeshare] = useState({
        category_id: '',
        name: '',
        description: '',
        amount: '',
        price: '',
        timeshare_image: '',
    });
    const [formError, setFormError] = useState({});
    const [selectedTimeshareId, setSelectedTimeshareId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        fetchTimeshares();
    }, []);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const closeEdit = () => {
        setShowEdit(false);
    };
    //show timeshares
    const fetchTimeshares = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/v1/timeshare');
            // http://localhost:8080/api/v1/timeshare
            setTimeshares(response.data);
        } catch (error) {
            console.error('Error fetching timeshares:', error);
        }
        setIsLoading(false);
    };
    const categoryMap = {
        1: 'Wooden',
        2: 'Metal',
        // Thêm các mục ánh xạ khác
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name Timeshares', width: 250 },
        { field: 'amount', headerName: 'Amount', width: 100 },
        {
            field: 'category',
            headerName: 'Category',
            width: 100,
            renderCell: (params) => categoryMap[params.row.category] || '',
        },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'is_post', headerName: 'Is Post', width: 100 },
        { field: 'description', headerName: 'Description', width: 250 },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <div className={cx('action-container')}>
                    <div className={cx('action-container-disable')}>
                        <FontAwesomeIcon
                            icon={faEyeSlash}
                            className={cx('icon', 'trash-icon')}
                            onClick={() => handleDisabledTimeshare(params.row.id)}
                        />
                    </div>
                    <div className={cx('action-container-edit')}>
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className={cx('icon', 'edit-icon')}
                            onClick={() => handleEditTimeshare(params.row.id)}
                        />
                    </div>
                </div>
            ),
        },
    ];
    //search timeshares
    const filteredTimeshares = timeshares.filter((timeshare) =>
        timeshare.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    const rows = filteredTimeshares.map((timeshare) => ({
        id: timeshare.id,
        name: timeshare.name,
        amount: timeshare.amount,
        category: timeshare.category_id,
        price: timeshare.price,
        is_post: timeshare.is_post,
        description: timeshare.description,
    }));
    //delete timeshares
    const handleDisabledTimeshare = async (timeshareId) => {
        try {
            await axios.post(`http://localhost:8080/api/v1/timeshare/changePost?id=${timeshareId}`);
            // update timeshares after add
            fetchTimeshares(); // Đảm bảo gọi hàm này nếu bạn muốn cập nhật danh sách sản phẩm sau khi xóa
        } catch (error) {
            console.error(`Error deleting timeshare ${timeshareId}:`, error);
        }
    };

    //edit timeshares
    const handleEditTimeshare = (timeshareId) => {
        console.log(timeshareId);
        const timeshareToEdit = timeshares.find((timeshare) => timeshare.id === timeshareId);

        if (timeshareToEdit) {
            setEditTimeshare(timeshareToEdit);
            setSelectedTimeshareId(timeshareId);
            setShowEdit(true);
        }
    };

    const handleUpdateTimeshare = async () => {
        try {
            await axios.put(`http://localhost:8080/api/v1/timeshare/update?id=${selectedTimeshareId}`, editTimeshare);
            // Cập nhật sản phẩm trong trạng thái form.
            const updatedTimeshares = timeshares.map((timeshare) => {
                if (timeshare.id === selectedTimeshareId) {
                    return editTimeshare;
                }
                return timeshare;
            });

            setTimeshares(updatedTimeshares);

            // Đóng biểu mẫu chỉnh sửa.
            setShowEdit(false);
        } catch (error) {
            console.log(editTimeshare);
            console.error(`Lỗi khi cập nhật sản phẩm ${selectedTimeshareId}:`, error);
        }
    };

    //add timeshares
    const handleAddTimeshare = async () => {
        const errors = validateTimeshare(newTimeshare);

        if (Object.keys(errors).length === 0) {
            // No errors, proceed with adding the timeshare
            const formattedTimeshare = {
                category_id: newTimeshare.category_id,
                name: newTimeshare.name,
                description: newTimeshare.description,
                amount: parseInt(newTimeshare.amount),
                price: parseFloat(newTimeshare.price),
                timeshare_image: newTimeshare.timeshare_image,
            };

            if (!formattedTimeshare.category_id) {
                formattedTimeshare.category_id = 1; // Set default value if not chosen
            }

            try {
                await axios.post('http://localhost:8080/api/v1/timeshare/add', formattedTimeshare);
                // Update timeshares after add
                fetchTimeshares();
                // Reset form values and close the modal
                setNewTimeshare({
                    category_id: '',
                    name: '',
                    description: '',
                    amount: '',
                    price: '',
                    timeshare_image: '',
                    is_customer: true,
                    is_post: true,
                });
                setShowModal(false);
            } catch (error) {
                console.error('Error adding timeshare:', error);
            }
            setFormError({});
        } else {
            // Update the form errors state with the validation errors
            setFormError(errors);
        }
    };

    // const timeshareSchema = Yup.object().shape({
    //     name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    //     description: Yup.string().required('Description is required').min(3, 'Description must be at least 3 words'),
    //     amount: Yup.number()
    //         .required('Amount is required')
    //         .positive('Amount must be a positive integer')
    //         .integer('Amount must be an integer'),
    //     price: Yup.number().required('Price is required').positive('Price must be a positive decimal number'),
    //     timeshare_image: Yup.string().required('Timeshare image is required').url('Invalid URL'),
    // });
    const validateTimeshare = (timeshare) => {
        const errors = {};

        // Validate name
        if (!timeshare.name) {
            errors.name = 'Name is required';
        } else if (timeshare.name.length < 3) {
            errors.name = 'Name must be at least 3 characters';
        }

        // Validate description
        if (!timeshare.description) {
            errors.description = 'Description is required';
        } else if (timeshare.description.length < 3) {
            errors.description = 'Description must be at least 3 words';
        }

        // Validate amount
        if (!timeshare.amount) {
            errors.amount = 'Amount is required';
        } else if (timeshare.amount <= 0) {
            errors.amount = 'Amount must be a positive integer';
        }

        // Validate price
        // Validate price
        if (!timeshare.price) {
            errors.price = 'Price is required';
        } else if (timeshare.price !== 0 && (isNaN(timeshare.price) || timeshare.price <= 0)) {
            errors.price = 'Price must be a positive number';
        }

        // Validate timeshare_image
        if (!timeshare.timeshare_image) {
            errors.timeshare_image = 'Timeshare image is required';
        } else if (!isValidURL(timeshare.timeshare_image)) {
            errors.timeshare_image = 'Invalid URL';
        }

        return errors;
    };
    return (
        <AdminLayout>
            {isLoading ? (
                <div className={cx('loading-spinner')}>
                    <ClipLoader size={35} color={'#123abc'} loading={isLoading} />
                </div>
            ) : (
                <div className={cx('order')}>
                    <div
                        style={{
                            height: '100%',
                            width: '100%',
                            paddingTop: 17,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingBottom: 28,
                        }}
                    >
                        <div className={cx('title')}>
                            <h1>Timeshares List</h1>
                        </div>
                        <div className={cx('search-add')}>
                            <input
                                type="text"
                                placeholder="Search Timeshares"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            <button onClick={openModal}> Add </button>
                        </div>

                        {/* Form modal ADD timeshares */}
                        <div>
                            {showModal && (
                                <div className={cx('add-timeshare-form')}>
                                    <div className={cx('modal-content')}>
                                        <div>
                                            <h1>Add Timeshare</h1>
                                        </div>
                                        <div className={cx('close')}>
                                            <span onClick={closeModal}>&times;</span>
                                        </div>
                                        <div className={cx('name')}>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={newTimeshare.name}
                                                required
                                                onChange={(e) => setNewTimeshare({ ...newTimeshare, name: e.target.value })}
                                            />
                                            {formError.name && (
                                                <div className={cx('error-message')}>{formError.name}</div>
                                            )}
                                        </div>
                                        <div className={cx('amount-category')}>
                                            <input
                                                type="number"
                                                placeholder="Amount"
                                                value={newTimeshare.amount}
                                                required
                                                onChange={(e) =>
                                                    setNewTimeshare({ ...newTimeshare, amount: e.target.value })
                                                }
                                            />
                                            {formError.amount && (
                                                <div className={cx('error-message')}>{formError.amount}</div>
                                            )}
                                            <select
                                                value={editTimeshare.category_id}
                                                onChange={(e) =>
                                                    setEditTimeshare({ ...editTimeshare, category_id: e.target.value })
                                                }
                                            >
                                                <option value="1">Wooden</option>
                                                <option value="2">Metal</option>
                                            </select>
                                        </div>
                                        <div className={cx('price')}>
                                            <input
                                                type="number"
                                                placeholder="Price"
                                                value={newTimeshare.price}
                                                required
                                                onChange={(e) =>
                                                    setNewTimeshare({ ...newTimeshare, price: e.target.value })
                                                }
                                            />
                                            {formError.price && (
                                                <div className={cx('error-message')}>{formError.price}</div>
                                            )}
                                        </div>
                                        <div className={cx('image')}>
                                            <textarea
                                                type="text"
                                                placeholder="Image Url"
                                                value={newTimeshare.timeshare_image}
                                                required
                                                onChange={(e) =>
                                                    setNewTimeshare({ ...newTimeshare, timeshare_image: e.target.value })
                                                }
                                            />
                                            {formError.timeshare_image && (
                                                <div className={cx('error-message')}>{formError.timeshare_image}</div>
                                            )}
                                        </div>
                                        <div className={cx('description')}>
                                            <textarea
                                                type="text"
                                                placeholder="Description"
                                                value={newTimeshare.description}
                                                required
                                                onChange={(e) =>
                                                    setNewTimeshare({ ...newTimeshare, description: e.target.value })
                                                }
                                            />
                                            {formError.description && (
                                                <div className={cx('error-message')}>{formError.description}</div>
                                            )}
                                        </div>

                                        <button onClick={handleAddTimeshare}>SUBMIT</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Form modal EDIT timeshares  */}
                        <div>
                            {showEdit && (
                                <div className={cx('edit-timeshare-form')}>
                                    <div className={cx('modal-content')}>
                                        <div>
                                            <h1>Edit Timeshare</h1>
                                        </div>
                                        <div className={cx('close')}>
                                            <span onClick={closeEdit}>&times;</span>
                                        </div>
                                        <div className={cx('name')}>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={editTimeshare.name}
                                                required
                                                onChange={(e) =>
                                                    setEditTimeshare({ ...editTimeshare, name: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className={cx('amount-category')}>
                                            <input
                                                type="number"
                                                placeholder="Amount"
                                                value={editTimeshare.amount}
                                                required
                                                onChange={(e) =>
                                                    setEditTimeshare({ ...editTimeshare, amount: e.target.value })
                                                }
                                            />
                                            <select
                                                value={editTimeshare.category_id}
                                                onChange={(e) =>
                                                    setEditTimeshare({ ...editTimeshare, category_id: e.target.value })
                                                }
                                            >
                                                <option value="1">Wooden</option>
                                                <option value="2">Metal</option>
                                            </select>
                                            {/* </div> */}
                                        </div>
                                        <div className={cx('price')}>
                                            <input
                                                type="number"
                                                placeholder="Price"
                                                value={editTimeshare.price}
                                                onChange={(e) =>
                                                    setEditTimeshare({ ...editTimeshare, price: e.target.value })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className={cx('image')}>
                                            <textarea
                                                type="text"
                                                placeholder="Image Url"
                                                value={editTimeshare.timeshare_image}
                                                onChange={(e) =>
                                                    setEditTimeshare({ ...editTimeshare, timeshare_image: e.target.value })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className={cx('description')}>
                                            <textarea
                                                type="text"
                                                placeholder="Description"
                                                value={editTimeshare.description}
                                                onChange={(e) =>
                                                    setEditTimeshare({ ...editTimeshare, description: e.target.value })
                                                }
                                                required
                                            />
                                        </div>
                                        <button onClick={handleUpdateTimeshare}>SUBMIT</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={cx('data')}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                style={{ fontSize: '1.5rem' }}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 10 },
                                    },
                                }}
                                pageSizeOptions={[10, 15]}
                            />
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

export default TimeshareList;
