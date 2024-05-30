import { useState, useEffect } from "react"

function View() {
    const broadcast = new BroadcastChannel('form_channel')
    const [formState, setFormState] = useState({ message: '' })

    useEffect(() => {
        broadcast.onmessage = (event) => {
            setFormState(event.data)
        }

        return () => {
            broadcast.close();
        }
    },[])

    return (
        <div className='flex flex-col h-screen justify-center items-center w-screen bg-gradient-to-r from-gray-900 to-gray-700'>
            <h1 className='mb-20 text-white font-serif underline'>Message View</h1>
            <p className="border-b border-white w-6/12 text-white">{formState.message}</p>
        </div>
    )
}

export default View
