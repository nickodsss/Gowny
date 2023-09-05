import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import AddEditDressForm from "../components/AddEditDressForm"
import AddEditDressFormPart2 from "../components/AddEditDressFormPart2"
import { detailDressFetch } from "../stores/actions/actionCreator"

const EditDressPage = () => {
    const { id } = useParams()

    const dispatch = useDispatch()
    let { detailDress } = useSelector((state) => state?.dress)

    useEffect(() => {
        dispatch(detailDressFetch(id))
    }, [id])

    // useEffect(
    //     () => {
    //         const images = { ...detailDress.Images }
    //         const newObj = { ...detailDress }
    //         newObj.Images = images
    //         detailDress = newObj;
    //     }, [detailDress]
    // )

    // const images = { ...detailDress.Images }
    // const newObj = { ...detailDress }
    // newObj.Images = images
    // detailDress = newObj;

    // const detailDressEffect = newObj

    // console.log(detailDress, "<< effect")


    return (
        <>
            <AddEditDressForm detailDressFromPage={detailDress} />
        </>
    )
}

export default EditDressPage