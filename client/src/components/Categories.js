import { React, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  useTheme,
} from "@material-ui/core";

// Sample data from the database
const options = [
  { name: "Option 1", category: "Category 1" },
  { name: "Option 2", category: "Category 2" },
  { name: "Option 3", category: "Category 1" },
  // ... add more options
];

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("Category 1");
  const theme = useTheme();

  // Get all unique categories from the options
  const categories = [...new Set(options.map((option) => option.category))];

  // Filter options based on selected category
  const filteredOptions = selectedCategory
    ? options.filter((option) => option.category === selectedCategory)
    : options;

  // Function to handle category selection
  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box
      border={3}
      borderRadius={8}
      borderColor={theme.palette.mode === "dark" ? "black" : "white"}
      backgroundColor={theme.palette.mode === "dark" ? "gray" : "white"}
      p={2}
    >
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="category-buttons">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outlined"
                size="small"
                className={`category-button ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => selectCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </Grid>
        <Grid item xs={12}>
          {selectedCategory && (
            <Card
              border={3}
              borderRadius={8}
              borderColor={theme.palette.mode === "dark" ? "white" : "black"}
              backgroundColor={theme.palette.mode === "dark" ? "gray" : "gray"}
              p={2}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {selectedCategory}
                </Typography>
                {/* Add text description for the selected category */}
                <Typography variant="body1">
                  Description for {selectedCategory} category goes here...
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
        {selectedCategory && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {filteredOptions.map((option) => (
                <Grid item xs={12} sm={6} md={3} key={option.name}>
                  <Card
                    border={3}
                    borderRadius={8}
                    borderColor={
                      theme.palette.mode === "dark" ? "white" : "black"
                    }
                    backgroundColor={
                      theme.palette.mode === "dark" ? "gray" : "white"
                    }
                    p={2}
                  >
                    <CardContent>
                      <Typography variant="subtitle1">{option.name}</Typography>
                      {/* Additional information about the corresponding category */}
                      <Typography variant="body2">
                        Additional information about {option.name} goes here...
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Categories;
