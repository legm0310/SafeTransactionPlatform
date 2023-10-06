// import React, { Fragment, useState } from "react";
// import classes from "./OrderButton.module.css";

// const OrderButton = ({ setSortedProducts }) => {
//     const [sortType, setSortType] = useState("");
//     const [products, setProducts] = useState([
//         {
//             id: 1,
//             name: "Product 1",
//             price: 10,
//             dateAdded: "2022-01-01"
//         },
//         {
//             id: 2,
//             name: "Product 2",
//             price: 20,
//             dateAdded: "2022-01-02"
//         },
//         {
//             id: 3,
//             name: "Product 3",
//             price: 15,
//             dateAdded: "2022-01-03"
//         }
//     ]);

//     const handleSort = (type) => {
//         setSortType(type);
//         const sorted = [...products];
//         switch (type) {
//         case "latest":
//             sorted.sort((a, b) => new Date(b.dateAdded) - new Date(b.dateAdded));
//             break;
//         case "oldest":
//             sorted.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
//             break;
//         case "highest":
//             sorted.sort((a, b) => b.price - a.price);
//             break;
//         case "lowest":
//             sorted.sort((a, b) => a.price - b.price);
//             break;
//         default:
//             break;
//         }
//         setSortedProducts(sorted);
//     };

//     return (
//         <Fragment>
//         <div className={classes.buttonList}>
//             <button className={sortType === "latest" ? classes.selected : null} onClick={() => handleSort("latest")}>최신순</button>
//             <button className={sortType === "oldest" ? classes.selected : null} onClick={() => handleSort("oldest")}>오래된순</button>
//             <button className={sortType === "highest" ? classes.selected : null} onClick={() => handleSort("highest")}>높은 가격순</button>
//             <button className={sortType === "lowest" ? classes.selected : null} onClick={() => handleSort("lowest")}>낮은 가격순</button>
//         </div>
//         </Fragment>
//     );
// };

// export default OrderButton;

import React, { Fragment, useState } from "react";
import classes from "./OrderButton.module.css";

const OrderButton = () => {
    const [products, setProducts] = useState([
        { id: 1, name: "Product 1", price: 100, dateAdded: "2022-04-20" },
        { id: 2, name: "Product 2", price: 200, dateAdded: "2022-04-21" },
        { id: 3, name: "Product 3", price: 150, dateAdded: "2022-04-22" },
        { id: 4, name: "Product 4", price: 300, dateAdded: "2022-04-23" },
        { id: 5, name: "Product 5", price: 250, dateAdded: "2022-04-24" },
    ]);

    const [sortedProducts, setSortedProducts] = useState([...products]);

    const [sortType, setSortType] = useState("latest");

    // 정렬하는 버튼
    const handleSort = (type) => {
        setSortType(type);
        const sorted = [...products];
        switch (type) {
            case "latest":
                sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                break;
            case "oldest":
                sorted.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
                break;
            case "highest":
                sorted.sort((a, b) => b.price - a.price);
                break;
            case "lowest":
                sorted.sort((a, b) => a.price - b.price);
                break;
            default:
                break;
        }
        setSortedProducts(sorted);
    };

    return (
        <Fragment>
            <div className={classes.buttonList}>
                <button className={sortType === "latest" ? classes.selected : null} onClick={() => handleSort("latest")}>
                    최신순
                </button>
                <button className={sortType === "oldest" ? classes.selected : null} onClick={() => handleSort("oldest")}>
                    오래된순
                </button>
                <button className={sortType === "highest" ? classes.selected : null} onClick={() => handleSort("highest")}>
                    높은 가격순
                </button>
                <button className={sortType === "lowest" ? classes.selected : null} onClick={() => handleSort("lowest")}>
                    낮은 가격순
                </button>
            </div>
            <div className={classes.productList}>
                {sortedProducts.map((product) => (
                    <div className={classes.product} key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.price}</p>
                        <p>{product.dateAdded}</p>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default OrderButton;
