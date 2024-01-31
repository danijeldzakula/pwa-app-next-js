import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Button } from "@/components/ui/button";

type Props = {
    className?: string
}

export default function DatePicker({ className }: Props) {
    const initialState = {
        from: new Date(),
        to: addDays(new Date(), 0),
    }

    const [date, setDate] = useState<DateRange | undefined>(initialState);

    const handleClear = () => {
        setDate(initialState);
    }

    return (
        <div>
            <Button className="w-full flex justify-between gap-4">
                <div className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-red-500" />
                    {date?.from ? (
                        date.to ? (
                            <>
                                {format(date.from, "LLL dd, y")}
                                <span>---</span>
                                {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                    ) : (
                        <span>Pick a date</span>
                    )}
                </div>

                <span onClick={handleClear} className="flex items-center justify-center w-8 h-8 bg-red-500">x</span>
            </Button>
            <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                className={className}
            />
        </div>
    )
} 