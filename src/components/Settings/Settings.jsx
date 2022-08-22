import { useForm } from "react-hook-form";

const Settings = ({startGame}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        startGame(data);
    };

    return (
        <div className="settings">
            <span>Settings:</span>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <span>Size Grid</span>
                    <select defaultValue="20x20" {...register("gridSize")}>
                        <option value="30x15">30x15</option>
                        <option value="20x20">20x20</option>
                        <option value="10x10">10x10</option>
                        <option value="5x5">5x5</option>
                    </select>
                </div>
                <div>
                    <span>Borders (on|off)</span>
                </div>
                <div>
                    <span>Timer (on|off)</span>
                </div>
                <div>
                    <label>Speed snake (between 100 and 1000):</label>
                    <input type="range" {...register("snakeSpeed")} defaultValue="300"
                           min="100" max="1000" step="100" />
                </div>
                <div>
                    <label>Score random value (only 1, range from 1 to 5):</label>
                    <input type="range" {...register("scoreValue")} defaultValue="1"
                           min="1" max="5" step="1" />
                </div>

                <input type="submit" value="Start game"/>
            </form>
        </div>
    );
};

export default Settings;