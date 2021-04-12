const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

//  Import typedefs and resolvers

const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers')

// Import environment variables and Models

require('dotenv').config({ path: 'variables.env' })
const Option = require('./models/Option')
const Config = require('./models/Config')

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })

  .then(() => console.log('DB Connected'))
  .catch((err) => console.error(err))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return { Option, Config }
  }
})

const PORT = 4000
const port = process.env.PORT || PORT
server.listen(port).then(({ url }) => {
  console.log(`Server listening on ${url}`)
})
