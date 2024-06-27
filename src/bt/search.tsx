import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Search = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newName, setNewName] = useState('');
    const [newDateOfBirth, setNewDateOfBirth] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newAddress, setNewAddress] = useState('');

    const handleAddFormToggle = () => {
        setShowAddForm(!showAddForm);
    };

    const handleAddNewStudent = () => {
        console.log('New Student Details:', {
            name: newName,
            dateOfBirth: newDateOfBirth,
            email: newEmail,
            address: newAddress,
        });
        setNewName('');
        setNewDateOfBirth('');
        setNewEmail('');
        setNewAddress('');

        setShowAddForm(false);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="input-group mb-3">
                    <div className="form-outline" data-mdb-input-init>
                        <input type="search" id="form1" className="form-control" placeholder='Search...' />
                    </div>
                    <button type="button" className="btn btn-primary" data-mdb-ripple-init>
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>

            <div className="col-md-4">
                <div className="input-group mb-3">
                    <button type="button" className="btn btn-primary" data-mdb-ripple-init onClick={handleAddFormToggle}>
                        <i className="bi bi-plus-lg"></i> Add
                    </button>
                </div>
            </div>

            <div className="col-md-4">
                <button type="button" className="btn btn-primary" data-mdb-ripple-init>
                    <i className="bi bi-person"></i>
                </button>
            </div>

            {/* Form thêm mới nhân viên */}
            {showAddForm && (
                <div className="overlay">
                    <form className="form">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4>Thêm mới nhân viên</h4>
                            <i className="bi bi-x-lg" onClick={handleAddFormToggle} style={{ cursor: "pointer" }} />
                        </div>
                        <div>
                            <label className="form-label" htmlFor="userName">
                                Họ và tên
                            </label>
                            <input
                                id="userName"
                                type="text"
                                className="form-control"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="form-label" htmlFor="dateOfBirth">
                                Ngày sinh
                            </label>
                            <input
                                id="dateOfBirth"
                                type="date"
                                className="form-control"
                                value={newDateOfBirth}
                                onChange={(e) => setNewDateOfBirth(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="form-label" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="form-label" htmlFor="address">
                                Địa chỉ
                            </label>
                            <textarea
                                className="form-control"
                                id="address"
                                rows={3}
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                className="w-100 btn btn-primary"
                                type="button"
                                onClick={handleAddNewStudent}
                            >
                                Thêm mới
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Search;
