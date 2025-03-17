const StayCard = ({ stay }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img
        src={stay.image}
        alt={stay.name}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{stay.name}</h2>
        <p className="text-gray-600">{stay.location}</p>
        <p className="text-green-600 font-bold">{stay.price}</p>
      </div>
    </div>
  );
};

export default StayCard;
