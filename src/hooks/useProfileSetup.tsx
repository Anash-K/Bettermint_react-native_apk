import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

const useProfileSetup = () => {
  const isProfileSetup = useSelector(
    (state: RootState) => state.userDetails.isProfileSetup
  );
  return isProfileSetup;
};

export default useProfileSetup;
