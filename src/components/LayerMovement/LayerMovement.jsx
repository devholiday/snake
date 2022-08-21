const LayerMovement = ({layer}) => {
    return <div className="layer movement">
        {layer.map((line, i) => (
            <div className="line" key={i}>
                {line.map((cell, j) => (
                    <div className={cell.state ? "cell fill" : "cell"} key={i + j}>
                        {cell.head && <span className="head">H</span>}
                        {cell.tail && <span className="tail">T</span>}
                    </div>
                ))}
            </div>
        ))}
    </div>;
};

export default LayerMovement;