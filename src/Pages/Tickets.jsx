import React, { useState } from "react";
import { Container, Row, Col, Table, Form } from "react-bootstrap";
import tickets from "../components/ticketsInfo";
import "bootstrap/dist/css/bootstrap.min.css";

function Tickets() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchId, setSearchId] = useState("");

  const filteredTickets = tickets.filter(
    (ticket) =>
      (statusFilter === "all" || ticket.status === statusFilter) &&
      (!searchId || ticket.id.toString().includes(searchId))
  );

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Tickets Dashboard</h2>

      <Row className="mb-3 d-flex flex-wrap gap-2 ">
        <Col xs={12} md={6}>
          {/* Search Bar */}
          <Form.Control
            type="text"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </Col>
        <Col xs={12} md={4}>
          {/* Filter by status  */}
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </Form.Select>
        </Col>
      </Row>

      <div className="d-flex justify-content-center mt-4">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Created</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.title}</td>
                  <td>
                    {/* I use this to customize the color of each status. */}
                    <span
                      className={`badge bg-${
                        ticket.status === "Closed"
                          ? "success"
                          : ticket.status === "Open"
                          ? "danger"
                          : "warning"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td>{ticket.created}</td>
                  <td>{ticket.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default Tickets;
