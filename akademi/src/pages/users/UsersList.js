import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { deleteUser, getUsers, setUserQueries } from "../../store/actions/usersActions";
import { CoursesTable, CoursesTd, CoursesTh, CourseListTitle, GenericButton } from "../../styles";
import Spinner from "../../UI/Spinner";
import Modal from "../../UI/Modal";

const UsersList = ({users, getUsers, isLoading, deleteUser, setUserQueries, queryParams, pagination }) => {
    const navigate = useNavigate();

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getUsers(queryParams);
    }, [getUsers, queryParams]);

    const handleSearchChange = (e) => {
        setUserQueries({ search: e.target.value, page: 1 });
    };

    const handleSort = (field) => {
        const newOrder = queryParams.sortOrder === "asc" ? "desc" : "asc";
        setUserQueries({ sortBy: field, sortOrder: newOrder });
    };

    const handleChangePage = (page) => {
        setUserQueries({ page });
    };

    const handleChangePerPage = (limit) => {
        setUserQueries({ limit, page: 1 });
    };

    const filterByRole = (role) => {
        setUserQueries({ role, page: 1 });
    };

    const clearFilters = () => {
        setUserQueries({
            search: "",
            sortBy: "name",
            sortOrder: "asc",
            page: 1,
            limit: 10,
            role: ""
        });
    };

    // Modal action
    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        deleteUser(selectedUser.id);
        setIsModalOpen(false);
    };

    return (
        <div>
            <CourseListTitle>Total de Usuarios</CourseListTitle>
            <div>
                <div className='item'>
                    <input 
                        type='text' 
                        placeholder='Buscar usuario...'
                        value={queryParams.search}
                        onChange={handleSearchChange}
                    />
                </div>
                <div>
                    <div>
                        <GenericButton onClick={() => filterByRole('superadmin')}>
                            Superadmin
                        </GenericButton>
                        <GenericButton onClick={() => filterByRole('professor')}>
                            Profesores
                        </GenericButton>
                        <GenericButton onClick={() => filterByRole('student')}>
                            Estudiantes
                        </GenericButton>
                    </div>
                    <div>
                        Ordenar por:
                        <button onClick={()=> handleSort('name')}>
                            Nombre {queryParams.sortOrder === 'asc' ? "↓" : "↑"}
                        </button>
                    </div>
                    <button onClick={clearFilters}>Limpiar filtros</button>
                </div>     
            </div>
            {isLoading 
                ? <Spinner /> 
                : <>
                    <CoursesTable>
                        <thead>
                            <tr>
                                <CoursesTh>Nombre</CoursesTh>
                                <CoursesTh>Email</CoursesTh>
                                <CoursesTh>Rol</CoursesTh>
                                <CoursesTh>Acciones</CoursesTh>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user.id}>
                                        <CoursesTd>{user.name}</CoursesTd>
                                        <CoursesTd>{user.email}</CoursesTd>
                                        <CoursesTd>{user.role}</CoursesTd>
                                        <CoursesTd>
                                            <GenericButton onClick={() => navigate(`/admin/users/${user.id}`)}>
                                                Ver/Editar ✏️
                                            </GenericButton>
                                            <GenericButton onClick={() => handleDeleteUser(user)}>
                                                Eliminar 🗑️
                                            </GenericButton>
                                        </CoursesTd>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <CoursesTd colSpan={4}>No hay usuarios registrados.</CoursesTd>
                                </tr>
                            )}
                        </tbody>
                    </CoursesTable>
                    {/* Paginación */}
                    <div>
                        Usuarios por página: 
                        <span onClick={()=>handleChangePerPage(5)}>5</span> - 
                        <span onClick={()=>handleChangePerPage(10)}>10</span>
                    </div>
                    <div>
                        {pagination.totalPages > 0 && 
                            Array.from({ length: pagination.totalPages }, (_, i) => (
                                <button 
                                    key={i}
                                    onClick={() => handleChangePage(i + 1)}
                                    style={pagination.currentPage === i + 1 ? { background: '#555555', color: '#f1f1f1' } : {}}
                                >
                                    {i + 1}
                                </button>                   
                            ))}
                    </div>
                </>
            }
            <Modal isOpen={isModalOpen}>
                <h2>¿Seguro que deseas eliminar este usuario?</h2>
                <h3 style={{textAlign: 'center'}}>{selectedUser?.name}</h3>
                <br />
                <button onClick={confirmDelete} style={{justifySelf: 'center'}}>Eliminar</button>
                <button onClick={() => setIsModalOpen(false)} style={{justifySelf: 'center'}}>Cancelar</button>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isLoading: state.grades.isLoading,
        users: state.users.all,
        queryParams: state.users.queryParams,
        pagination: state.users.pagination
    }
}

export default connect(mapStateToProps, { getUsers, deleteUser, setUserQueries })(UsersList);