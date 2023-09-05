import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

const PaymentPage = () => {

    const { qrisImage } = useSelector((state) => state?.payment)

    return (
        <>
            <NavLink to={qrisImage} />
        </>
    )
}

export default PaymentPage