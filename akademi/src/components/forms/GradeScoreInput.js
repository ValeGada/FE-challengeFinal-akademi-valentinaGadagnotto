import { useState } from "react";
import { Error, OverlayDiv, ContentDiv } from "../../styles";

const GradeScoreInput = ({ enroll, canEditGrades, postGrade, editGrade }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState(
        enroll.student?.profile?.receivedGrades?.[0]?.score ?? ''
    );
    const [error, setError] = useState('');
    const gradeId = enroll.student?.profile?.receivedGrades?.[0]?.id || null;

    const handleOpenModal = () => {
        if (!canEditGrades) return;
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setInputValue(enroll.student?.profile?.receivedGrades?.[0]?.score ?? '');
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
            editGrade(gradeId, parsed);
        } else {
            postGrade(parsed);
        }

        setError('');
        setIsModalOpen(false);
    };

    const currentGrade = enroll.student?.profile?.receivedGrades?.[0]?.score ?? "Sin nota";

    return (
        <>
            <span style={{ cursor: 'pointer' }} onClick={handleOpenModal}>
                {currentGrade === "Sin nota" ? "Cargar Nota ✍️ " : `${currentGrade} ✏️`}
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
                            <button onClick={handleCloseModal}>Cancelar</button>
                            <button onClick={handleConfirm}>Guardar</button>
                        </div>
                    </ContentDiv>
                </OverlayDiv>
            )}
        </>
    );
};

export default GradeScoreInput;
