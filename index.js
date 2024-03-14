const express = require("express")

const app = express()

const uuid = require('uuid')

app.use(express.json())

const port = 3000

const orders = []

app.use((request, response, next) => {

    console.log(`[${request.method}] - ${request.url}`);

    next();

});

const checkUserId = (request, response, next) => {

    const { id } = request.params

    const index = orders.findIndex(order => order.id === id)

    if (index < 0) {
        return response.status(404).json({ Message: "User not Found" })
    }

    request.UserIndex = index
    request.UserId = id

    next()

}




app.get('/orders/', (request, response) => {

    return response.json(orders)

})

app.get('/orders/:id', checkUserId,(request, response) => {

    
    return response.json(orders[request.UserIndex])

})

app.post('/orders/', (request, response) => {

    const { order, orderTwo, clientName, price } = request.body


    const newOrder = { id: uuid.v4(), clientName, order, orderTwo, price, status: "em preparação" }

    orders.push(newOrder)

    return response.status(201).json(newOrder)

})

app.put('/orders/:id', checkUserId, (request, response) => {

    const { clientName, order, orderTwo, price } = request.body

    const updateOrder = { id: request.UserId, clientName, order, orderTwo, price, status: "em preparação" }

    console.log(updateOrder)

    orders[request.UserIndex] = updateOrder

    return response.json(updateOrder)

})

app.delete('/orders/:id', checkUserId, (request, response) => {



    orders.splice(request.UserIndex, 1)


    return response.status(204).json()

})


app.listen(port, () => {
    console.log(`🚀 Server started on ${port} 🚀`)
})
