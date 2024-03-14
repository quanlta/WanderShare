import { DataGrid } from '@mui/x-data-grid';
import AdminLayout from '../AdminLayout';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const cx = classNames.bind(styles);
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function AdminOrder() {
    const add = () => {
        alert('alo');
    };
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const columns = [
        { field: 'id', headerName: 'OrderID', width: 120 },
        { field: 'user_id', headerName: 'Customer', width: 200 },

        {
            field: 'orderdate',
            headerName: 'Date',
            width: 170,
            renderCell: (params) => {
                return <div className={cx('date')}>{params.row.orderdate}</div>;
            },
        },
        {
            field: 'shipping_address',
            headerName: 'Address',
            width: 350,
            renderCell: (params) => {
                return <div className={cx('address')}>{params.row.shipping_address}</div>;
            },
        },
        {
            field: 'order_status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => {
                return (
                    <div className={cx('status')}>
                        <div className={` ${params.row.order_status == 1 ? 'delivery' : 'pending'}`}>
                            {params.row.order_status === 1 ? (
                                <button className={cx('active-button')} onClick={add}>
                                    DELIVERED
                                </button>
                            ) : (
                                <button className={cx('pending-button')} onClick={add}>
                                    PENDING
                                </button>
                            )}
                        </div>
                    </div>
                );
            },
        },
        {
            field: 'payment_method',
            headerName: 'Payment',
            width: 120,
            renderCell: (params) => {
                return (
                    <div className={cx('payment')}>
                        {params.row.payment_method == '1' ? <span>COD</span> : <span>VNPAY</span>}
                    </div>
                );
            },
        },
        {
            field: 'order_total',
            headerName: 'Total',
            width: 100,
        },
        // {
        //     field: 'pantone_value',
        //     headerName: 'Pantone',
        //     width: 230,
        //     renderCell: (params) => {
        //         return (
        //             <div className={cx('pantone')}>
        //                 <span>{params.row.color}</span>
        //                 <p>{params.row.name}</p>
        //             </div>
        //         );
        //     },
        // },
    ];

    const [rows, setRows] = useState([]);
    const dataGridStyle = {
        fontSize: '16px', // Thay đổi kích thước font ở đây
    };
    const [list, setList] = useState();

    useEffect(() => {
        //goi api
        axios
            .get(
                'http://localhost:8080/api/v1/order/findByBetwenDay?startDate=2021-10-01T00:00:00&endDate=2030-10-31T23:59:59',
            )
            .then((res) => {
                setRows(res.data.body);
            });
    }, []);
    const HandleSearch = async () => {
        if (!startDate || !endDate) {
            setError('Please select start and end dates');
            handleOpen();
            return;
        }
        await axios
            .get(
                `http://localhost:8080/api/v1/order/findByBetwenDay?startDate=${startDate}T00:00:00&endDate=${endDate}T00:00:00`,
            )
            .then((res) => {
                setRows(res.data.body);
                setError(null); // Xóa thông báo lỗi khi có dữ liệu trả về
            });
    };
    console.log(rows);
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
                    <div className={cx('header')}>
                        <div className={cx('title')}>Orders</div>
                        <div className={cx('search-start')}>
                            <input
                                type="date"
                                placeholder="Search start"
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className={cx('search-end')}>
                            <input type="date" placeholder="Search end" onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                        <div className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={HandleSearch} />
                        </div>

                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                                backdrop: {
                                    timeout: 500,
                                },
                            }}
                        >
                            <Fade in={open}>
                                <Box sx={style}>
                                    <Typography id="transition-modal-title" variant="h4" component="h3">
                                        Please select start and end dates
                                    </Typography>
                                </Box>
                            </Fade>
                        </Modal>
                    </div>
                    <div className={cx('data')}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            style={{ fontSize: '1.5rem' }}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
