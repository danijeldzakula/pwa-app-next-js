import { cn } from "@/utils/pipes/classNames.pipe";

const pickers: string[] = ['1d', '1m', '1y'];

type DatePickerState = {
    value: string;
    onClick: (type: string, value: string) => void;
}

export default function DateFilter({ value, onClick } : DatePickerState) {
    const isSelected = (val: string) => {
        if (val === value) {
            return 'bg-black text-white';
        }

        return '';
    }

    return (
        <div className="flex gap-4">
            {pickers.map((picker) => {
                return (
                    <button onClick={() => onClick('date', picker)} className={cn("p-4 border-[1px] border-zinc-200  font-semibold", isSelected(picker))} key={picker} type='button'>{picker}</button>
                )
            })}
        </div>
    )
}