import mongoose from "mongoose";
import { server} from "./app.js";
// import { server} from "./app.js";
import { IP_SERVER, PORT, DB_PASSWORD, DB_USER, DB_NAME, DB_SERVER } from "./constants.js";
// import { io } from "./utils/index.js";



const mongoDbLocal = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_SERVER}/${DB_NAME}?retryWrites=true&w=majority`;


mongoose.connect(mongoDbLocal, (error) => {
  if (error) throw error;


  server.listen(PORT, () => {
    console.log("#######################");
    console.log("#### HTTP API REST ####");
    console.log("#######################");
    console.log(`http://${IP_SERVER}:${PORT}/api`);

  });

});
