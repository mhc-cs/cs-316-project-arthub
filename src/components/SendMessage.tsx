"use client"
import React from 'react';


const SendMessage = () => {
    const [value, setValue] = React.useState('');
    console.log(value);

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(value);
        setValue('');
    }
    return (
        <>
            <div className="bg-gray-200 fixed bottom-0 w-full py-10 shadow-lg">
                <form className="px-2 containerWrap flex">
                    <input value={value} onChange={e => setValue(e.target.value)} className="input w-full focus:outline-none bg-gray-100 rounded-r-none" type="text" />
                    <button type="submit" className="w-auto bg-blue-500 text-white rounded-r-lg px-5 text-sm">Send</button>
                </form>
            </div>
        </>
    );
}

export default SendMessage;
