import { useEffect } from "react";
import { useState } from "react";

const AddEditDressFormPart2 = ({ detailDressFromPage }) => {
    const [formValue, setFormValue] = useState()

    useEffect(
        () => {
            const images = { ...detailDressFromPage.Images }
            const newObj = { ...detailDressFromPage }
            newObj.Images = images
            setFormValue(newObj);
        }, [detailDressFromPage]
    )

    return (
        <>
            <pre>{JSON.stringify(detailDressFromPage, null, 4)}</pre>
            <input value={formValue?.Images[0]?.name} />
            <input value={formValue?.name} onChange={() => { }} />
        </>
    )
}

export default AddEditDressFormPart2;