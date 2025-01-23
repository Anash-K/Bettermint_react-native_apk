import moment from "moment";

const useTimeFormatter = ({ date }: { date: string | Date | null }) => {
  if (date) {
    let formattedDate = moment(date).format("MM DD, YYYY");
    return formattedDate;
  }
  return null; // Return null if date is not provided
};

export default useTimeFormatter;
