import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/formatInputValue';
import styles from './MainInput.module.scss';

type InputProps = {
    value: string;
    title: string;
    onChange: (value: string) => void;
    errorMessage?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const MainInput: React.FC<InputProps> = ({
    value,
    onChange,
    title,
    errorMessage = 'Неверное значение',
    disabled = false,
    style,
    onKeyDown,
}) => {
    const [rawValue, setRawValue] = useState(value);
    const [displayValue, setDisplayValue] = useState(formatCurrency(value));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (value) {
            setRawValue(value.replace(/\D/g, ''));
            setDisplayValue(formatCurrency(value));
        } else {
            setDisplayValue('');
        }
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = event.target.value.replace(/\D/g, '');
        setRawValue(numericValue);
        setDisplayValue(numericValue);
        setError(null);
    };

    const handleBlur = () => {
        if (!rawValue) {
            setError('Поле обязательно для ввода');
        } else if (!/^\d*$/.test(rawValue)) {
            setError(errorMessage);
        } else {
            setError(null);
            setDisplayValue(formatCurrency(rawValue));
            onChange(rawValue);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setDisplayValue(formatCurrency(rawValue));
            onChange(rawValue);
            if (onKeyDown) onKeyDown(event);
        }
    };

    return (
        <div style={style} className={styles.inputContainer}>
            <label htmlFor="main-input" className={styles.inputTitle}>
                {title}
            </label>
            <input
                id="main-input"
                className={`${styles.mainInput} ${
                    disabled ? styles.disabled : ''
                } ${error ? styles.error : ''}`}
                type="text"
                value={displayValue}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Введите данные"
                disabled={disabled}
                onKeyDown={handleKeyDown}
                aria-invalid={!!error}
                aria-describedby={error ? 'main-input-error' : undefined}
            />
            {error && (
                <p
                    id="main-input-error"
                    className={styles.errorText}
                    style={{ display: 'block' }}
                >
                    {error}
                </p>
            )}
        </div>
    );
};

export default MainInput;
