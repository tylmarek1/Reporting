import express from 'express';
import path from 'path';

const app = express();
app.use(express.json());
const port = 3001;

app.get("/info", async (req, res) => {
  res.status(200).send("Reporting Node.js is running.");
});


// dl_tqm_template1 - 18 skladů - sklady : 521, 522 atd. - hotove
// dl_tqm_template2 - 13 skladů - sklady : 501, 505 atd. - hotove
// dl_tqm_template3 - 6 skladů - sklady : 503, 504 atd. - hotove
// dl_tqm_template4 - 2 sklady - sklady : 502, 555
// dl_tqm_template5 - 1 sklad - sklad : 512
// dl_tqm_template6 - 1 sklad - sklad : 513
// dl_tqm_template7 - 1 sklad - sklad : 535
// dl_tqm_template8 - 1 sklad - sklad : 551
// dl_tqm_template9 - 1 sklad - sklad : 556
app.post("/templates/delivery/:templateCode?", async (req, res) => {
  // Default to "template1" if no templateCode is provided
  const templateCode = req.params.templateCode || "dl_tqm_template1";
  const templatePath = path.resolve(__dirname, `./templates/TQM/${templateCode}`);

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
