import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';


import Schema from './controllers/schema/space.js';


const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//route
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}));

//constants
const PORT = process.env.PORT || 5000;

//server listening
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});
