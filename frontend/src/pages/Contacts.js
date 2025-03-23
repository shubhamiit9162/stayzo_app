import { useState, useEffect } from "react";
import axios from "axios";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("http://localhost:5003/api/contacts");
        console.log("API Full Response:", res);
        console.log("API Data Type:", typeof res.data);

        if (res.data && Array.isArray(res.data)) {
          setContacts(res.data);
        } else {
          console.error("Unexpected response format:", res.data);
          setContacts([]);
        }
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("Failed to load contacts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>

      {loading && <p>Loading contacts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && contacts.length === 0 && (
        <p>No contacts available.</p>
      )}

      <ul className="border rounded-lg p-4 bg-white shadow-md">
        {contacts.map((contact) => (
          <li key={contact._id} className="p-2 border-b last:border-b-0">
            <h3 className="text-lg font-semibold">{contact.name}</h3>
            <p className="text-gray-600">{contact.email}</p>
            <p className="text-gray-500">{contact.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
