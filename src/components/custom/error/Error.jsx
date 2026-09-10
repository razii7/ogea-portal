import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-gray-600 mb-6">WOW... You are OUT of outreach!</p>
            <Link to="/" className="px-6 py-3 underline">
                Get inside
            </Link>
        </div>
    )
}

export default Error