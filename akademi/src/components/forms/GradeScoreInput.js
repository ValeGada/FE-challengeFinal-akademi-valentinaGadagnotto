import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Error, OverlayDiv, ContentDiv, GenericButton } from "../../styles";

const GradeScoreInput = ({ enroll, canEditGrades, postGrade, editGrade }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();

    const currentGrade = enroll.student?.profile?.receivedGrades?.find(
        grade => grade.course?.toString() === enroll.course?.id?.toString()
    )?.score;

    const gradeId = enroll.student?.profile?.receivedGrades?.find(
        grade => grade.course?.toString() === enroll.course?.id?.toString()
    )?.id;

    useEffect(() => {
        setInputValue(currentGrade ?? '');
    }, [isModalOpen]);

    const handleOpenModal = () => {
        if (!canEditGrades) return;
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setError('');
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        const parsed = parseFloat(inputValue);
        if (isNaN(parsed) || parsed < 0 || parsed > 10) {
            setError('* La nota debe ser un número entre 0 y 10.');
            return;
        }

        if (gradeId) {
            editGrade(gradeId, { score: parsed });
        } else {
            postGrade({
                score: parsed,
                student: enroll.student.id,
                course: enroll.course.id
            });
        }

        setError('');
        setIsModalOpen(false);
    };

    return (
        <>
            {location.pathname.includes('/grades') ? (
                <span style={{ cursor: 'pointer' }} onClick={handleOpenModal}>
                    {!currentGrade ? "Cargar Nota ✍️ " : `${currentGrade} ✏️`}
                </span>
            ) : (
                <>
                    {!currentGrade ? "Sin Nota" : `${currentGrade}`}
                </>
            )}          

            {isModalOpen && (
                <OverlayDiv>
                    <ContentDiv>
                        <h3>{gradeId ? "Editar Nota" : "Cargar Nota"}</h3>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ej: 7.5"
                        />
                        {error && <Error>{error}</Error>}
                        <div>
                            <GenericButton onClick={handleCloseModal}>Cancelar</GenericButton>
                            <GenericButton onClick={handleConfirm}>Guardar</GenericButton>
                        </div>
                    </ContentDiv>
                </OverlayDiv>
            )}
        </>
    );
};

export default GradeScoreInput;
