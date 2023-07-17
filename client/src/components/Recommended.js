import { React, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
 } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const useStyles = makeStyles((theme) => ({
  recommendations: {
    margin: theme.spacing(2, 0),
  },
  recommendationsContent: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "calc(25% - 10px)",
    marginBottom: theme.spacing(2),
    border: `2px solid ${theme.palette.type === "dark" ? "white" : "black"}`,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  recommendationsArrows: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  arrowButton: {
    padding: theme.spacing(1),
    color: theme.palette.type === "dark" ? "white" : "black",
  },
}));

const Recommendations = () => {
  const classes = useStyles();
  const theme = useTheme();

  const items = [
    {
      id: 1,
      title: "Recommendation 1",
      description: "Description for Recommendation 1",
    },
    {
      id: 2,
      title: "Recommendation 2",
      description: "Description for Recommendation 2",
    },
    {
      id: 3,
      title: "Recommendation 3",
      description: "Description for Recommendation 3",
    },
    {
      id: 4,
      title: "Recommendation 4",
      description: "Description for Recommendation 4",
    },
    {
      id: 5,
      title: "Recommendation 5",
      description: "Description for Recommendation 5",
    },
    {
      id: 6,
      title: "Recommendation 6",
      description: "Description for Recommendation 6",
    },
    {
      id: 7,
      title: "Recommendation 7",
      description: "Description for Recommendation 7",
    },
    {
      id: 8,
      title: "Recommendation 8",
      description: "Description for Recommendation 8",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 4, items.length - 4));
  };

  const visibleItems = items.slice(currentIndex, currentIndex + 4);

  return (
    <div className={classes.recommendations}>
      <h2>Recommendations Component</h2>
      <div className={classes.recommendationsContent}>
        {visibleItems.map((item) => (
          <Card
            key={item.id}
            className={classes.card}
            style={{
              border: `2px solid ${
                theme.palette.type === "dark" ? "white" : "black"
              }`,
            }}
          >
            <CardContent>
              <Typography className={classes.cardTitle}>
                {item.title}
              </Typography>
              <Typography className={classes.cardDescription}>
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className={classes.recommendationsArrows}>
        <IconButton
          className={classes.arrowButton}
          color="primary"
          disabled={currentIndex === 0}
          onClick={handlePrev}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          className={classes.arrowButton}
          color="primary"
          disabled={currentIndex >= items.length - 4}
          onClick={handleNext}
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Recommendations;
