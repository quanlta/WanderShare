import styles from './Chart.module.scss';
import classNames from 'classnames/bind';
import { BarChart } from '@mui/x-charts/BarChart';

const cx = classNames.bind(styles);
const Chart = () => {
    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    // const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Thursday', 'Saturday', 'Sunday'];
    return (
        <div className={cx('chart')}>
            <div className={cx('title')}>Sales</div>
            <BarChart
                width={800}
                height={600}
                series={[
                    // { data: pData, label: 'pv', id: 'pvId' },
                    { data: uData },
                ]}
                xAxis={[{ data: xLabels, scaleType: 'band' }]}
                sx={{
                    '& rect': {
                        fill: 'rgb(99, 102, 241)',
                    },
                }}
            />
        </div>
    );
};
export default Chart;
