import React, { useState } from 'react';
import { Navbar, Button } from 'react-bootstrap';

export default function Layout({ sidebar, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className={`app-shell ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            {/* Top navigation bar */}
            <Navbar bg="primary" variant="dark" className="app-navbar px-3 sticky-top">
                <div className="d-flex align-items-center gap-3">
                    <Button
                        size="sm"
                        variant="outline-light"
                        className="sidebar-toggle"
                        onClick={() => setSidebarOpen(prev => !prev)}
                    >
                        ☰
                    </Button>
                    <Navbar.Brand className="text-light m-0 fw-bold">
                        Manage Payroll
                    </Navbar.Brand>
                </div>

                {/* Optional: Add user info or notifications here */}
                <div className="ms-auto text-light small">
                    <span>Welcome, Aman</span>
                </div>
            </Navbar>

            {/* Sidebar */}
            <aside className="app-sidebar">
                {sidebar}
            </aside>

            {/* Main content area */}
            <main className="app-main">
                {children}
            </main>
        </div>
    );
}