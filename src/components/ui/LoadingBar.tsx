import React from 'react'

const LoadingBar = () => {
    return (
        <div role="status" className="max-w-sm animate-pulse">
            <div className="h-3 bg-gray-100 rounded-full dark:bg-gray-400 w-48"></div>
        </div>
    )
}

export default LoadingBar
