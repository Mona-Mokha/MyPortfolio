import { useState, useEffect } from "react";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("/api/contacts")
      .then(res => res.json())
      .then(setContacts)
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            {contact.firstname} {contact.lastname} - {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;
