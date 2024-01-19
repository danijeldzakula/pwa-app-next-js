'use client';

import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "@/utils/redux/feature/counterSlice";
import { useCallback } from "react";

export default function Counter() {
    const counter = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
   
    const handleDecrement = () => {
        dispatch(counterActions.decrement());
    }

    const handleIncrement = () => {
        dispatch(counterActions.increment());
    }

    const handleReset = () => {
        dispatch(counterActions.reset());
    }

    const renderCount = useCallback(() => {
        const odd = counter % 2 !== 0;
    
        if (odd) {
            return <span className="text-red-500 min-w-7 flex text-center">{counter}</span>
        }

        return <span className="text-blue-500 min-w-7 flex text-center">{counter}</span>;
    }, [counter]);

    const renderReset = useCallback(() => {
        if (counter < 1) {
            return null;
        }

        return <button onClick={handleReset}>Reset</button>
    }, [counter, handleReset]);


    console.log('re-render counter');

    return (
        <div className="flex gap-4">
            <button onClick={handleDecrement}>Decrement</button>
            <span>{renderCount()}</span>
            <button onClick={handleIncrement}>Increment</button>
            {renderReset()}
        </div>
    )
}