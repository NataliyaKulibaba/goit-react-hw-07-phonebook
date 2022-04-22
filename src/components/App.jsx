import { useSelector } from 'react-redux';
import Form from './Form/Form.jsx';
import Section from './Section/Section';
import Contacts from './Contacts/Contacts';
import Filter from './Contacts/Filter/Filter';

import './App.css';

const App = () => {
  const { status, error } = useSelector(state => state.items);

  return (
    <>
      <Section title="Phonebook">
        <Form />
      </Section>

      <Section title="Contacts">
        <Filter />

        <Contacts />
        {status === 'loading' && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
      </Section>
    </>
  );
};

export default App;
