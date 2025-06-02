import React, { useState } from "react";

const GradeScoreInput = ({ enroll, canEditGrades, postGrade, editGrade }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(
        enroll.student?.receivedGrades?.[0] ?? ''
    );

    const gradeId = enroll.student?.receivedGrades?.[0]?.id || null;
    const gradeValue = enroll.student?.receivedGrades?.[0] ?? null;

    const handleConfirm = () => {
        const parsed = parseFloat(inputValue);
        if (!isNaN(parsed)) {
            if (gradeId) {
                editGrade(gradeId, parsed);
            } else {
                postGrade(enroll.student._id, parsed);
            }
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setInputValue(gradeValue ?? '');
        setIsEditing(false);
    };

    if (!canEditGrades) return <>{gradeValue ?? "Sin nota"}</>;

    return (
        <>
            {isEditing ? (
                <>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        style={{ width: '60px' }}
                    />
                    <span style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={handleConfirm}>✔️</span>
                    <span style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={handleCancel}>❌</span>
                </>
            ) : (
                <>
                    {gradeValue ?? "Sin nota"}
                    <span
                        style={{ cursor: 'pointer', marginLeft: '8px' }}
                        onClick={() => setIsEditing(true)}
                    >
                        {gradeValue !== null ? "✏️" : "✍"}
                    </span>
                </>
            )}
        </>
    );
};

export default GradeScoreInput;
