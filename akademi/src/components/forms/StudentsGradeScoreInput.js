import { useState } from "react";
import { Error, OverlayDiv, ContentDiv, GenericButton } from "../../styles";

const StudentsGradeScoreInput = ({ grade, postGrade, editGrade }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState(grade.score || '');
    const [error, setError] = useState('');

    const gradeId = grade.id || null;

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setInputValue(grade.score || '');
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
                student: grade.student.id,
                course: grade.course.id
            });
        }

        setError('');
        setIsModalOpen(false);
    };

    const currentGrade = grade.score;

    return (
        <>
            <span style={{ cursor: 'pointer' }} onClick={handleOpenModal}>
                {!currentGrade ? "Cargar Nota ✍️ " : `${currentGrade} ✏️`}
            </span>

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

export default StudentsGradeScoreInput;