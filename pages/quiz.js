/* eslint-disable react/prop-types */
import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

function LoadingWidget(){
  return(
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function WidgetQuestion ({question, questionTotal, questionIndex,onSubmit}) {
  const questionID = `question_${questionIndex}`;
  return(
        <Widget>
        <Widget.Header>
      {  /* <BackLinkArrow href="/" /> */ }
       <h3>
            {`Questão ${questionIndex + 1 } de  ${questionTotal}`}
       </h3>
    </Widget.Header>

    <img
      alt="Descrição"
      style={{
        width: '100%',
        height: '150px',
        objectFit:'cover',
      }}
      src={question.image}
    />
    <Widget.Content>
      <h2>
      {question.title}
      </h2>
      <p>
      {question.description}
   
      </p>
      <form onSubmit={(infosDoEvento) =>{
        infosDoEvento.preventDefault();
        onSubmit();

      }}
      >
      {question.alternatives.map((alternative,alternativeIndex) => {
        const alternativeId = `alternative_${alternativeIndex}`;
          return (
            <Widget.AltPerg as = "label" htmlFor={alternativeId}>
              <input
               style={{ display:'none' }}
               id= {alternativeId}
               name={questionID}
               type="radio"
               />
               {alternative}
              </Widget.AltPerg>
          );
      })}
      {/* <pre>
      {JSON.stringify(question,null,4)}
      </pre> */}

      <Button type="submit">Confirmar</Button>
      </form>
    </Widget.Content>
    </Widget>

      );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT:'RESULT',

};
export default function QuizPage() { 
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const questionTotal = db.questions.length;
  const [currentQuestion,setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];


  // [React Chama de : Efeitos || Effects ]
  // React.useEffect
  //    [nasce ==> didMount]
  //    [atualiza ==> willUpdate]
  //    [morre ==> willUnmount]

  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  // nasce === didMount
  }, []);

      function handleSubmitQuiz() {
        const nextQuestion = questionIndex + 1;
        if (nextQuestion < questionTotal) {
          setCurrentQuestion(nextQuestion);
        } else {
          setScreenState(screenStates.RESULT);
        }
      }

return (
  <QuizBackground backgrounImage={db.bg}>
    <QuizContainer>
      <QuizLogo />
        {screenState === screenStates.QUIZ &&  (
          <WidgetQuestion 
            question={question}
            questionIndex={questionIndex}
            questionTotal={questionTotal}
            onSubmit={handleSubmitQuiz}

          /> 
        )}
      {screenState === screenStates.LOADING && <LoadingWidget/>}

      {screenState === screenStates.RESULT && <div>Você acertou X questões,parabéns!</div>}
    </QuizContainer>

  </QuizBackground>

    ); 
}
