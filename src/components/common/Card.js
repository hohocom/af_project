function Card({ title, body, bottomOutside }) {
  return (
    <div className="  flex flex-col items-center mb-10 w-full">
      <div className="flex justify-center items-center w-2/3 rounded-t-xl p-2 bg-blue-900 text-2xl pt-2.5 text-white">
        {title}
      </div>
      <div className="w-full bg-white p-2 rounded-xl shadow-md flex justify-between z-10">
        {body}
      </div>
      {bottomOutside}
    </div>
  );
}

export default Card;
