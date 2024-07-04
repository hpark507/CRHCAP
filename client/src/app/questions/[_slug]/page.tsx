"use client";

import React from "react";
import { useRouter } from "next/navigation";
import QuestionComponent from "@/components/QuestionComponent";
import InputQuestionComponent from "@/components/InputQuestionComponent";



// Example data structure indexed by slug
const questionDataMap = {
  "question-1": {
    question: "Question 1",
    description: "Select an option",
    options: ["Option A", "Option B", "Option C", "Option D"],
    next_link: "/questions/question-2",
  },
  "question-2": {
    question: "Question 2",
    description: "Choose your preferred color",
    options: ["Red", "Blue", "Green", "Yellow"],
    next_link: "/questions/question-3",
  },
  // Add more questions as needed
};

function QuestionPage({
  params,
  searchParams,
}: {
  params: { _slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();

  // Ensure the slug is available
  // if (!router.isReady || !_slug || typeof _slug !== 'string') return <p>Loading...</p>;

  const randomInteger = Math.floor(Math.random() * 1000) + 10;

  const questionDataMap: {
    [key: string]: {
      question: string;
      description: string;
      options?: string[];
      next_link: string;
      input_type?: string;
      input_answer?: boolean;
      answer?:  string;
    };
  } = {
    "1": {
      question: "Option Selection",
      description: "Select an option",
      options: ["Option A", "Option B", "Option C", "Option D"],
      next_link: "/questions/2",
    },
    "2": {
      question: "Color Prefference",
      description: "Choose your preferred color",
      options: ["Red", "Blue", "Green", "Yellow"],
      next_link: "/questions/3",
    },
    "3": {
      question: "Addition of Numbers",
      description: `Add the following numbers: ${randomInteger} + ${randomInteger * 2} + 4`,
      input_type: "number", // | Accepts "text" or "number"
      input_answer: true,
      next_link: "/questions/4",
      answer: `${randomInteger + randomInteger * 2 + 4}`,
    },
    // Add more questions as needed
  };

  console.log(params?._slug);
  if (!params?._slug && !questionDataMap[params?._slug]) {
    return <p>Question not found.</p>;
  }
  const questionData = questionDataMap[params?._slug];

  // Handle case where question data does not exist for the slug
  if (!questionData) {
    return <p>Question not found.</p>;
  }
// If type is input_naswer return InputQuestionComponent
  return questionData.input_answer ? (
    <InputQuestionComponent questionData={questionData} />
  ) : (
    <QuestionComponent questionData={questionData} />
  );
}

export default QuestionPage;
