export default function Loader() {
    return (
        <div className="loader">
            <div className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
            </div>
            <div className="loader-text">
                <span>
                    Fetching data, please wait
                </span>
            </div>
        </div>
    )
}
