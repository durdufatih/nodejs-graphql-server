
const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const mongoose = require("mongoose");
const schema = require("./schema");

const uri = "mongodb+srv://admin:admin123456@cluster0-hv4nx.mongodb.net/test?retryWrites=true&w=majority"
// Connect to DB
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err));

const port = process.env.PORT || 4005;
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: schema.query,
    graphiql: true
}));
app.get("/", (req, res) => {
    res.send("Node is running");
});

app.listen(port, () => console.log(`Node server is started: ${port}`));