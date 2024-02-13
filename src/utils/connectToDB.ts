import moongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
    moongoose.set('strictQuery', true)

    if(!process.env.DATABASE_URL) return console.log('Mongodb Url not found')

    if (isConnected) {
        console.log("You are connected to mongodb already")
        
        return
    }

    try {
        await moongoose.connect(process.env.DATABASE_URL)

        isConnected = true
        console.log("You are now connected to mongodb")
    } catch (error) {
        console.log(error)
    }
}