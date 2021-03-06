import express from "express";
import { routes } from "./routes";
import cors from "cors";
const app = express();

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(cors());
app.use(routes);

app.listen(3333, () => {
  console.log("Server started on port 3333");
});
