/* eslint-disable react/jsx-indent */
/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';

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

function WidgetQuestion ({question, questionTotal, questionIndex}) {
  const questionID = `question_${questionIndex}`;
  return(
        <Widget>
        <Widget.Header>
      {  /* <BackLinkArrow href="/" /> */ }
       <h3>
            {`Pergunta ${questionIndex + 1 } de  ${questionTotal}`}
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
    </Widget.Content>
    </Widget>

      )
    }


export default function QuizPage() { 
  
  const questionTotal = db.questions.length;
  const questionIndex = 0;
  const question = db.questions[questionIndex];
  
  return (
    <QuizBackground backgrounImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

    <WidgetQuestion 
      question={question}
      questionIndex={questionIndex}
      questionTotal={questionTotal}

      />
      <LoadingWidget/>
      </QuizContainer>
  
      </QuizBackground>

    ); 
}
