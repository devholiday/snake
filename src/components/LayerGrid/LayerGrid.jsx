import style from "./LayerGrid.module.css";

const LayerGrid = ({layer}) => {
    return <div className={"layer "+style.grid}>
        {layer.map((line, i) => (
            <div className="column" key={i}>
                {line.map((cell, j) => (
                    <div className={"cell " + style.gridCell + " " + (cell.state ? style.concat : "")} key={i + j}>
                        {cell.state && (
                            <>
                                {cell.head && <div className={style.part + " " + style.head}>H</div>}
                                {!cell.tail && !cell.head && <div className={style.part + " " + style.middle}/>}
                                {cell.tail && <div className={style.part + " " + style.tail}>T</div>}
                            </>
                        )}
                    </div>
                ))}
            </div>
        ))}
    </div>;
};

export default LayerGrid;