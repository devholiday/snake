import style from "./LayerPoints.module.css";

const LayerPoints = ({layer, getScorePoint}) => {
    return <div className="layer">
        {layer.map((line, i) => (
            <div className="column" key={i}>
                {line.map((cell, j) => (
                    <div className={cell.enabled ? "cell "+style : "cell"} key={i + j}>
                        {cell.enabled &&
                            <div className={`${style.point} 
                                ${getScorePoint(cell.type) === 1 && style.point1}
                                ${getScorePoint(cell.type) === 2 && style.point2}
                                ${getScorePoint(cell.type) === 3 && style.point3}
                                ${getScorePoint(cell.type) === 4 && style.point4}
                                ${getScorePoint(cell.type) === 5 && style.point5}`}>
                                {getScorePoint(cell.type)}</div>}
                    </div>
                ))}
            </div>
        ))}
    </div>;
};

export default LayerPoints;