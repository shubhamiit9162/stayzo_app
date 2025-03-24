import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, clearCart }) => {
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

  const handlePayment = () => {
    navigate("/payment");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="border p-4 mb-2 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.location || item.cuisine}</p>
              <p className="text-green-600 font-bold">{item.price}</p>
            </div>
          ))}

          <h3 className="text-xl font-semibold mt-4">Total: ₹{totalPrice}</h3>

          {/* Proceed to Payment */}
          <button
            onClick={handlePayment}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
