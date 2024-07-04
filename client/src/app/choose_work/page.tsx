import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link,
} from "@mui/material";
import React from "react";

const PROJECT_DESCRIPTIONS = [
  {
    title: "Write a report",
    description: "Write a report about XYZ of 1000 words",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Contribute to 10k report",
    description: "Contribute to 10k report",
    image: "https://via.placeholder.com/150",
  },
];

function ChooseWork() {
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <Typography variant="h5"> Choose Project to Work on. </Typography>
        <br />
        <Grid container spacing={2} justifyContent="center">
          {PROJECT_DESCRIPTIONS.map((project, index) => (
            <Grid item key={index}>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                  <Link href="#">Select</Link>{" "}
                  {/* Replace # with actual link */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </main>
  );
}

export default ChooseWork;
