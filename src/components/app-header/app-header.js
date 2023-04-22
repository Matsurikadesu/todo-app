import Button from '../app-button/app-button';
import './app-header.scss';

const AppHeader = ({boards, currentBoard}) => {
    return (
        <header className="header">
            <div className="header__logo">
                <div className="header__icon">
                    <div className="header__icon-item"></div>
                    <div className="header__icon-item"></div>
                    <div className="header__icon-item"></div>
                </div>
                <div className="header__logo-text">
                    <svg width="114" height="26" viewBox="0 0 114 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.56001 25V19.656L7.48001 17.544L11.928 25H17.368L11.064 
                        14.568L17.4 7.528H11.48L5.56001 13.832V0.776001H0.76001V25H5.56001ZM24.92 25.384C27.096 25.384 28.8453 24.712 
                        30.168 23.368V25H34.648V13.48C34.648 12.2213 34.3333 11.1173 33.704 10.168C33.0747 9.21867 32.1947 8.47733 
                        31.064 7.944C29.9333 7.41067 28.632 7.144 27.16 7.144C25.304 7.144 23.6773 7.57067 22.28 8.424C20.8827 
                        9.27733 19.928 10.4293 19.416 11.88L23.256 13.704C23.5547 12.936 24.0293 12.3173 24.68 11.848C25.3307 
                        11.3787 26.0827 11.144 26.936 11.144C27.832 11.144 28.5413 11.368 29.064 11.816C29.5867 12.264 29.848 
                        12.8187 29.848 13.48V13.96L25.016 14.728C22.9253 15.0693 21.368 15.72 20.344 16.68C19.32 17.64 18.808 
                        18.856 18.808 20.328C18.808 21.9067 19.3573 23.144 20.456 24.04C21.5547 24.936 23.0427 25.384 24.92 25.384ZM24.376 
                        21.416C24.7813 21.7147 25.2827 21.864 25.88 21.864C27.0747 21.864 28.0347 21.4907 28.76 20.744C29.4853 19.9973 29.848 
                        19.0907 29.848 18.024V17.48L25.88 18.184C25.1973 18.312 24.6747 18.5307 24.312 18.84C23.9493 19.1493 23.768 19.592 23.768 
                        20.168C23.768 20.7013 23.9707 21.1173 24.376 21.416ZM42.968 25V14.792C42.968 13.7893 43.2667 12.984 43.864 12.376C44.4613 
                        11.768 45.2293 11.464 46.168 11.464C47.1067 11.464 47.8747 11.768 48.472 12.376C49.0693 12.984 49.368 13.7893 49.368 
                        14.792V25H54.168V13.768C54.168 12.4453 53.8907 11.288 53.336 10.296C52.7813 9.304 52.008 8.53067 51.016 7.976C50.024 
                        7.42133 48.8667 7.144 47.544 7.144C46.4347 7.144 45.4533 7.352 44.6 7.768C43.7467 8.184 43.096 8.81867 42.648 
                        9.672V7.528H38.168V25H42.968ZM71.704 24.168C70.36 24.9787 68.8347 25.384 67.128 25.384C66.0613 25.384 65.064 25.208 
                        64.136 24.856C63.208 24.504 62.4347 23.9973 61.816 23.336V25H57.336V0.776001H62.136V9C63.3733 7.76267 65.048 7.144 
                        67.16 7.144C68.824 7.144 70.328 7.54933 71.672 8.36C73.016 9.17067 74.0827 10.264 74.872 11.64C75.6613 13.016 76.056 
                        14.5573 76.056 16.264C76.056 17.9493 75.6667 19.4853 74.888 20.872C74.1093 22.2587 73.048 23.3573 71.704 24.168ZM66.552 
                        21.064C65.2507 21.064 64.1893 20.6213 63.368 19.736C62.5467 18.8507 62.136 17.6933 62.136 16.264C62.136 14.856 62.5467 13.704 
                        63.368 12.808C64.1893 11.912 65.2507 11.464 66.552 11.464C67.8747 11.464 68.9627 11.9173 69.816 12.824C70.6693 13.7307 71.096 
                        14.8773 71.096 16.264C71.096 17.672 70.6693 18.824 69.816 19.72C68.9627 20.616 67.8747 21.064 66.552 21.064ZM89.528 23.368C88.2053 24.712 86.456 25.384 84.28 25.384C82.4027 25.384 80.9147 24.936 79.816 24.04C78.7173 23.144 78.168 21.9067 78.168 20.328C78.168 18.856 78.68 17.64 79.704 16.68C80.728 15.72 82.2853 15.0693 84.376 14.728L89.208 13.96V13.48C89.208 12.8187 88.9467 12.264 88.424 11.816C87.9013 11.368 87.192 11.144 86.296 11.144C85.4427 11.144 84.6907 11.3787 84.04 11.848C83.3893 12.3173 82.9147 12.936 82.616 13.704L78.776 11.88C79.288 10.4293 80.2427 9.27733 81.64 8.424C83.0373 7.57067 84.664 7.144 86.52 7.144C87.992 7.144 89.2933 7.41067 90.424 7.944C91.5547 8.47733 92.4347 9.21867 93.064 10.168C93.6933 11.1173 94.008 12.2213 94.008 13.48V25H89.528V23.368ZM85.24 21.864C84.6427 21.864 84.1413 21.7147 83.736 21.416C83.3307 21.1173 83.128 20.7013 83.128 20.168C83.128 19.592 83.3093 19.1493 83.672 18.84C84.0347 18.5307 84.5573 18.312 85.24 18.184L89.208 17.48V18.024C89.208 19.0907 88.8453 19.9973 88.12 20.744C87.3947 21.4907 86.4347 21.864 85.24 21.864ZM102.328 14.792V25H97.528V7.528H102.008V9.672C102.456 8.81867 103.107 8.184 103.96 7.768C104.813 7.352 105.795 7.144 106.904 7.144C108.227 7.144 109.384 7.42133 110.376 7.976C111.368 8.53067 112.141 9.304 112.696 10.296C113.251 11.288 113.528 12.4453 113.528 13.768V25H108.728V14.792C108.728 13.7893 108.429 12.984 107.832 12.376C107.235 11.768 106.467 11.464 105.528 11.464C104.589 11.464 103.821 11.768 103.224 12.376C102.627 12.984 102.328 13.7893 102.328 14.792Z" fill="#000112"/>
                    </svg>
                </div>
            </div>
            <div className="header__container">
                <h2 className="header__info">{boards[currentBoard].name}</h2>
                <div className="header__buttons">
                    <Button></Button>
                    <button className="header__btn-menu">
                        <div className="header__btn-menu-comp"></div>
                        <div className="header__btn-menu-comp"></div>
                        <div className="header__btn-menu-comp"></div>
                    </button>
                </div>
            </div>
        </header>
    );
}



export default AppHeader;