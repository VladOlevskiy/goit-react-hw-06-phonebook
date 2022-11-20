import React from 'react';
import { Box } from './Box/Box';
import { ContactForm } from './ContactForm/ContactForm ';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { FcPhoneAndroid } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { foundedContact } from '../redux/filterSlice';
import { getFilter } from '../redux/filterSlice';
import { getContacts } from '../redux/contactsSlice';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(foundedContact(e.currentTarget.value));
  };

  const normalizedFilterSearch = filter.toLowerCase();

  const FoundedContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilterSearch)
  );
  return (
    <>
      <Box paddingBottom="30px" paddingTop="30px">
        <Box
          paddingBottom="30px"
          display="flex"
          flexDirection="column"
          marginLeft="auto"
          marginRight="auto"
          alignItems="center"
          width="500px"
          boxShadow="0px 1px 7px rgb(0 0 0), 0px 1px 8px rgb(0 0 0 / 67%), 0px 2px 3px rgb(0 0 0 / 47%)"
          borderRadius="0px 0px 4px 4px"
          backgroundColor="#cbcbcb"
          marginBottom="80px"
        >
          <h1>
            <FcPhoneAndroid size={25} />
            Phonebook
          </h1>
          <ContactForm />
          <h2>Contacts</h2>
          {contacts.length >= 1 && (
            <Filter onChange={onChange} value={filter} />
            //  }
          )}
          <ContactList contact={FoundedContact} />
        </Box>
      </Box>
    </>
  );
};
