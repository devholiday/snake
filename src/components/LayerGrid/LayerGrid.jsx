const LayerGrid = ({layer}) => {
    return <div className="layer grid">
        {layer.map((line, i) => (
            <div className="line" key={i}>
                {line.map((cell, j) => (
                    <div className="cell" key={i + j}/>
                ))}
            </div>
        ))}
    </div>;
};

export default LayerGrid;