import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    alert("Payment Successful! Receipt Generated.");
    navigate("/");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>

      <input
        type="text"
        placeholder="Card Number"
        className="block w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Card Holder Name"
        className="block w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="CVV"
        className="block w-full p-2 mb-2 border rounded"
      />

      <button
        onClick={handlePayment}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default Payment;
