
const UserActions = ({ id , active, handleViewChange, handleEditChange }) => {
  return (
    <div className="flex px-5 gap-5">
      <button
        className={`py-1 px-3 rounded text-white  bg-dark-gray hover:bg-blue`}
        onClick={()=>handleViewChange(id)}
      >
        View
      </button>
        <button
        className={`py-1 px-3 rounded text-white  bg-dark-gray hover:bg-blue`}
        onClick={()=>handleEditChange(id)}
      >
        Edit
      </button>
    </div>
  );
}
export default UserActions;
