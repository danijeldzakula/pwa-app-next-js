// import { cn } from "@/utils/pipes/classNames.pipe";

// type PaginationState = {
//     currentPage: string;
//     totalPage: number;
//     onClick: (type: string, value: string) => void;
// }

// export default function Pagination({ currentPage, totalPage, onClick }: PaginationState) {
//     // const paginations = Array.from({ length: totalPage }, (_, index) => index + 1);
//     // const isLast = paginations[paginations.length - 1].toString();
//     // const prevPage = +currentPage - 1;
//     // const nextPage = +currentPage + 1;

//     // const isPrevDisabled = +currentPage <= 1 ? true : false;
//     // const isNextDisabled = +currentPage >= +isLast ? true : false;

//     // const hasPrevCursor = isPrevDisabled ? 'cursor-not-allowed opacity-50' : '';
//     // const hasNextCursor = isNextDisabled ? 'cursor-not-allowed opacity-50' : '';
//     const prevPage = +currentPage - 1;
//     const nextPage = +currentPage + 1;

//     const isPrevDisabled = +currentPage <= 1;
//     const isNextDisabled = +currentPage >= totalPage;

//     const hasPrevCursor = isPrevDisabled ? 'cursor-not-allowed opacity-50' : '';
//     const hasNextCursor = isNextDisabled ? 'cursor-not-allowed opacity-50' : '';

//     let startPage = Math.max(1, +currentPage - 1);
//     let endPage = Math.min(totalPage, startPage + 2);

//     if (endPage - startPage < 2) {
//         startPage = Math.max(1, endPage - 2);
//     }

//     const paginations = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
//     const isLast = paginations[paginations.length - 1].toString();


//     return (
//         <div className="flex gap-4">
//             <button disabled={isPrevDisabled} onClick={() => onClick('page', '1')} className={cn("p-4 border-[1px] border-zinc-200", hasPrevCursor)} type="button">First</button>
//             <button disabled={isPrevDisabled} onClick={() => onClick('page', prevPage.toString())} className={cn("p-4 border-[1px] border-zinc-200", hasPrevCursor)} type="button">Prev</button>
//             {paginations.map((_, idx) => {
//                 const index = idx + 1;
//                 return <button onClick={() => onClick('page', index.toString())} key={idx} className={cn("p-4 border-[1px] border-zinc-200", currentPage === index.toString() && 'bg-blue-500 text-white')} type="button">{idx + 1}</button>
//             })}
//             <button disabled={isNextDisabled} onClick={() => onClick('page', nextPage.toString())} className={cn("p-4 border-[1px] border-zinc-200", hasNextCursor)} type="button">Next</button>
//             <button disabled={isNextDisabled} onClick={() => onClick('page', isLast)} className={cn("p-4 border-[1px] border-zinc-200", hasNextCursor)} type="button">Last</button>
//         </div>
//     )
// }

// import { cn } from "@/utils/pipes/classNames.pipe";

// type PaginationState = {
//     currentPage: string;
//     totalPage: number;
//     onClick: (type: string, value: string) => void;
// }

// export default function Pagination({ currentPage, totalPage, onClick }: PaginationState) {
//     const prevPage = +currentPage - 1;
//     const nextPage = +currentPage + 1;

//     const isPrevDisabled = +currentPage <= 1;
//     const isNextDisabled = +currentPage >= totalPage;

//     const hasPrevCursor = isPrevDisabled ? 'cursor-not-allowed opacity-50' : '';
//     const hasNextCursor = isNextDisabled ? 'cursor-not-allowed opacity-50' : '';

//     let startPage = Math.max(1, +currentPage - 1);
//     let endPage = Math.min(totalPage, startPage + 2);

//     if (totalPage - endPage < 2) {
//         endPage = totalPage;
//         startPage = Math.max(1, endPage - 2);
//     }

//     const paginations = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

//     return (
//         <div className="flex gap-4">
//             <button disabled={isPrevDisabled} onClick={() => onClick('page', '1')} className={cn("p-4 border-[1px] border-zinc-200", hasPrevCursor)} type="button">First</button>
//             <button disabled={isPrevDisabled} onClick={() => onClick('page', prevPage.toString())} className={cn("p-4 border-[1px] border-zinc-200", hasPrevCursor)} type="button">Prev</button>
//             {paginations.map((pageNumber) => (
//                 <button
//                     key={pageNumber}
//                     onClick={() => onClick('page', pageNumber.toString())}
//                     className={cn("p-4 border-[1px] border-zinc-200", currentPage === pageNumber.toString() && 'bg-blue-500 text-white')}
//                     type="button">
//                     {pageNumber}
//                 </button>
//             ))}
//             <button disabled={isNextDisabled} onClick={() => onClick('page', nextPage.toString())} className={cn("p-4 border-[1px] border-zinc-200", hasNextCursor)} type="button">Next</button>
//             <button disabled={isNextDisabled} onClick={() => onClick('page', totalPage.toString())} className={cn("p-4 border-[1px] border-zinc-200", hasNextCursor)} type="button">Last</button>
//         </div>
//     );
// }
