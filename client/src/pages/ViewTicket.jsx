import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ViewTicket = () => {
    const [Ticktelist, setTicket] = useState([])
    const [serch, setSerch] = useState("")
    const [currentPage, setCurrentPage] = useState(0);
    const ticketsPerPage = 5;
    const navigate = useNavigate()

    async function show() {
        const res = await axios.get("http://localhost:3000/api/ticket")
        console.log(res.data.ticket);
        setTicket(res.data.ticket)
    }

    useEffect(() => {
        show();
        document.title = "view ticket"
    }, [])


    const handleActionChange = async (ticketId, actions) => {
        try {
            await axios.put(`http://localhost:3000/api/ticket/${ticketId}`, { actions },);

            setTicket(prevTickets =>
                prevTickets.map(ticket =>
                    ticket._id === ticketId ? { ...ticket, actions: actions } : ticket
                )
            );
            show();
        } catch (error) {
            console.error("Error updating ticket status", error);
        }
    };


    const formdata = Ticktelist.filter((user) => {
        const serched = serch.toUpperCase()
        const category = user.Category.toUpperCase()
        const id = user._id.toUpperCase()
        return category.includes(serched) || id.includes(serched)
    })

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


    const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(Ticktelist);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets");

    // Create a buffer and save as Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    saveAs(data, "tickets.xlsx");
};


    ///react pagination 
    const pageCount = Math.ceil(formdata.length / ticketsPerPage);
    const offset = currentPage * ticketsPerPage;
    const currentTickets = formdata.slice(offset, offset + ticketsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (

        <>
        <div class="container table-container">
            <h4 class="mb-3">Manage Tickets - All Tickets</h4>


            <ul class="nav nav-pills mb-3">
                <li class="nav-item"><a class="nav-link active" href="/View">All Tickets</a></li>
                <li class="nav-item"><a class="nav-link" href="/assign">Open Tickets</a></li>
                <li class="nav-item"><a class="nav-link" href="/reject">Unassigned</a></li>
                <li class="nav-item"><a class="nav-link" href="/complete">Completed</a></li>
 
            </ul>


            <div class="d-flex justify-content-between mb-3">
                <input type="text" class="form-control w-25" onChange={(e) => { setSerch(e.target.value) }} placeholder="Search ID, Category, Group" />
                <button class="btn btn-outline-primary " onClick={downloadExcel}>Download to Excel</button>
            </div>


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
                        currentTickets?.map((ticket, index) => (

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
                                      
                                        <select name="" id="" className='btn btn-primary' onChange={(e) => handleActionChange(ticket._id, e.target.value)}
                                        >
                                            <option value="" selected disabled>Actions</option>
                                            <option value="complete">Approve</option>
                                            <option value="rejected">Reject</option>
                                            <option value="assign">assign</option>
                                        </select>
                                    </div>
                                </td>

                            </tr>
                        ))

                    }

                </tbody>
            </table>

            <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />





            <div class="d-flex justify-content-between">
                <button type="button" onClick={() => navigate(-1)} className="btn btn-outline-secondary px-4">
                    Go back
                </button>
               
                <button class="btn btn-outline-secondary">Next</button>
            </div>
        </div>

        </>

    )
}

export default ViewTicket