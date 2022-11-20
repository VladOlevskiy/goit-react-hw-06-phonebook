import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Form, Label, Field, Button } from './ContactForm-styled';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContacts } from '../../redux/contactsSlice';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { getContacts } from '../../redux/contactsSlice';

yup.addMethod(yup.string, 'numeric', function () {
  return this.matches(/^\d+$/, 'The field should have digits only');
});

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  number: yup.string().numeric().min(12).required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    const id = nanoid();
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === values.name.toLowerCase()
      )
    ) {
      return alert(`${values.name} is already in contacts.`);
    }
    dispatch(addContacts({ id: id, ...values }));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form>
        <Label>
          Name
          <Field
            type="text"
            name="name"
            placeholder="Enter your name..."
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <ErrorMessage name="name" component="div" />
        <Label>
          Phone
          <Field
            type="tel"
            name="number"
            placeholder="Enter your tel..."
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <ErrorMessage name="number" component="div" />
        <Button type="submit">Add contact</Button>
      </Form>
    </Formik>
  );
};
