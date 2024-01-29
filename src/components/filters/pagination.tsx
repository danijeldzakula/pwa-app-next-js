import { cn } from "@/utils/pipes/classNames.pipe";

type PaginationState = {
    currentPage: string;
    totalPage: number;
    onClick: (type: string, value: string) => void;
}

export default function Pagination({ currentPage, totalPage, onClick }: PaginationState) {
    const prevPage = +currentPage - 1;
    const nextPage = +currentPage + 1;

    const isPrevDisabled = +currentPage <= 1;
    const isNextDisabled = +currentPage >= totalPage;

    const hasPrevCursor = isPrevDisabled ? 'cursor-not-allowed opacity-75' : '';
    const hasNextCursor = isNextDisabled ? 'cursor-not-allowed opacity-75' : '';

    let startPage = Math.max(1, +currentPage - 1);
    let endPage = Math.min(totalPage, startPage + 2);

    if (endPage - startPage < 2) {
        startPage = Math.max(1, totalPage - 2);
        endPage = totalPage;
    }

    const paginations = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return (
        <div className="flex gap-4">
            <button disabled={isPrevDisabled} onClick={() => onClick('page', '1')} className={cn("p-4 border-[1px] border-zinc-200 font-semibold", hasPrevCursor)} type="button">First</button>
            <button disabled={isPrevDisabled} onClick={() => onClick('page', prevPage.toString())} className={cn("p-4 border-[1px] border-zinc-200 font-semibold", hasPrevCursor)} type="button">Prev</button>
            {paginations.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => onClick('page', pageNumber.toString())}
                    className={cn("special-class w-[58px] h-[58px] border-[1px] border-zinc-200 font-semibold", currentPage === pageNumber.toString() && 'bg-black text-white')}
                    type="button">
                    {pageNumber}
                </button>
            ))}
            <button disabled={isNextDisabled} onClick={() => onClick('page', nextPage.toString())} className={cn("p-4 font-semibold border-[1px] border-zinc-200", hasNextCursor)} type="button">Next</button>
            <button disabled={isNextDisabled} onClick={() => onClick('page', totalPage.toString())} className={cn("p-4 font-semibold border-[1px] border-zinc-200", hasNextCursor)} type="button">Last</button>
        </div>
    );
}
