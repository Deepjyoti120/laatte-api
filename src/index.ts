import { Server } from "./server";

const server = new Server();
const port = process.env.PORT || 5001;

server.server.listen(port, () => {
    console.log("Server is running at http://localhost:" + port);
});
