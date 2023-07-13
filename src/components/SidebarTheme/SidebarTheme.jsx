import { useContext, useState } from 'react';
import './sidebar-theme.scss';
import DataContext from '../../context/context';
/** Компонент отвечающий за смену цветовой темы */
const ChooseThemeElement = () =>{
    const { changeTheme } = useContext(DataContext);
    const [theme, setTheme] = useState(localStorage.theme === 'true' ? true : false);

    const onThemeChange = () => {
        changeTheme();
        setTheme(!theme);
    }

    return(
        <div className='choose-theme'>
            <img src="./images/sun.svg" alt="light theme" />
            <label className="theme-switch">
                <input type="checkbox" onChange={onThemeChange} checked={theme}/>
                <span className="slider round"></span>
            </label>
            <img src="./images/moon.svg" alt="dark theme" />
        </div>
    );
}

export default ChooseThemeElement;