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
  options?: string[];
  next_link: string;
}

interface QuestionComponentProps {
  questionData: QuestionData;
}

function QuestionComponent({ questionData }: QuestionComponentProps) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

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
                  value={selectedOption}
                  onChange={handleChange}
                  aria-labelledby="demo-radio-buttons-group-label"
                >
                  <Grid container spacing={2}>
                    {questionData.options && questionData.options.map((option, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FormControlLabel
                          value={option}
                          control={<Radio />}
                          label={option}
                          style={{ margin: "auto" }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              </FormControl>
              {selectedOption && (
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

export default QuestionComponent;
