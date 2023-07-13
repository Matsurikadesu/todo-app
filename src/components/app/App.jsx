import { useMemo, useState } from 'react';
import AppHeader from '../Header/Header';
import { DataProvider } from '../../context/context';
import Main from '../Main/Main';
import './App.scss';

const theme = localStorage.theme === 'true' ? true : false;

const App = () => {
    const [darkTheme, setDarkTheme] = useState(theme);

    //Из-за смены темы темы рендерилось всё приложение, useMemo исправляет такое поведение
    const elements = useMemo(() => {
        return(
            <DataProvider setTheme={setDarkTheme}>
                <AppHeader/>
                <Main/>
            </DataProvider>
        )
    },[])

    return(
        <div className={darkTheme ? 'body dark' : 'body'}>
            {elements}
        </div>
    )
}

export default App;