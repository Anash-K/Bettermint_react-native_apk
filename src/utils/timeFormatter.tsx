import moment from "moment";

const useTimeFormatter = ({ date }: { date: string | Date | null }) => {
  if (date) {
    let formattedDate = moment(date).format("YYYY-MM-DD");
    return formattedDate;
  }
  return null; // Return null if date is not provided
};

export default useTimeFormatter;
