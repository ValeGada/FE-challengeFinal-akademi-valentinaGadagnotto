import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../store/actions/usersActions";
import { CoursesTable, CoursesTd, CoursesTh, CourseListTitle, AdminLogoutButton } from "../../styles";
import Spinner from "../../UI/Spinner";

const UsersList = ({users, getUsers, isLoading }) => {   
    useEffect(() => {
        getUsers();
    }, [getUsers])

    return (
        <div>
            <CourseListTitle>Total de Usuarios</CourseListTitle>
            {isLoading 
                ? <Spinner /> 
                : <>
                    <div>
                        <AdminLogoutButton>
                            Superadmin
                        </AdminLogoutButton>
                        <AdminLogoutButton>
                            Profesores
                        </AdminLogoutButton>
                        <AdminLogoutButton>
                            Estudiantes
                        </AdminLogoutButton>
                    </div>
                    <CoursesTable>
                        <thead>
                            <tr>
                                <CoursesTh>Nombre</CoursesTh>
                                <CoursesTh>Email</CoursesTh>
                                <CoursesTh>Rol</CoursesTh>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user.id}>
                                        <CoursesTd>{user.name}</CoursesTd>
                                        <CoursesTd>{user.email}</CoursesTd>
                                        <CoursesTd>{user.role}</CoursesTd>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <CoursesTd colSpan={3}>No hay usuarios registrados.</CoursesTd>
                                </tr>
                            )}
                        </tbody>
                    </CoursesTable>
                </>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isLoading: state.grades.isLoading,
        users: state.users.all,
    }
}

export default connect(mapStateToProps, { getUsers })(UsersList);