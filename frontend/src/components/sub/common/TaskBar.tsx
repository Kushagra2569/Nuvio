import adjustmentsHorizontal from "../../../assets/adjustmentsHorizontal.svg"
type propsTaskBar = {

}

export default function TaskBar(props: propsTaskBar) {
    return (
        <div className="flex justify-between p-2">
            <h3 className="font-bold">Nuvio</h3>
            <img src={adjustmentsHorizontal} className="m-2 w-8 h-8 cursor-pointer"/>
        </div>
    )
}

