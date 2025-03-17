import { useState, useEffect } from "react";
import axios from "axios";

const Contacts = () => {
  const [contacts, setContacts] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("http://localhost:5003/api/contacts");
        console.log("API Response:", res.data); // Debugging

        // Ensure the response is an array
        if (Array.isArray(res.data)) {
          setContacts(res.data);
        } else {
          console.error("Unexpected response format:", res.data);
          setContacts([]); // Fallback to empty array
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>

      {loading && <p>Loading contacts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && contacts.length === 0 && (
        <p>No contacts available.</p>
      )}

      <ul>
        {contacts.map((contact) => (
          <li key={contact._id} className="p-2 border-b">
            <h3 className="text-lg font-semibold">{contact.name}</h3>
            <p>{contact.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
