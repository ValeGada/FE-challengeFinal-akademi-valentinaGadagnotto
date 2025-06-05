import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { deleteUser, getUsers, setUserQueries } from "../../store/actions/usersActions";
import { 
    Table, 
    Td, 
    Th, 
    GenericTitle, 
    GenericButton, 
    GenericButtonsContainer,
    FiltersContainer,
    ControlsGroup,
    SearchInput,
    SortButton,
    SortContainer,
    ClearFiltersButton,
    PaginationContainer,
    PerPageSelector,
    PerPageNumber,
    PageButton
} from "../../styles";
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
            <GenericTitle>Total de Usuarios</GenericTitle>
            <FiltersContainer>
                <div>
                    <SearchInput 
                        type='text' 
                        placeholder='Buscar usuario...'
                        value={queryParams.search}
                        onChange={handleSearchChange}
                    />
                </div>
                <br />
                <ControlsGroup>
                    <GenericButtonsContainer>
                        <GenericButton onClick={() => filterByRole('superadmin')}>
                            Superadmin
                        </GenericButton>
                        <GenericButton onClick={() => filterByRole('professor')}>
                            Profesores
                        </GenericButton>
                        <GenericButton onClick={() => filterByRole('student')}>
                            Estudiantes
                        </GenericButton>
                    </GenericButtonsContainer>
                </ControlsGroup>
                <ControlsGroup>
                    <SortContainer>
                        Ordenar por:
                        <SortButton onClick={()=> handleSort('name')}>
                            Nombre {queryParams.sortOrder === 'asc' ? "↓" : "↑"}
                        </SortButton>
                    </SortContainer>
                    <ClearFiltersButton onClick={clearFilters}>Limpiar filtros</ClearFiltersButton>
                </ControlsGroup>     
            </FiltersContainer>
            {isLoading 
                ? <Spinner /> 
                : <>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Nombre</Th>
                                <Th>Email</Th>
                                <Th>Rol</Th>
                                <Th>Acciones</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user.id}>
                                        <Td>{user.name}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>{user.role}</Td>
                                        <Td>
                                            <GenericButton onClick={() => navigate(`/admin/users/${user.id}`)}>
                                                Ver/Editar ✏️
                                            </GenericButton>
                                            <GenericButton onClick={() => handleDeleteUser(user)}>
                                                Eliminar 🗑️
                                            </GenericButton>
                                        </Td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <Td colSpan={4}>No hay usuarios registrados.</Td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    {/* Paginación */}
                    <PaginationContainer>
                        <PerPageSelector>
                            Usuarios por página: 
                            <PerPageNumber onClick={()=>handleChangePerPage(5)}>5</PerPageNumber> - 
                            <PerPageNumber onClick={()=>handleChangePerPage(10)}>10</PerPageNumber>
                        </PerPageSelector>
                        <div>
                            {pagination.totalPages > 0 && 
                                Array.from({ length: pagination.totalPages }, (_, i) => (
                                    <PageButton 
                                        key={i}
                                        active={pagination.currentPage === i + 1}
                                        onClick={() => handleChangePage(i + 1)}
                                    >
                                        {i + 1}
                                    </PageButton>                   
                                ))}
                        </div>
                    </PaginationContainer>
                </>
            }
            <Modal isOpen={isModalOpen}>
                <h2>¿Seguro que deseas eliminar este usuario?</h2>
                <h3 style={{textAlign: 'center'}}>{selectedUser?.name}</h3>
                <br />
                <GenericButtonsContainer>
                    <GenericButton onClick={confirmDelete} style={{justifySelf: 'center'}}>Eliminar</GenericButton>
                    <GenericButton onClick={() => setIsModalOpen(false)} style={{justifySelf: 'center'}}>Cancelar</GenericButton>
                </GenericButtonsContainer>
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