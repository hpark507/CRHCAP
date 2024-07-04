import React, { useState } from "react";
import {
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid,
  Button,
} from "@mui/material";
import Link from "next/link"; // Import if you're using Next.js

// Define the types for the props if using TypeScript
interface QuestionData {
  question: string;
  description: string;
  next_link: string;
  options?: string[];
  input_type?: string;
  input_answer?: boolean;
}

interface InputQuestionComponentProps {
  questionData: QuestionData;
}

function InputQuestionComponent({ questionData }: InputQuestionComponentProps) {
  const [inputAnswer, setInputAnswer] = useState("");

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputAnswer(event.target.value);
  // };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputAnswer(event.target.value);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Container maxWidth="sm">
        <div className="flex flex-col items-center justify-center gap-2 p-5 max-w-md w-full shadow-lg rounded-lg">
          <div className="w-full">
            <h1 className="text-2xl font-bold text-center">
              {questionData.question}
            </h1>
            <p className="text-xs text-center">{questionData.description}</p>
            <br />
            <hr className="w-full" />
            <br />
            <div className="flex flex-col items-center gap-2 w-full justify-center">
              <FormControl component="fieldset">
                <RadioGroup
                  name="customized-radios"
                  value={inputAnswer}
                  onChange={handleChange}
                  aria-labelledby="demo-radio-buttons-group-label"
                >
                  <Grid container spacing={1}>
                    {/* Add Input Text */}
                    {questionData.input_type === "text" && (
                      <Grid item xs={12} sm={6}>
                        <input
                          type="text"
                          onChange={handleChange}
                          placeholder="Enter your answer"
                          style={{
                            padding: "10px",
                            width: "100%",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                          }}
                        />
                      </Grid>
                    )}
                    {
                      questionData.input_type === "number" && (
                        <Grid item xs={12} sm={12}>
                          <input
                            onChange={handleChange}
                            type="number"
                            placeholder="Enter your answer"
                            style={{
                              padding: "10px",
                              width: "100%",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                            }}
                          />
                        </Grid>
                      )
                    }
                    {/* Add Input Text Area */}
                  </Grid>
                </RadioGroup>
              </FormControl>
              {inputAnswer && (
                <Link href={questionData.next_link} passHref>
                  <Button variant="outlined" color="primary">
                    Next
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  
  );

}
export default InputQuestionComponent;
