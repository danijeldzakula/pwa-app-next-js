'use client';

import { useSelector, useDispatch } from "react-redux";
import { notesActions } from "@/utils/redux/feature/notesSlice";
import { useCallback, useState } from "react";

interface RootState {
    notes: {
        text: string,
        note: string[];
    };
}

export default function Notes() {
    const notes = useSelector((state: RootState) => state.notes.note);
    const text = useSelector((state: RootState) => state.notes.text);

    const dispatch = useDispatch();
    const [note, setNote] = useState<string>(text);
    const [editIndex, setEditIndex] = useState<number | null>(null);
   
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (editIndex !== null) {
            dispatch(notesActions.update({ idx: editIndex, note }));
            setEditIndex(null);
        } else {
            dispatch(notesActions.add(note));
        }

        setNote('');
    }

    const handleRemove = (idx: number) => {
        dispatch(notesActions.remove(idx));
    }

    const handleUpdate = (idx: number) => {
        setNote(notes[idx]);
        setEditIndex(idx);
    }

    const handleClear = () => {
        dispatch(notesActions.clear());
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setNote(value);
    }

    const renderNotes = useCallback(() => {
        if (notes && notes.length < 1) {
            return <p className="text-zinc-500 text-center">Data not found...</p>
        }

        return notes.map((note, idx) => {
            const count = idx + 1;
            return (
                <li className="flex justify-between" key={idx.toString()}>
                    <p>{count}. {note}</p>

                    <div className="flex gap-2">
                        <button onClick={() => handleUpdate(idx)} className="text-orange-500">Update</button>
                        <button onClick={() => handleRemove(idx)} className="text-red-500">Remove</button>
                    </div>
                </li>
            )
        })
    }, [notes]);

    const renderClearAll = useCallback(() => {
        if (notes && notes.length < 1) {
            return null;
        }

        return <button onClick={handleClear}>Clear All</button>
    }, [notes, handleClear]);

    console.log('re-render notes');

    return (
        <div className="grid items-start justify-start gap-4">
            <div className="mt-2 border-[1px] border-zinc-300">
                <form onSubmit={handleSubmit}>
                    <input value={note} type="text" className="p-2" placeholder="Notes..." onChange={handleChange} /> 
                    <button type="submit" className="p-2 border-l-[1px] border-zinc-300">Save</button>
                </form>
            </div>

            <ul>
                {renderClearAll()}
                {renderNotes()}
            </ul>
        </div> 
    )
}