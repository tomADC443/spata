import { MouseEvent } from "react";
import { Answer, handleAnswerClick } from "../../pages/quiz";

interface AnswerProps {
  handleClick:  handleAnswerClick;
  answers: Array<Answer>;
}

const Answers = (props: AnswerProps) => {
  const answerButtons = props.answers.map((answer) => {
    return (
      <button onClick={()=>props.handleClick(answer.id)} key={answer.id}>
        {answer.phrase}{" "}
      </button>
    );
  });

  return <div>{answerButtons}</div>;
};
export default Answers;
