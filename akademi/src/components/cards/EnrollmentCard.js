import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { cancelEnrollment } from "../../store/actions/enrollmentsActions";
import Modal from "../../UI/Modal";
import { 
    EnrollmentCardContainer, 
    CourseCardTitle, 
    CourseCardDescription,
    CourseCardProfessor,
    CourseCardButton,
    GenericButton,
    CardButtonsContainer,
    GenericButtonsContainer
} from "../../styles";

const EnrollmentCard = ({ enrollment, cancelEnrollment }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);

    if (!enrollment.course || !enrollment.student) return null;

    const grade = enrollment.student?.profile?.receivedGrades?.find(
        g => g.course.toString() === enrollment.course.id.toString()
    );

    const currentGrade = grade?.score ?? null;

    const handleCourseView = () => {
        navigate(`/student/courses/${enrollment.course.id}`)
    }

    const handleUnenroll = (enrollment) => {
        setSelectedEnrollment(enrollment);
        setIsModalOpen(true);
    }

    const confirmCancel = () => {
        cancelEnrollment(selectedEnrollment.id);
        setIsModalOpen(false);
    }

    return (
        <>
            <EnrollmentCardContainer>
                <CourseCardTitle>{enrollment.course?.title}</CourseCardTitle>

                {location.pathname.includes('/my-enrollments') ?
                    <CourseCardDescription>{enrollment.course?.description}</CourseCardDescription>
                    : null
                }

                {currentGrade !== undefined && currentGrade !== null ? (
                    <CourseCardDescription>
                        Nota: {currentGrade}
                    </CourseCardDescription>
                ) : (
                    <CourseCardDescription>
                        Sin calificación
                    </CourseCardDescription>
                )}

                <CourseCardProfessor>Prof. {enrollment.course?.professor?.name}</CourseCardProfessor>

                {location.pathname.includes('/my-enrollments') ? (
                    <CardButtonsContainer>
                        <CourseCardButton onClick={handleCourseView}>Ver curso</CourseCardButton>
                        <CourseCardButton onClick={() => handleUnenroll(enrollment)}>Desuscribirse</CourseCardButton>
                    </CardButtonsContainer>
                ) : (
                    <CardButtonsContainer>
                        <CourseCardButton onClick={handleCourseView}>Ver curso</CourseCardButton>
                    </CardButtonsContainer>
                )}
            </EnrollmentCardContainer>

            <Modal isOpen={isModalOpen}>
                <h2>¿Seguro que deseas cancelar tu suscripción a este curso?</h2>
                <h3 style={{textAlign: 'center'}}>{selectedEnrollment?.course?.title}</h3>
                <p style={{textAlign: 'center'}}>Prof. {selectedEnrollment?.course?.professor?.name}</p>
                <br />
                <GenericButtonsContainer>
                    <GenericButton onClick={confirmCancel} style={{justifySelf: 'center'}}>Confirmar</GenericButton>
                    <GenericButton onClick={() => setIsModalOpen(false)} style={{justifySelf: 'center'}}>Cancelar</GenericButton>
                </GenericButtonsContainer>
            </Modal>
        </>
    );
};

export default connect(null, { cancelEnrollment })(EnrollmentCard);