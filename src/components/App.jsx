import { useDispatch, useSelector } from 'react-redux';
// import { setFilter } from '../components/redux/filterSlice';


import Form from './Form/Form.jsx';
import Section from './Section/Section';
import Contacts from './Contacts/Contacts';
import Filter from './Contacts/Filter/Filter';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const allContacts = useSelector(state => state.items.items);
  const {status,error} = useSelector(state=>state.items)

  // console.log(filter)

  // const changeFilter = e => {
  //   dispatch(setFilter(e.currentTarget.value));
  // };

  // const getVisibleContacts = () => {
  //   const normalizeFilter = filter.toLowerCase();

  //   console.log(allContacts)
  //   return allContacts.filter(contact =>
  //     // console.log(contact.name)
  //     contact.name.toLowerCase().includes(normalizeFilter)
  //   );
  // };

  return (
    <>
      <Section title="Phonebook">
        <Form />
      </Section>

      <Section title="Contacts">
        <Filter />

        <Contacts  />
        {status==='loading' && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
      </Section>
    </>
  );
};

export default App;
