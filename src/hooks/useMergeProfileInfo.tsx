import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import useUserDetails from "./useUserDetails";
import { setFieldAction } from "../redux/slices/workoutDetailsSlice";
// Adjust path as needed

const useMergeProfileInfo = () => {
  const dispatch = useDispatch();
  const { profileInfo } = useUserDetails();

  const mergeProfileInfo = (newData: Partial<typeof profileInfo>) => {
    dispatch(
      setFieldAction({
        field: "profileInfo",
        value: _.merge({}, profileInfo, newData), // Preserve old values, update new ones
      })
    );
  };

  return { mergeProfileInfo };
};

export default useMergeProfileInfo;
