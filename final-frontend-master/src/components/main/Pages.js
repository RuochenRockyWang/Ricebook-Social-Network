// import { useEffect, useInsertionEffect, useState } from "react";
// import ReactPaginate from "react-paginate";
// import Post from './Post.js'

// // export class Pages extends Component {
// //     constructor(props) {
// //         super(props)
    
// //         this.state = {
// //              data: this.props.filteredPosts
// //         }

// //     }
// // }

// export default function Pages(props){
//     const {data} = props;
//     const [currentItems, setCurrentItems] = useState([]);
//     const [pageCount, setPageCount] = useState(0);
//     const [itemOffset, setItemOffset] = useState(0);
//     const itemsPerPage = 6;

//     const endOffset = itemOffset + itemsPerPage;
//     setCurrentItems(data.slice(itemOffset,endOffset));
//     setPageCount(Math.ceil(data.length/ itemsPerPage));
    
//     // useInsertionEffect(() => {
//     //     const endOffset = itemOffset + itemsPerPage;
//     //     setCurrentItems(data.slice(itemOffset,endOffset));
//     //     setPageCount(Math.ceil(data.length/ itemsPerPage));
//     // },[itemOffset,itemsPerPage,data]);

//     const handlePageClick = (event) =>{
//         console.log(data)
//         const newOffset = (event.selected + itemsPerPage) % data.length;
//         setItemOffset(newOffset);
//     };
//     return (
//         <>
//             <div className="pages">
//                 {currentItems.map(article => (
//                     <Post postText={article.text} postTimeStamp = {article.date} postAuthor = {article.author}/>
//                 ))}
//             </div>
//         <ReactPaginate
//             breakLabel = "..."
//             nextLabel = "next >"
//             onPageChange={() => handlePageClick}
//             pageRangeDisplayed = {5}
//             pageCount = {pageCount}
//             previousLabel = "< previous"
//             renderOnZeroPageCount={null}
//         />
//         </>
//     )
// }