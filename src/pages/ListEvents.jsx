import React from 'react'
import EventCard from '../components/EventCard'

const ListEvents = () => {
    const events=[
        {
            image:'hi',
            name:'sympo',
            date:'19-02-2024',
            id:1

        },
        {
            image:'hi',
            name:'sympo',
            date:'19-02-2024',
            id:2

        },
        {
            image:'hi',
            name:'sympo',
            date:'19-02-2024',
            id:3

        }
    ]
  return (
    <div>
        <h1>EVENTS</h1>
        <div className=''>
           
                    <EventCard data={events}/>
             
        </div>
    </div>
  )
}

export default ListEvents