import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { cancelEnrollment } from "../../store/actions/enrollmentsActions";
import Modal from "../../UI/Modal";
import { 
    EnrollmentCardContainer, 
    CourseCardTitle, 
    CourseCardDescription,
    CourseCardProfessor,
    CourseCardButton
} from "../../styles";

const EnrollmentCard = ({ enrollment, cancelEnrollment }) => {
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);

    if (!enrollment.course || !enrollment.student) return null;

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
                <CourseCardDescription>{enrollment.course?.description}</CourseCardDescription>
                <CourseCardDescription>{enrollment.student?.receivedGrades}</CourseCardDescription>
                <CourseCardProfessor>Prof. {enrollment.course?.professor?.name}</CourseCardProfessor>
                <CourseCardButton onClick={() => handleUnenroll(enrollment)}>Desuscribirse</CourseCardButton>
            </EnrollmentCardContainer>
            <Modal isOpen={isModalOpen}>
                <h2>¿Seguro que deseas cancelar tu suscripción a este curso?</h2>
                <h3 style={{textAlign: 'center'}}>{selectedEnrollment?.course?.title}</h3>
                <p style={{textAlign: 'center'}}>Prof. {selectedEnrollment?.course?.professor?.name}</p>
                <br />
                <button className="ui button negative" onClick={confirmCancel} style={{justifySelf: 'center'}}>Confirmar</button>
                <button className="ui button" onClick={() => setIsModalOpen(false)} style={{justifySelf: 'center'}}>Cancelar</button>
            </Modal>
        </>
    );
};

export default connect(null, { cancelEnrollment })(EnrollmentCard);