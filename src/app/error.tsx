'use client'

import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export const metadata:Metadata = {
    title: '500'
}

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    redirect(`/`)

    return (
        <></>
    )
}