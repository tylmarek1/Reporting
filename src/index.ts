import express from 'express';
import path from 'path';

const app = express();
app.use(express.json());
const port = 3001;

app.get("/info", async (req, res) => {
  res.status(200).send("Reporting Node.js is running.");
});

app.post("/templates/delivery/TQM/:templateCode", async (req, res) => {
  const templateCode = req.params.templateCode;
  const templatePath = path.resolve(__dirname, `./templates/TQM/${templateCode}.tsx`);

  try {
    // Dynamically import the module
    const createDeliveryReport = require(templatePath);

    // Call the template render function with dynamic data
    const result = await createDeliveryReport.default(req.body);

    // Send the PDF back to the client
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);
    result.pipe(res);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("An error occurred while generating the PDF.");
  }
});

app.listen(port, () => {
  console.log(`The sample PDF app is running on port ${port}.`);
});
