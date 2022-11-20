import React from 'react';
import { Message, Box, Button, Info, Li } from './ContactList-styled';
import { FcInfo } from 'react-icons/fc';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeContacts } from '../../redux/contactsSlice';

export const ContactList = ({ contact }) => {
  const dispatch = useDispatch();

  const deleteContact = contactID => {
    dispatch(removeContacts(contactID));
  };

  return (
    <>
      {contact.length === 0 && <Message>No contacts here ...</Message>}
      {contact.length > 0 && (
        <ul>
          {contact.map(item => {
            return (
              <Li key={item.id}>
                <Box>
                  <Info>
                    <FcInfo size={24} />
                    {item.name} : (Tel: - {item.number})
                  </Info>
                  <Button type="button" onClick={() => deleteContact(item.id)}>
                    Delete
                  </Button>
                </Box>
              </Li>
            );
          })}
        </ul>
      )}
    </>
  );
};

ContactList.propTypes = {
  contact: PropTypes.array.isRequired,
};
