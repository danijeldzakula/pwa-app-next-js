'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Amount from "@/components/filters/amount";
import DateFilter from "@/components/filters/date-filter";
import Pagination from "@/components/filters/pagination";
import DatePicker from '@/components/date-picker/DatePicker';

/**
 * Query params setter of javascript 
 * https://medium.com/@martinval11/how-to-change-the-url-parameters-in-real-time-using-next-js-14-76f25d63cec6 
 */

export default function Section() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const date = searchParams.get('date') || '1m';
    const size = searchParams.get('size') || '20';
    const page = searchParams.get('page') || '1';

    const onChange = (type: string, value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set(type, value.toString());
        } else {
            params.delete(type);
        }

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    const handleClear = () => {
        router.replace(pathname);
    }

    return (
        <div>
            <div className='h-screen grid items-center justify-center'>
                <DatePicker className='' />
            </div>

            <div className='flex justify-between mt-8'>
                <button onClick={handleClear} type="button">Clear all</button>
                <DateFilter onClick={onChange} value={date} />
            </div>

            <div className="py-8 my-4"></div>

            <div className='flex justify-between'>
                <Amount onChange={onChange} value={size} />
                <Pagination currentPage={page.toString()} totalPage={50} onClick={onChange} />
            </div>
        </div>
    )
}