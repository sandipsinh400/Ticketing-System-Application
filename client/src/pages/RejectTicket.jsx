

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';

const RejectTicket = () => {
    const [Ticktelist, setTicket] = useState([])
    const [serch, setSerch] = useState("")
    const navigate = useNavigate()

    async function show() {
        const res = await axios.get("http://localhost:3000/api/ticket")
        console.log(res.data.ticket);
        setTicket(res.data.ticket)
    }

    useEffect(() => {
        show();
        document.title = "complete ticket"
        
    }, [])


    // const handleActionChange = async (ticketId, actions) => {
    //     try {
    //         await axios.put(`http://localhost:3000/api/ticket/${ticketId}`, { actions },);

    //         setTicket(prevTickets =>
    //             prevTickets.map(ticket =>
    //                 ticket._id === ticketId ? { ...ticket, actions: actions } : ticket
    //             )
    //         );
    //         show();
    //     } catch (error) {
    //         console.error("Error updating ticket status", error);
    //     }
    // };


   

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


    const form = Ticktelist.filter(ticket => ticket.actions === "rejected");





    return (

        <div class="container table-container">
            <h4 class="mb-3">Manage Tickets - All Tickets</h4>


            <ul class="nav nav-pills mb-3">
                <li class="nav-item"><a class="nav-link " href="/View">All Tickets</a></li>
                <li class="nav-item"><a class="nav-link" href="/assign">Open Tickets</a></li>
                <li class="nav-item"><a class="nav-link active" href="/reject">Unassigned</a></li>
                <li class="nav-item text-dark"><a class="nav-link " href="/complete">Completed</a></li>
                
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
                                        <button className='btn btn-danger'>{ticket.actions}</button>
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
                <button class="btn btn-outline-secondary">Next</button>
            </div>
        </div>

    )
}

export default RejectTicket


