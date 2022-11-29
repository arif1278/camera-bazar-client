import { useQuery } from '@tanstack/react-query';
import React from 'react';



const MyProducts = () => {


const url = "http://localhost:5000/addproducts";

    const { data: addproduct = [] } = useQuery({
        queryKey: ['addproduct'],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })


    return (
        <div className="flex">
            <table className="table table-zebra mx-auto">

                <thead>
                    <tr>
                        <th></th>
                        <th>Phone</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {
                            addproduct?.map((addproduc, i) => <tr
                            key={addproduc._id}
                            >
                                <th>{i + 1}</th>
                                <td>{addproduc.phone}</td>
                                <td>{addproduc.price}</td>
                                <td>available</td>
                                <button><td>delete</td></button>
                            </tr>)
                        }
                </tbody>
            </table>
        </div>
    );
};

export default MyProducts;