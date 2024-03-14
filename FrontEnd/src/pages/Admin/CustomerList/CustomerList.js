import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import classNames from 'classnames/bind';
import styles from './CustomerList.module.scss';
import AdminLayout from '../AdminLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const cx = classNames.bind(styles);

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editCustomer, setEditCustomer] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
    });
    const [newCustomer, setNewCustomer] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
    });
    const [selectedCustomerId, setselectedCustomerId] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);
    const closeEdit = () => {
        setShowEdit(false);
    };
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/user/admin/getAll');
            //http://localhost:8080/api/v1/user/admin/getAll
            setCustomers(response.data.map((customer, index) => ({ ...customer, id: index + 1 })));
        } catch (error) {
            console.error('Error fetching Customers:', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        // { field: 'user_id', headerName: 'USER ID', width: 250 },
        { field: 'username', headerName: 'USER NAME', width: 350 },
        { field: 'email', headerName: 'EMAIL', width: 350 },
        { field: 'phone', headerName: 'PHONE', width: 350 },
        // {
        //     field: 'action',
        //     headerName: 'Action',
        //     sortable: false,
        //     width: 200,
        //     renderCell: (params) => (
        //         <div className={cx('action-container')}>
        //             {/* <div className={cx('action-container-delete')}>
        //                 <FontAwesomeIcon
        //                     icon={faEyeSlash}
        //                     className={cx('icon', 'trash-icon')}
        //                     onClick={() => handleDisabledCustomer(params.row.id)}
        //                 />
        //             </div> */}
        //         </div>
        //     ),
        // },
    ];
    //search Customer
    const filteredCustomer = customers.filter((customer) =>
        customer.username?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const rows = filteredCustomer.map((customers) => ({
        id: customers.id,
        // user_id: customers.user_id,
        username: customers.username,
        email: customers.email,
        phone: customers.phone,
    }));

    //add timeshares
    const handleAddCustomer = async () => {
        const formattedCustomer = {
            // id: newTimeshare.id, // Đảm bảo có giá trị ID
            user_id: newCustomer.email,
            username: newCustomer.username,
            password: newCustomer.password,
            email: newCustomer.email,
            phone: newCustomer.phone,
        };

        //prevent to become string

        // formattedCustomer.phone = parseInt(formattedCustomer.phone);

        try {
            await axios.post('https://6548acbfdd8ebcd4ab235e3e.mockapi.io/swp', formattedCustomer);
            // update Customer after add
            fetchCustomers();
            // reset Customer after add
            fetchCustomers({
                username: '',
                password: '',
                email: '',
                phone: '',
            });
            setShowModal(false);
        } catch (error) {
            console.error('Error adding Customer:', error);
        }
    };
    return (
        <AdminLayout>
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
                        <h1>Customer List</h1>
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
                            <div className={cx('add-customer-form')}>
                                <div className={cx('modal-content')}>
                                    <div>
                                        <h1>Add Timeshare</h1>
                                    </div>
                                    <div className={cx('close')}>
                                        <span onClick={closeModal}>&times;</span>
                                    </div>
                                    <div className={cx('username')}>
                                        <input
                                            type="text"
                                            placeholder="username"
                                            value={newCustomer.username}
                                            onChange={(e) =>
                                                setNewCustomer({ ...newCustomer, username: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className={cx('password')}>
                                        <input
                                            type="password"
                                            placeholder="password"
                                            value={newCustomer.password}
                                            onChange={(e) =>
                                                setNewCustomer({ ...newCustomer, password: e.target.value })
                                            }
                                            required
                                        />

                                        {/* </div> */}
                                    </div>
                                    <div className={cx('email')}>
                                        <input
                                            type="text"
                                            placeholder="email"
                                            value={newCustomer.email}
                                            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className={cx('phone')}>
                                        <input
                                            type="number"
                                            placeholder="phone"
                                            value={newCustomer.phone}
                                            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <button onClick={handleAddCustomer}>SUBMIT</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={cx('data')}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            style={{ fontSize: '1.5rem' }}
                            pagination
                            pageSize={10}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
