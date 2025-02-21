import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
// Adjust the path based on your project structure

const useUserDetails = () => {
  return useSelector((state: RootState) => state.userDetails);
};

export default useUserDetails;
