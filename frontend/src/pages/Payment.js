import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingDetails, amount } = location.state || { amount: 0 };

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolder: "",
    cvv: "",
    expiryDate: "",
  });

  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  // Generate invoice data
  const generateInvoiceData = () => {
    const today = new Date().toLocaleDateString();
    const invoiceNumber = "INV-" + Math.floor(100000 + Math.random() * 900000);

    // Format check-in and check-out dates
    const checkIn = bookingDetails?.checkInDate
      ? new Date(bookingDetails.checkInDate).toLocaleDateString()
      : "N/A";
    const checkOut = bookingDetails?.checkOutDate
      ? new Date(bookingDetails.checkOutDate).toLocaleDateString()
      : "N/A";

    // User and Stay information
    const userName = bookingDetails?.user?.name || "Guest";
    const stayName = bookingDetails?.stay?.title || "Accommodation";

    return {
      invoiceNumber,
      invoiceDate: today,
      userName,
      userId: bookingDetails?.user || "N/A",
      accommodation: stayName,
      stayId: bookingDetails?.stay || "N/A",
      checkInDate: checkIn,
      checkOutDate: checkOut,
      paymentMethod: `Credit Card (ending in ${
        paymentData.cardNumber.slice(-4) || "XXXX"
      })`,
      paymentDate: today,
      amountPaid: amount || bookingDetails?.totalAmount || 0,
    };
  };

  // Generate CSV content from invoice data
  const generateCSV = (invoice) => {
    const csvContent = [
      "BOOKING AND PAYMENT INVOICE",
      `Invoice Number,${invoice.invoiceNumber}`,
      `Invoice Date,${invoice.invoiceDate}`,
      "",
      "CUSTOMER DETAILS",
      `Customer Name,${invoice.userName}`,
      `User ID,${invoice.userId}`,
      "",
      "BOOKING DETAILS",
      `Accommodation,${invoice.accommodation}`,
      `Stay ID,${invoice.stayId}`,
      `Check-in Date,${invoice.checkInDate}`,
      `Check-out Date,${invoice.checkOutDate}`,
      "",
      "PAYMENT DETAILS",
      `Payment Method,${invoice.paymentMethod}`,
      `Payment Date,${invoice.paymentDate}`,
      `Amount Paid,₹${invoice.amountPaid}`,
      `Payment Status,Completed`,
      "",
      "Thank you for your booking!",
    ].join("\n");

    return csvContent;
  };

  // Download CSV file
  const downloadCSV = (csvContent) => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Format filename with date
    const date = new Date().toISOString().slice(0, 10);
    link.setAttribute("href", url);
    link.setAttribute("download", `booking-invoice-${date}.csv`);
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  const handleProcessPayment = () => {
    // Basic validation
    if (
      !paymentData.cardNumber ||
      !paymentData.cardHolder ||
      !paymentData.cvv
    ) {
      alert("Please fill all payment fields");
      return;
    }

    // Generate invoice data and show it
    const invoice = generateInvoiceData();
    setInvoiceData(invoice);
    setShowInvoice(true);
  };

  const handleDownloadInvoice = () => {
    if (!invoiceData) return;

    const csvContent = generateCSV(invoiceData);
    downloadCSV(csvContent);

    alert("Invoice has been downloaded.");
  };

  const handleFinish = () => {
    alert("Thank you for your booking!");
    navigate("/");
  };

  return (
    <div className="p-6">
      {!showInvoice ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Payment</h2>

          {bookingDetails && (
            <div className="mb-4 p-4 bg-gray-100 rounded">
              <h3 className="font-bold">Booking Summary</h3>
              {bookingDetails.stay?.title && (
                <p>Stay: {bookingDetails.stay.title}</p>
              )}
              {bookingDetails.checkInDate && (
                <p>
                  Check-in:{" "}
                  {new Date(bookingDetails.checkInDate).toLocaleDateString()}
                </p>
              )}
              {bookingDetails.checkOutDate && (
                <p>
                  Check-out:{" "}
                  {new Date(bookingDetails.checkOutDate).toLocaleDateString()}
                </p>
              )}
              <p className="font-bold mt-2">
                Total Amount: ₹{amount || bookingDetails.totalAmount}
              </p>
            </div>
          )}

          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            className="block w-full p-2 mb-2 border rounded"
            value={paymentData.cardNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cardHolder"
            placeholder="Card Holder Name"
            className="block w-full p-2 mb-2 border rounded"
            value={paymentData.cardHolder}
            onChange={handleChange}
            required
          />
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              className="block w-1/3 p-2 border rounded"
              value={paymentData.cvv}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              className="block w-2/3 p-2 border rounded"
              value={paymentData.expiryDate}
              onChange={handleChange}
            />
          </div>
          <button
            onClick={handleProcessPayment}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Process Payment
          </button>
        </>
      ) : (
        <div className="invoice-container">
          <h2 className="text-2xl font-bold mb-4">Payment Success</h2>

          <div className="bg-white p-6 border rounded-lg shadow-md mb-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">BOOKING AND PAYMENT INVOICE</h3>
              <div className="text-right">
                <div>Invoice #: {invoiceData.invoiceNumber}</div>
                <div>Date: {invoiceData.invoiceDate}</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-gray-700 border-b pb-1 mb-2">
                CUSTOMER DETAILS
              </h4>
              <div>Customer Name: {invoiceData.userName}</div>
              <div>User ID: {invoiceData.userId}</div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-gray-700 border-b pb-1 mb-2">
                BOOKING DETAILS
              </h4>
              <div>Accommodation: {invoiceData.accommodation}</div>
              <div>Stay ID: {invoiceData.stayId}</div>
              <div>Check-in Date: {invoiceData.checkInDate}</div>
              <div>Check-out Date: {invoiceData.checkOutDate}</div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-gray-700 border-b pb-1 mb-2">
                PAYMENT DETAILS
              </h4>
              <div>Payment Method: {invoiceData.paymentMethod}</div>
              <div>Payment Date: {invoiceData.paymentDate}</div>
              <div className="font-bold">
                Amount Paid: ₹{invoiceData.amountPaid}
              </div>
              <div className="text-green-600 font-bold">
                Payment Status: Completed
              </div>
            </div>

            <div className="text-center mt-8 text-gray-700">
              Thank you for your booking!
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleDownloadInvoice}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Download Invoice
            </button>
            <button
              onClick={handleFinish}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Return Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
