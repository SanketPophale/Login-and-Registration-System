require("dotenv").config(); // Load environment variables

const { PUBLIC_DATA } = require("./src/constant"); // Import constants
const app = require("./src/app"); // Import the configured app

// Start the server
app.listen(PUBLIC_DATA.port, () => {
  console.log(` Server running at http://localhost:${PUBLIC_DATA.port}`);
});
