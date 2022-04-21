import React from 'react';
import PropTypes from 'prop-types';
import s from './Contacts.module.css';
import { useDispatch,useSelector } from 'react-redux';
import { deleteContact } from '../redux/itemsSlice';

function Contacts() {
  const dispatch = useDispatch();
  const contactList = useSelector(state=>state.items.items)
  const filter = useSelector(state=>state.filter)
  console.log(filter)

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    console.log(contactList)
    return  contactList.filter(contact =>
      // console.log(contact.name)
      contact.name.toLowerCase().includes(normalizeFilter)
      
    );
  };

// const contacts = useSelector(state=>state.items.items)

 
return (
    <ul className={s.contactLict}>
      {getVisibleContacts().map(({ name, phone, id }) => (
        <li key={id} className={s.contactLictItem}>
          {name}
          <span>{phone}</span>
          <button
            type="button"
            className={s.btnDel}
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.array,
};

export default Contacts;
