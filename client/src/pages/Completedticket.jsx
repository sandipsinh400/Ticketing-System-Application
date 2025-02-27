

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';


const Completedticket = () => {
    const [Ticktelist, setTicket] = useState([])
    const [serch, setSerch] = useState("")
    const navigate = useNavigate()

    async function show() {
        const res = await axios.get("https://ticketing-system-application.onrender.com/api/ticket")
        console.log(res.data.ticket);
        setTicket(res.data.ticket)
    }

    useEffect(() => {
        show();
        document.title = "complete ticket"
        
    }, [])


    


  

    const timeAgo = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now - date; // Difference in milliseconds
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffMin < 1) return "Just now";
        if (diffMin < 60) return `${diffMin} min ago`;
        if (diffHour < 24) return `${diffHour} hours ago`;
        if (diffDay === 1) return "Yesterday";

        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };


    const form = Ticktelist.filter(ticket => ticket.actions === "complete");





    return (

        <div class="container table-container">
            <h4 class="mb-3">Manage Tickets - All Tickets</h4>


            <ul class="nav nav-pills mb-3">
                <li class="nav-item"><a class="nav-link " href="/View">All Tickets</a></li>
                <li class="nav-item"><a class="nav-link" href="/assign">Open Tickets</a></li>
                <li class="nav-item"><a class="nav-link" href="/reject">Unassigned</a></li>
                <li class="nav-item text-dark"><a class="nav-link active" href="/complete">Completed</a></li>
            </ul>




            <table class="table table-hover border">
                <thead class="table-light">
                    <tr>
                        <th>Ticket ID</th>
                        <th>Category</th>
                        <th>Sub-Category</th>
                        <th>Group</th>
                        <th>Created</th>
                        <th>Last Updated</th>
                        <th>Status</th>
                        <th>Ticket Manager</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        form.map((ticket, index) => (

                            <tr key={ticket._id}>

                                <td> <Link to={`/user/${ticket._id}`} title='click here'>{index + 1} </Link></td>
                                <td>{ticket.Category}</td>
                                <td>{ticket.Sub_Category}</td>
                                <td><span class="badge bg-success">Shaunak</span></td>
                                <td>{formatDate(ticket.createdAt)}</td>

                                <td><span class="badge bg-secondary">{timeAgo(ticket.updatedAt)}</span></td>
                                <td>{ticket.Category}</td>
                                <td>{ticket.Sub_Category}</td>
                                <td>
                                    <div class="dropdown">
                                        <button className='btn btn-success'>{ticket.actions}</button>
                                    </div>
                                </td>

                            </tr>
                        ))

                    }

                </tbody>
            </table>


            <div class="d-flex justify-content-between">
                <button type="button" onClick={() => navigate(-1)} className="btn btn-outline-secondary px-4">
                    Go back
                </button>
                <span>1</span>

            </div>
        </div>

    )
}

export default Completedticket