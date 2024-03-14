import { useState, useEffect } from 'react';
/// thay đổi bên này thành lấy api từ cái cart
export const List = (props) => {
    const [timeshares, setTimeshares] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/timeshare')
            .then((res) => res.json())
            .then((timeshare) => {
                setTimeshares(timeshare);
            });
    }, []);
    const timeshareArray = timeshares.map((item) => {
        return {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.timeshare_image,
        };
    });
    return timeshareArray;
};
