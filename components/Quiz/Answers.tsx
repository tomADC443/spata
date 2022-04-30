import { Answer, handleAnswerClick } from "../../pages/quiz";

interface AnswerProps {
  handleClick: handleAnswerClick;
  answers: Array<Answer>;
}

const Answers = (props: AnswerProps) => {
  const answerButtons = props.answers.map((answer) => (
    <button
      onClick={() => props.handleClick(answer.id)}
      key={answer.id}
      className="button quiz-answer"
    >
      {answer.phrase}
    </button>
  ));

  return <div className="quiz-answers-grid">{answerButtons}</div>;
};
export default Answers;
