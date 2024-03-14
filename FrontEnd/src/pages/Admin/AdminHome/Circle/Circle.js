import styles from './Circle.module.scss';
import classNames from 'classnames/bind';
import { PieChart } from '@mui/x-charts/PieChart';
import images from '../../../../assets/images';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
const Circle = () => {
    const [chart, setChart] = useState({});
    useEffect(() => {
        //goi api users
        axios.get('http://localhost:8080/api/v1/dashboard/getChartCategory').then((res) => {
            setChart(res.data);
        });
    }, []);
    let data = [
        { label: 'Iron', value: 0 },
        { label: 'Wood', value: 0 },
    ];
    if (chart) {
        data = [
            { label: 'Iron', value: chart.metal },
            { label: 'Wood', value: chart.wood },
        ];
    }

    const colors = ['rgb(25,25,112)', 'rgb(199, 117, 18)'];
    return (
        <div className={cx('circle')}>
            <div className={cx('title')}>Circle</div>
            <div className={cx('data')}>
                <PieChart
                    series={[
                        {
                            data: data,
                            cx: 200,
                            cy: 300,
                            innerRadius: 70,
                            outerRadius: 150,
                        },
                    ]}
                    height={500}
                    slotProps={{
                        legend: { hidden: true },
                    }}
                    colors={colors}
                />
                <div className={cx('in4')}>
                    <div className={cx('iron')}>
                        <img src={images.iron} alt="" />
                        <h1>Iron Prodcuts</h1>
                    </div>
                    <div className={cx('wood')}>
                        <img src={images.wood} alt="" />
                        <h1> Wood Timeshares</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Circle;
