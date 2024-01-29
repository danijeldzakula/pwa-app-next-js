import { cn } from "@/utils/pipes/classNames.pipe";

const data = ['10', '20', '50', '100'];

type AmountState = {
    value: string;
    onChange: (type: string, value: string) => void;
}

export default function Amount({ value, onChange } : AmountState) {
    return (
        <div>
            <form className="flex gap-4">
                {data.map((item, idx) => {
                    return (
                        <label htmlFor={idx.toString()} key={item} className={cn("border-[1px] border-zinc-200 flex gap-2 font-semibold", item === value ? 'bg-black text-white' : '')}>
                            <input id={idx.toString()} checked={value === item} onChange={() => onChange('size', item)} className="hidden" type='radio' name='amount' value={item}  />
                            <span className="p-4 block">{item}</span>
                        </label>
                    )
                })}
            </form>
        </div>
    )
}