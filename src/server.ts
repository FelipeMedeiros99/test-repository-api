import app from "./app";
import { removeExpiredTokens } from "./repositories/userRepository";


// setInterval(removeExpiredTokens, 1000 * 60)

app.listen(5000, ()=>console.log("Server running on port 5000"));
