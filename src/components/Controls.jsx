import React, {useCallback} from 'react';
import {FaRandom} from "react-icons/fa";

const Controls = React.memo(({region, setRegion, errorPerRecord, setErrorPerRecord, seed, setSeed}) => {
    const handleRegionChange = useCallback((e) => {
        setRegion(e.target.value);
    }, [setRegion]);

    const handleInputChange = useCallback((e) => {
        let newValue = parseInt(e.target.value, 10);
        if (newValue > 1000) {
            newValue = 1000;
        }
        setErrorPerRecord(newValue);
    }, [setErrorPerRecord]);

    const handleSliderChange = useCallback((e) => {
        setErrorPerRecord(parseFloat(e.target.value));
    }, [setErrorPerRecord]);

    const handleSeedChange = useCallback((e) => {
        setSeed(e.target.value);
    }, [setSeed]);

    const generateRandomSeed = useCallback(() => {
        const randomSeed = Math.floor(Math.random() * 1000000);
        setSeed(randomSeed.toString());
    }, [setSeed]);

    return (
        <div className="controls d-flex flex-row justify-content-evenly align-items-center mt-5">
            <div className="form-group d-flex flex-row align-items-center">
                <label htmlFor="region" className='p-lg-2'>Region:</label>
                <select id="region" className="form-select" value={region} onChange={handleRegionChange}>
                    <option value="">Select a region</option>
                    <option value="he">Israel</option>
                    <option value="uk">Ukraine</option>
                    <option value="pl">Poland</option>
                    <option value="es">Spain</option>
                    <option value="de">Germany</option>
                    <option value="ja">Japan</option>
                    <option value="ru">Russia</option>
                </select>
            </div>

            <div className="form-group d-flex flex-row align-items-center">
                <label htmlFor="errorPerRecord" className='p-lg-2'>Errors:</label>
                <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.25"
                    value={errorPerRecord}
                    onChange={handleSliderChange}
                    className="form-control-range"
                    style={{width: '200px', marginLeft: '10px', marginRight: '15px'}}
                />
                <input id="errorPerRecord" type="number" min="0" max="1000" value={errorPerRecord}
                       onChange={handleInputChange} className="form-control"/>
            </div>

            <div className="form-group d-flex flex-row align-items-center">
                <label htmlFor="seed" className='p-lg-2'>Seed:</label>
                <input id="seed" type="text" value={seed} onChange={handleSeedChange} className="form-control"/>
                <button className="btn btn-primary m-lg-3 w-25" onClick={generateRandomSeed}>
                    <FaRandom/>
                </button>
            </div>
        </div>
    );
});

export default Controls;
