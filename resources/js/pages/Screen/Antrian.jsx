import React, { useEffect, useState } from 'react'
import { Head } from '@inertiajs/react'

export default function Antrian() {
    const [current, setCurrent] = useState(null)

    useEffect(() => {
        Echo.channel('queue-screen')
            .listen('.queue.updated', (e) => {
                console.log('EVENT MASUK:', e)
                setCurrent(e.queue)
            })

        return () => {
            Echo.leave('queue-screen')
        }
    }, [])

    return (
        <>
            <Head title="Screen Antrian" />

            <div style={{
                minHeight: '100vh',
                backgroundColor: '#0f172a',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px'
            }}>
                <div style={{ fontSize: '32px' }}>
                    NOMOR DIPANGGIL
                </div>

                <div style={{ fontSize: '96px', fontWeight: 'bold' }}>
                    {current ? current.queue_number : '-'}
                </div>

                <div style={{ fontSize: '24px', opacity: 0.7 }}>
                    Status: {current ? current.status : '-'}
                </div>
            </div>
        </>
    )
}
