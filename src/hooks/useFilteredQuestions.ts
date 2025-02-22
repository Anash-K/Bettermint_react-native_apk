import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

const useFilteredQuestions = (myQuestionIds: string[]) => {
  const { quest } = useSelector((state: RootState) => state.qna);
  return useMemo(() => {
    const idSet = new Set(myQuestionIds);
    return quest.filter((question) => idSet.has(question.id));
  }, [quest, myQuestionIds]);
};

export default useFilteredQuestions;
