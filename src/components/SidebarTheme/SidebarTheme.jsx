import { useContext } from 'react';
import './sidebar-theme.scss';
import DataContext from '../../context';
/** Компонент отвечающий за смену цветовой темы */
const ChooseThemeElement = () =>{
    const { theme, setTheme} = useContext(DataContext);

    const onThemeChange = () => {
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