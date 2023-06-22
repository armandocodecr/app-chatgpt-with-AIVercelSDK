'use client'

import { useChat } from "ai/react"

export default function Chat() {

    const { messages, input, handleInputChange, handleSubmit } = useChat()

    return (
        <div className="flex flex-col max-w-xl px-8 mx-auto">
    
            {
                messages.map(message => {
                    const isAbuelita = message.role === 'user'
                    return (
                        <div key={message.id} className="">
                            <p>
                                {isAbuelita ? '👨‍💻' : '👵'}
                                <span className={`pl-2 ${!isAbuelita ? 'text-yellow-400' : ''}`}>{message.content}</span>
                            </p>
                        </div>
                    )
                })
            }

            <form onSubmit={handleSubmit}>
                <input 
                    className="fixed w-full bottom-4 max-w-xl px-4 py-2 m-auto rounded-full mb-8 shadow-2xl 
                    text-sm border border-gray-400" 
                    placeholder="abuelita, dime cosas"
                    type="text" 
                    name="content" 
                    value={input} 
                    onChange={handleInputChange} 
                />
            </form>
            
        </div>
    )

}