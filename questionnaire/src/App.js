import React, { useState } from 'react';

const jsonData = {
  "setting": {
    "title": "Intern Application Form",
    "favicon": ""
  },
  "questions": [
    {
      "id": 90,
      "question_text": "Your Email?",
      "question_type": 4,
      "required": 1
    },
    {
      "id": 91,
      "question_text": "Your Age?",
      "question_type": 4,
      "required": 0
    },
    {
      "id": 92,
      "question_text": "Your Gender?",
      "question_type": 1,
      "required": 1,
      "choices": [
        { "id": 777, "choice_text": "Male" },
        { "id": 778, "choice_text": "Female" },
        { "id": 779, "choice_text": "Other" }
      ]
    },
    {
      "id": 93,
      "question_text": "Your preferred job location?",
      "question_type": 1,
      "required": 0,
      "choices": [
        { "id": 780, "choice_text": "Work from home" },
        { "id": 781, "choice_text": "Work in office" },
        { "id": 782, "choice_text": "Work in hybrid way" }
      ]
    },
    {
      "id": 94,
      "question_text": "Your Salary Expectation (CTC in rupees)?",
      "question_type": 2,
      "required": 1,
      "choices": [
        { "id": 783, "choice_text": "2-3 lakh" },
        { "id": 784, "choice_text": "4-5 lakh" },
        { "id": 785, "choice_text": "5-6 lakh" },
        { "id": 786, "choice_text": "6-7 lakh" }
      ]
    },
    {
      "id": 95,
      "question_text": "Your Educational Qualification?",
      "question_type": 2,
      "required": 0,
      "choices": [
        { "id": 787, "choice_text": "Illiterate" },
        { "id": 788, "choice_text": "Below 10th standard" },
        { "id": 789, "choice_text": "10th passed" },
        { "id": 790, "choice_text": "12th passed" },
        { "id": 791, "choice_text": "Undergraduate" },
        { "id": 792, "choice_text": "Postgraduate" }
      ]
    },
    {
      "id": 96,
      "question_text": "Your Skills",
      "question_type": 3,
      "required": 1,
      "choices": [
        { "id": 793, "choice_text": "Node.js" },
        { "id": 794, "choice_text": "ReactJS" },
        { "id": 795, "choice_text": "Mongodb" },
        { "id": 796, "choice_text": "Express" }
      ]
    },
    {
      "id": 97,
      "question_text": "Your Extra Activities",
      "question_type": 3,
      "required": 0,
      "choices": [
        { "id": 797, "choice_text": "Cricket" },
        { "id": 798, "choice_text": "Football" },
        { "id": 799, "choice_text": "Tennis" },
        { "id": 800, "choice_text": "Badminton" }
      ]
    },
    {
      "id": 98,
      "question_text": "Your Photo",
      "question_type": 5,
      "required": 1
    },
    {
      "id": 99,
      "question_text": "Your CV in PDF",
      "question_type": 5,
      "required": 0
    }
  ]
};


const App = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    setCurrentScreen(currentScreen + 1);
  };

  const handlePrevious = () => {
    setCurrentScreen(currentScreen - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  };

  const renderQuestions = () => {
    const question = jsonData.questions[currentScreen];
    const { id, question_text, question_type, choices } = question;

    

    switch (question_type) {
      case 1: // Multiple Choice
        return (
          <div>
            <h3>Question {id}</h3>
            <p>{question_text}</p>
            {choices.map((choice) => (
              <div key={choice.id}>
                <label>
                  <input
                    type="radio"
                    name={`answer_${id}`}
                    value={choice.choice_text}
                    onChange={handleChange}
                  />
                  {choice.choice_text}
                </label>
              </div>
            ))}
          </div>
        );

      case 2: // Dropdown
        return (
          <div>
            <h3>Question {id}</h3>
            <p>{question_text}</p>
            <select
              name={`answer_${id}`}
              value={answers[`answer_${id}`] || ''}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              {choices.map((choice) => (
                <option key={choice.id} value={choice.choice_text}>
                  {choice.choice_text}
                </option>
              ))}
            </select>
          </div>
        );

      case 3: // Checkbox
        return (
          <div>
            <h3>Question {id}</h3>
            <p>{question_text}</p>
            {choices.map((choice) => (
              <div key={choice.id}>
                <label>
                  <input
                    type="checkbox"
                    name={`answer_${id}_${choice.id}`}
                    value={choice.choice_text}
                    onChange={handleChange}
                  />
                  {choice.choice_text}
                </label>
              </div>
            ))}
          </div>
        );

      case 4: // Text Input
        return (
          <div>
            <h3>Question {id}</h3>
            <p>{question_text}</p>
            <input
              type="text"
              name={`answer_${id}`}
              value={answers[`answer_${id}`] || ''}
              onChange={handleChange}
            />
          </div>
        );

      case 5: // File Upload
        return (
          <div>
            <h3>Question {id}</h3>
            <p>{question_text}</p>
            <input
              type="file"
              name={`answer_${id}`}
              onChange={handleChange}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const renderSubmission = () => {
    return (
      <div>
        <h3>Submission</h3>
        {jsonData.questions.map((question) => (
          <p key={question.id}>
            <strong>{question.question_text}: </strong>
            {answers[`answer_${question.id}`]}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>{jsonData.setting.title}</h1>
      {!submitted && (
        <div>
          {renderQuestions()}
          {currentScreen > 0 && (
            <button onClick={handlePrevious}>Previous</button>
          )}
          {currentScreen < jsonData.questions.length - 1 && (
            <button onClick={handleNext}>Next</button>
          )}
          {currentScreen === jsonData.questions.length - 1 && (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      )}
      {submitted && renderSubmission()}
    </div>
  );
};

export default App;

