import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const getContacts = createAsyncThunk(
  'items /getContacts',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://625d432895cd5855d61dffee.mockapi.io/api/v1/contacts'
      );
      if (!response.ok) {
        throw new Error('Oh my God! It is ERROR!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewContact = createAsyncThunk(
  'items/addNewContact',
  async function (newContact, { rejectWithValue, dispatch }) {
    console.log(newContact);
    console.log(newContact.name);
    console.log(newContact.phone);
    try {
      const response = await fetch(
        'https://625d432895cd5855d61dffee.mockapi.io/api/v1/contacts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newContact),
        }
      );
      if (!response.ok) {
        throw new Error('Oh my God! It is ERROR! You can not add contact');
      }
      const data = await response.json();
      console.log(data);
      dispatch(add(data));

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'items/deleteContact',
  async function (id, { rejectWithValue, dispatch }) {
    console.log(id)
    try {
      const response = await fetch(
        `https://625d432895cd5855d61dffee.mockapi.io/api/v1/contacts/${id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error("Something wrong. Server error!");
      }

      dispatch(remove({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

export const itemsSlice = createSlice({
  name: 'items ',
  initialState: {
    items: [],
    status: null,
    error: null,
  },
  reducers: {
    add(state, action) {
      console.log(state);
      console.log(state.items);
      state.items.push(action.payload);
    },
    remove(state, action) {
      console.log(state);
      console.log(state.items);
      return state.items.filter(item => item.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getContacts.pending]: state => {
      state.status = 'loading';
    },
    [getContacts.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.items = action.payload;
    },
    [getContacts.rejected]: setError,
    [deleteContact.rejected]: setError,
  },
});

export const { add, remove } = itemsSlice.actions;
