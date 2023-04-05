import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/users/usersSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((store) => store.users);
  
  useEffect(() => {
    dispatch(getUsers());
  }, [])

  if(isLoading) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  if(error !== undefined && error !== null) {
    return (
      <div>
        <h4>ERROR</h4>
      </div>
    );
  }

  return (
    <div>
      {users.map((user) => {
        return (
          <p key={user.cell}>{user.name.first} {user.name.last}</p>
        );
      })}
    </div>
  );
}

export default Users;