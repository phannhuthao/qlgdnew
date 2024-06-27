import React, { useState, useMemo } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { data } from './data';

const Table = () => {
    const [students, setStudents] = useState(data);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newStudentData, setNewStudentData] = useState({
        name: '',
        age: '',
        address: '',
        Tags: '',
    });

    const person = () => {
        alert("Troll troll troll Việt Nam :)");
    }

    // Tìm Kiếm
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        const filteredData = data.filter(student =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setStudents(filteredData);
    };

    // Thêm Sinh Viên
    const toggleModal = () => {
        setShowModal(!showModal); 
    };

    const addStudent = () => {
        const newStudent = {
            id: students.length + 1,
            name: newStudentData.name,
            age: newStudentData.age,
            address: newStudentData.address,
            Tags: newStudentData.Tags,
        };
        setStudents([...students, newStudent]);
        setNewStudentData({
            name: '',
            age: '',
            address: '',
            Tags: '',
        });
        setShowModal(false); 
    };

    // Xóa Sinh Viên
    const handleDelete = (id: number) => {
        const updatedStudents = students.filter(student => student.id !== id);
        setStudents(updatedStudents);
    };

    // Chỉnh Sửa Sinh Viên
    const [editStudentData, setEditStudentData] = useState({
        id: 0,
        name: '',
        age: '',
        address: '',
        Tags: '',
    });

    const handleEdit = (id: number) => {
        const studentToEdit = students.find(student => student.id === id);
        if (studentToEdit) {
            setEditStudentData({
                id: studentToEdit.id,
                name: studentToEdit.name,
                age: studentToEdit.age,
                address: studentToEdit.address,
                Tags: studentToEdit.Tags,
            });
            setShowEditModal(true);
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditStudentData({ ...editStudentData, [name]: value });
    };

    const saveEditedStudent = () => {
        const updatedStudents = students.map(student =>
            student.id === editStudentData.id ? { ...student, ...editStudentData } : student
        );
        setStudents(updatedStudents);
        setShowEditModal(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewStudentData({ ...newStudentData, [name]: value });
    };

    // Thêm màu cho tag
    const getTagColor = (tag: any) => {
        switch (tag.trim().toLowerCase()) {
            case 'action':
                return 'primary';
            case 'domatic':
                return 'secondary';
            case 'boring':
                return 'warning';
            case 'sleep':
                return 'success';
            default:
                return 'info';
        }
    };

    // Phân Trang
    const [size, setSize] = useState(2); // kích thước phần tử trên 1 trang
    const [currentPage, setCurrentPage] = useState(4); // số trang hiện tại

    const totalPages = useMemo(() => {
        return Math.ceil(students.length / size)
    }, [students, size]);

    // Lọc các phần tử theo page và size, chức năng tìm kiếm theo email
    const filterData = useMemo(() => {
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const start = (currentPage - 1) * size;
        const end = currentPage * size;
        return filtered.slice(start, end);
    }, [students, searchQuery, currentPage, size]);

    return (
        <div>
            <div className="row">
                <div className="col-md-4">
                    <div className="input-group mb-3">
                        <div className="form-outline" data-mdb-input-init>
                            <input type="search" id="form1" className="form-control" placeholder='Tìm kiếm...' onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <button type="button" className="btn btn-primary" data-mdb-ripple-init onClick={handleSearch}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="input-group mb-3">
                        <button type="button" className="btn btn-primary" data-mdb-ripple-init onClick={toggleModal}>
                            <i className="bi bi-plus-lg"></i> Thêm
                        </button>
                    </div>
                </div>

                <div className="col-md-4">
                    <button type="button" className="btn btn-primary" data-mdb-ripple-init onClick={person}>
                        <i className="bi bi-person"></i>
                    </button>
                </div>
            </div>

            {/* Modal Thêm Sinh Viên */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Thêm Sinh Viên Mới</h5>
                                <button type="button" className="btn-close" onClick={toggleModal}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Tên</label>
                                        <input type="text" className="form-control" id="name" name="name" value={newStudentData.name} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="age" className="form-label">Tuổi</label>
                                        <input type="text" className="form-control" id="age" name="age" value={newStudentData.age} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Địa chỉ</label>
                                        <input type="text" className="form-control" id="address" name="address" value={newStudentData.address} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tags" className="form-label">Tags</label>
                                        <input type="text" className="form-control" id="tags" name="Tags" value={newStudentData.Tags} onChange={handleChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Đóng</button>
                                <button type="button" className="btn btn-primary" onClick={addStudent}>Thêm Sinh Viên</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Chỉnh Sửa Sinh Viên */}
            {showEditModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Chỉnh Sửa Sinh Viên</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="edit-name" className="form-label">Tên</label>
                                        <input type="text" className="form-control" id="edit-name" name="name" value={editStudentData.name} onChange={handleEditChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edit-age" className="form-label">Tuổi</label>
                                        <input type="text" className="form-control" id="edit-age" name="age" value={editStudentData.age} onChange={handleEditChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edit-address" className="form-label">Địa chỉ</label>
                                        <input type="text" className="form-control" id="edit-address" name="address" value={editStudentData.address} onChange={handleEditChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edit-tags" className="form-label">Tags</label>
                                        <input type="text" className="form-control" id="edit-tags" name="Tags" value={editStudentData.Tags} onChange={handleEditChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Đóng</button>
                                <button type="button" className="btn btn-primary" onClick={saveEditedStudent}>Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bảng Danh Sách Sinh Viên */}
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="checkbox1" />
                                <label className="form-check-label" htmlFor="checkbox1"></label>
                            </div>
                        </th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Address</th>
                        <th scope="col">Tags</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filterData.map((student) => (
                        <tr key={student.id}>
                            <td>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id={`checkbox${student.id}`} />
                                    <label className="form-check-label" htmlFor={`checkbox${student.id}`}></label>
                                </div>
                            </td>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.address}</td>
                            <td>{student.Tags.split(',').map((tag, index) => (
                                <span key={index} className={`badge bg-${getTagColor(tag)} me-1`}>
                                    {tag.trim()}
                                </span>
                            ))}</td>
                            <td>
                                <button onClick={() => handleDelete(student.id)} className="btn btn-danger me-2">Xóa</button>
                                <button onClick={() => handleEdit(student.id)} className="btn btn-primary">Sửa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <footer className="d-flex justify-content-end align-items-center gap-3">
                <select className="form-select" value={size} onChange={(e) => setSize(+e.target.value)}>
                    <option value={2}>Hiển thị 2 bản ghi trên trang</option>
                    <option value={5}>Hiển thị 5 bản ghi trên trang</option>
                    <option value={8}>Hiển thị 8 bản ghi trên trang</option>
                    <option value={10}>Hiển thị 10 bản ghi trên trang</option>
                </select>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <a onClick={() => setCurrentPage(currentPage - 1)} className="page-link" href="#">
                            Previous
                        </a>
                    </li>
                    {/* đổ ra số trang tương ứng với số thẻ li */}
                    {
                        Array.from(new Array(totalPages), (_, index) => index + 1).map((page, index) =>
                            <li key={index} className={`page-item ${currentPage === page ? "active" : ""}`}><a onClick={() => setCurrentPage(page)} className="page-link" href="#">{index + 1}</a></li>
                        )
                    }
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}><a onClick={() => setCurrentPage(currentPage + 1)} className="page-link" href="#">Next</a></li>
                </ul>
            </footer>
        </div>
    );
};

export default Table;
