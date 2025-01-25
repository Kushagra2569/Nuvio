import SpotifyHome from "./sub/music/SpotifyHome"
import TaskTracker from "./sub/tasks-app/TaskTracker"

type propsHome = {

}

export default function Home(props: propsHome) {
    return (
        <div className="flex md:flex-wrap w-full h-full items-center">
            <div className="lhs flex flex-col justify-evenly h-full w-1/3 border border-black">
                <div className="music-wrapper flex-1 border border-black">
                    <SpotifyHome/>
                </div>
                <div className="task-tracker-wrapper flex-2 border border-black">
                    <TaskTracker/>
                </div>
            </div>
            <div className="rhs h-full w-2/3 border-l-4 border-black">
                Large RHS
            </div>
        </div>
    )
}