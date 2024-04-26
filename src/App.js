import React, {useState} from 'react';
import Controls from "./components/Controls";
import UserDataTable from "./components/UserDataTable";

const App = () => {
    const [region, setRegion] = useState('');
    const [errorPerRecord, setErrorPerRecord] = useState(0);
    const [seed, setSeed] = useState('');

    return (
        <div>
            <Controls
                region={region}
                setRegion={setRegion}
                errorPerRecord={errorPerRecord}
                setErrorPerRecord={setErrorPerRecord}
                seed={seed}
                setSeed={setSeed}
            />
            <UserDataTable region={region} errorPerRecord={errorPerRecord} seed={seed}/>
        </div>
    );
};

export default App;