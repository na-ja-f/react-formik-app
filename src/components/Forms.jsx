import { useFormik } from 'formik'
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'

function Forms() {
    const broadcast = new BroadcastChannel('form_channel')

    const [formState, setFormState] = useState({ message: '' })

    const formik = useFormik({
        initialValues: {
            name: '',
            message: ''
        },
        onSubmit: () => {}
    })

    useEffect(() => {
        broadcast.onmessage = (event) => {
            setFormState(event.data)
            formik.setValues(event.data)
        }

        return () => {
            broadcast.close();
        }
    }, [])

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-col items-center w-screen'>
                <h1 className='mb-10 text-white font-serif'>Message</h1>
                <input
                    id="message"
                    name="message"
                    type="text"
                    onChange={(e) => {
                        formik.handleChange(e);
                        const newState = { ...formik.values, message: e.target.value };
                        setFormState(newState);
                        broadcast.postMessage(newState);
                    }}
                    value={formik.values.message}
                    className="ml-5 h-16 w-8/12 border-2 border-black rounded-xl py-4 px-4 focus:outline-none focus:border-red-800"
                />
                <Link className='mt-10 text-white' to={'/view'} target='_blank'>Click to open <span className='text-yellow-500 underline'>View</span> at a new tab</Link>
            </div>
        </form>
    )
}

export default Forms
