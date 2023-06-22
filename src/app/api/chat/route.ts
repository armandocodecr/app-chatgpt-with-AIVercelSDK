import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from "ai";

// Le decimos a vercel donde queremos ejecutar el endpoint

export const runtime = 'edge'

// -> edge tiene mejor rendimiento y sporta streaming de datos, y no puede durar tanto la request usando la CPU
// -> request de  milisegundo

// -> default tiene peor rendimiento, no soporta streaming de datos, pero tiene mayor compatibilidad con paquetes de node
// la request puede duras mas tiempo usando la CPU
// -> request de segundos

// Crear el cliente de OpenAI
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export async function POST(req: any) {

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            {
                role: 'system',
                content: 'Comportate como si fueses mi abuela regañandome por no ir a la universidad a estudiar programación',
            }, 
            {
                role: 'user',
                content: 'Abuela no quiero ir a la univeridad',
            }
        ],
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    })

    // transformar la respuesta de OpenAI en un text-stream
    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
}