import { React, useEffect, useState } from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useQuery } from "@apollo/client";
import { GET_TUTORIALS } from "../utils/queries";

const useStyles = makeStyles((theme) => {
  return {
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
      border: `2px solid ${
        theme.palette.type === "dark" ? "white" : "black"
      }`,
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
  };
});

function Recommendations() {
  const classes = useStyles();
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { loading, data } = useQuery(GET_TUTORIALS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_TUTORIALS,
        tutorials: data.tutorials,
      });
      data.tutorials.forEach((tutorial) => {
        idbPromise("tutorials", "put", tutorial);
      });
    } else if (!loading) {
      idbPromise("tutorials", "get").then((tutorials) => {
        dispatch({
          type: UPDATE_TUTORIALS,
          tutorials: tutorials,
        });
      });
    }
  }, [data, loading, dispatch]);

  function handlePrev() {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  }

  function handleNext() {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 4, items.length - 4)
    );
  }

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
}

export default Recommendations;
