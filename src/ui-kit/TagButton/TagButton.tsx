import React, { ReactNode } from 'react';
import styles from './TagButton.module.scss';

type TagButtonProps = {
    text: string;
    selected?: boolean;
    style?: React.CSSProperties;
    onClick?: () => void;
    extra?: ReactNode | string;
};

const TagButton: React.FC<TagButtonProps> = ({
    text,
    selected = false,
    onClick,
    extra,
    style,
}) => {
    return (
        <button
            style={style}
            className={`${styles.tag} ${selected ? styles.selected : ''}`}
            onClick={onClick}
        >
            <span className={styles.text}>{text}</span>
            {extra && <span className={styles.extra}>{extra}</span>}
        </button>
    );
};

export default TagButton;
