import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { cancelEnrollment } from "../../store/actions/enrollmentsActions";
import { CoursesTable, CoursesTd, CoursesTh, CoursesActions, ProfessorLogoutButton, AdminLogoutButton } from "../../styles";
import Modal from "../../UI/Modal";
import Spinner from "../../UI/Spinner";

const EnrollmentTableView = ({ user, enrollments, cancelEnrollment, isLoading }) => {
    const navigate = useNavigate();

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);

    const handleDeleteEnrollment = (enrollment) => {
        setSelectedEnrollment(enrollment);
        setIsModalOpen(true);
    }

    const confirmDelete = () => {
        cancelEnrollment(selectedEnrollment.id);
        setIsModalOpen(false);
    }
    
    return (
        <>
            {isLoading ? 
                <Spinner /> :
                <CoursesTable>
                    <thead>
                        <tr>
                            <CoursesTh>Suscripciones</CoursesTh>
                            <CoursesTh>Curso</CoursesTh>
                            {user.role === 'superadmin' && <CoursesTh>Profesor</CoursesTh>}
                            <CoursesTh>Capacidad</CoursesTh>
                            {/* <CoursesTh>Duración</CoursesTh> */}
                            <CoursesTh>Acciones</CoursesTh>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments?.map(e => (
                            <tr key={e.course._id}>
                                <CoursesTd>{enrollments?.length || 0}</CoursesTd>
                                <CoursesTd>{e.course.title}</CoursesTd>
                                {user.role === 'superadmin' &&
                                    <CoursesTd>{e.course.professor?.name}</CoursesTd>
                                }
                                <CoursesTd>{e.course.maximumCapacity}</CoursesTd>
                                {/* <CoursesTd>{course.duration} hs</CoursesTd> */}
                                <CoursesActions>
                                    {user.role === 'professor' ? 
                                        <>
                                            <ProfessorLogoutButton onClick={() => navigate(`/prof/enrollments/${e.id}`)}>
                                                Ver/Editar ✏️
                                            </ProfessorLogoutButton>
                                            <ProfessorLogoutButton onClick={() => handleDeleteEnrollment(e)}>
                                                Eliminar 🗑️
                                            </ProfessorLogoutButton>
                                        </>
                                    :
                                        <>
                                            <AdminLogoutButton onClick={() => navigate(`/admin/enrollments/${e.id}`)}>
                                                Ver/Editar ✏️
                                            </AdminLogoutButton>
                                            <AdminLogoutButton onClick={() => handleDeleteEnrollment(e)}>
                                                Eliminar 🗑️
                                            </AdminLogoutButton>
                                        </>
                                    }
                                </CoursesActions>
                            </tr>
                        ))}
                    </tbody>
                </CoursesTable>
            }
            <Modal isOpen={isModalOpen}>
                <h2>¿Seguro que deseas eliminar esta suscripción?</h2>
                <h3 style={{textAlign: 'center'}}>{selectedEnrollment?.title}</h3>
                <br />
                <button className="ui button negative" onClick={confirmDelete} style={{justifySelf: 'center'}}>Eliminar</button>
                <button className="ui button" onClick={() => setIsModalOpen(false)} style={{justifySelf: 'center'}}>Cancelar</button>
            </Modal>
        </>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoading: state.courses.isLoading
    }
}

export default connect(mapStateToProps, { cancelEnrollment })(EnrollmentTableView);