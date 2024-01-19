import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotesState {
    text: string;
    note: string[];
}

const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        text: '',
        note: []
    } as NotesState,
    reducers: {
        add(state, action) {
            state.text = action.payload;
            state.note.push(state.text);
        },
        remove(state, action) {
            state.note.splice(action.payload, 1);
        },
        update(state, action: PayloadAction<{ idx: number; note: string }>) {
            state.note[action.payload.idx] = action.payload.note;
        },
        clear(state) {
            state.note.length = 0;
        }
    }
});

export const notesActions = notesSlice.actions;
export default notesSlice;