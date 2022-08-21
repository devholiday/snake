const LayerPoints = ({layer}) => {
    const scorePointOfType = [1, 2, 3, 4, 5];
    const getScorePointByType = (type = 0) => {
        return scorePointOfType[type];
    };

    return <div className="layer points">
        {layer.map((line, i) => (
            <div className="line" key={i}>
                {line.map((cell, j) => (
                    <div className={cell.enabled ? "cell fill" : "cell"} key={i + j}>
                        {cell.enabled &&
                            <span className="point">{getScorePointByType(cell.type)}</span>}
                    </div>
                ))}
            </div>
        ))}
    </div>;
};

export default LayerPoints;