import React from 'react';
import styles from './TextButton.module.scss';

interface ITextButton {
    text: string;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

const TextButtton: React.FC<ITextButton> = ({
    text,
    onClick,
    className,
    style,
}) => {
    return (
        <button
            style={style}
            onClick={onClick}
            className={`${styles.textButton} ${className}`}
        >
            {text}
        </button>
    );
};

export default TextButtton;
