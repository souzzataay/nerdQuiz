/* eslint-disable react/prop-types */
import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';
import AlternativForm from '../src/components/AlternativForm';

function WidgetResult({results}){
  return(
    <Widget>
      <Widget.Header>
        Resultado:
      </Widget.Header>
      <Widget.Content>
        <p>Você Acertou {' '}
          { results.reduce((somaAtual, resultAtual ) => {
          const isAcertos = resultAtual === true;
          if(isAcertos){
            return somaAtual + 1;
          } 
            return somaAtual;
        }, 0)} 
        
        {' '}

        {/*  Alem do reduce pode-se usar o 
              {result.filter(x) => x).length}
              como o resultado é true e false, dessa forma ele 
              seleciona os true e conta quantos tem
              */}
         Questões</p>
        <ul>
          {results.map((result, index) => (
          <li key={`result__${result}`}>
            #{'0'}{index +1}{' '}
             Resultado: {result === true ? 'Acertou' : 'Errou'}
          </li>
          ))}
          </ul>
      </Widget.Content>
    </Widget>
  );
}

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

function WidgetQuestion ({question, questionTotal, questionIndex,onSubmit,addResults,}) {
  
  const [alternativeSelected, setAlternativeSelected]= React.useState(undefined);
  const [isSelectedQuestion, setIsQuestionSelected] = React.useState(false);
  const questionID = `question_${questionIndex}`;
  const isCorrect = alternativeSelected === question.answer;
  const hasSelectedAlternative = alternativeSelected !== undefined;
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
      <AlternativForm onSubmit={(infosDoEvento) => {
        infosDoEvento.preventDefault();
        setIsQuestionSelected(true);
        setTimeout(() => {
         addResults(isCorrect);
          onSubmit();
          setIsQuestionSelected(false);
          setAlternativeSelected(undefined);
        },3 *1000);
        


      }}
      >
      {question.alternatives.map((alternative,alternativeIndex) => {
        const alternativeId = `alternative_${alternativeIndex}`;
        const alternativeStatus= isCorrect ? 'SUCCESS':'ERROR';
        const isSelected = alternativeSelected === alternativeIndex;
          return (
            <Widget.AltPerg as = "label"
            key={alternativeId} 
            htmlFor={alternativeId} 
            data-selected={true} data-status={isSelectedQuestion && alternativeStatus}>
              <input
               style={{ display:'none' }}
               id={alternativeId}
               name={questionID}
               onChange={() => setAlternativeSelected(alternativeIndex)}
               type="radio"
               />
               {alternative}
              </Widget.AltPerg>
          );
      })}
      {/* <pre>
      {JSON.stringify(question,null,4)}
      </pre> */}

      <Button type="submit" disabled={!hasSelectedAlternative}>Próximo</Button>

     
      {isSelectedQuestion && isCorrect && <p>Você acertou!</p>}
      {isSelectedQuestion && !isCorrect && <p>Você errou!</p>}
      </AlternativForm>
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
  const [results, setResults] = React.useState([]);
  const questionTotal = db.questions.length;
  const [currentQuestion,setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResults(result){
    setResults([
      ...results,
      result
    ]);
  }
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
            addResults={addResults}

          /> 
        )}
      {screenState === screenStates.LOADING && <LoadingWidget/>}

      {screenState === screenStates.RESULT && <WidgetResult results={results}/>}
    </QuizContainer>

  </QuizBackground>

    ); 
}
