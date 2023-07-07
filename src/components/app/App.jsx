import { useState } from 'react';
import AppHeader from '../Header/Header';
import { DataProvider } from '../../context';
import Main from '../Main/Main';
import './App.scss';

const theme = localStorage.theme === 'true' ? true : false;

const App = () => {
    const [darkTheme, setDarkTheme] = useState(theme);

    return(
        <div className={darkTheme ? 'body dark' : 'body'}>
            <DataProvider setTheme={setDarkTheme} theme={darkTheme}>
                <AppHeader/>
                <Main/>
            </DataProvider>
        </div>
    )
}

export default App;