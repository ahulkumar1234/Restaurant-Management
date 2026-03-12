import "./chart.css"

const ProgressBars = ({ served, dineIn, takeaway }) => {

    const total = served + dineIn + takeaway;

    const servedPercent = total ? Math.round((served / total) * 100) : 0;
    const dineInPercent = total ? Math.round((dineIn / total) * 100) : 0;
    const takeawayPercent = total ? Math.round((takeaway / total) * 100) : 0;

    return (
        <div className="progress-container">

            <div className="progress-row">
                <span>Take Away</span>
                <span>({takeawayPercent}%)</span>
                <div className="progress-bar">
                    <div className="progress-fill take" style={{ width: `${takeawayPercent}%` }}></div>
                </div>
            </div>

            <div className="progress-row">
                <span>Served</span>
                <span>({servedPercent}%)</span>
                <div className="progress-bar">
                    <div className="progress-fill served" style={{ width: `${servedPercent}%` }}></div>
                </div>
            </div>

            <div className="progress-row">
                <span>Dine In</span>
                <span>({dineInPercent}%)</span>
                <div className="progress-bar">
                    <div className="progress-fill dine" style={{ width: `${dineInPercent}%` }}></div>
                </div>
            </div>

        </div>
    );
};

export default ProgressBars;