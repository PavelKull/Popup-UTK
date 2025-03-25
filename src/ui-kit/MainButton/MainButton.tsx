import React from 'react';
import styles from './MainButton.module.scss';

type MainButtonProps = {
    text: string;
    type?: 'primary' | 'secondary';
    size?: 'small' | 'big';
    onClick: () => void;
    disabled?: boolean;
    style?: React.CSSProperties;
};

const MainButton: React.FC<MainButtonProps> = ({
    text,
    type = 'primary',
    size = 'big',
    onClick,
    disabled = false,
    style,
}) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.mainButton} ${styles[type]} ${styles[size]}  ${
                disabled ? styles.disabled : ''
            }`}
            style={style}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default MainButton;
