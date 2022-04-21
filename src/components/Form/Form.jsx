import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addNewContact,getContacts } from '../redux/itemsSlice';

import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import s from './Form.module.css';

function Form() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.items.items);


  const [name, setName] = useState('');
  const [ phone, setPhone] = useState('');
  const [id, setId] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const newContactName = e.target.elements.name.value;
    const newContactPhone = e.target.elements.phone.value;

    const newContact = {
      name: newContactName,
      phone: newContactPhone,
    };

    console.log(newContact)

    const contact = contacts.map(item => item.name);
    contact.includes(newContactName)
      ? Notify.info(`${name} is already in contact`)
      : dispatch(addNewContact(newContact));

    reset();
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  useEffect(() => {
    return setId(nanoid());
  }, [name,  phone]);

  useEffect(()=>{
   dispatch(getContacts())
  },[dispatch])

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'phone':
        setPhone(value);
        break;

      default:
        return;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className={s.formLabel}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label className={s.formLabel}>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={handleInputChange}
            placeholder="Phone"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button className={s.btmAdd} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
}

Form.propTypes = {
  phone: PropTypes.number,
  name: PropTypes.string,
};

export default Form;
