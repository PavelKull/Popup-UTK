import React, { useEffect, useReducer, useState, FC } from 'react';
import TagSelector from '../TagSelector/TagSelector';
import MainInput from '../../ui-kit/Input/MainInput';
import styles from './LoanCalculator.module.scss';
import CloseIcon from '../../assets/icons/cross.svg';
import TextButton from '../../ui-kit/TextButton/TextButton';
import MainButton from '../../ui-kit/MainButton/MainButton';
import { formatNumber } from '../../utils/formatInputValue';

const monthsOptions = [12, 24, 36, 48];
const periodOptions = ['в месяц', 'в год'];

type LoanState = {
    amount: string;
    months: number;
    period: string;
    result: number | null;
};

type Action =
    | { type: 'SET_AMOUNT'; payload: string }
    | { type: 'SET_MONTHS'; payload: number }
    | { type: 'SET_PERIOD'; payload: string }
    | { type: 'CALCULATE' };

const reducer = (state: LoanState, action: Action): LoanState => {
    switch (action.type) {
        case 'SET_AMOUNT':
            return { ...state, amount: action.payload };
        case 'SET_MONTHS':
            return { ...state, months: action.payload };
        case 'SET_PERIOD':
            return { ...state, period: action.payload };
        case 'CALCULATE': {
            const loanAmount = parseFloat(state.amount);
            if (isNaN(loanAmount) || loanAmount <= 0)
                return { ...state, result: null };
            let calculatedResult = loanAmount / state.months;
            if (state.period === 'в год') calculatedResult *= 12;
            return {
                ...state,
                result: parseFloat(calculatedResult.toFixed(1)),
            };
        }
        default:
            return state;
    }
};

type Props = {
    handleClose: () => void;
};

const LoanCalculator: FC<Props> = ({ handleClose }) => {
    const [state, dispatch] = useReducer(reducer, {
        amount: '',
        months: monthsOptions[0],
        period: periodOptions[0],
        result: null,
    });

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 767);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCalculate = () => dispatch({ type: 'CALCULATE' });

    return (
        <div className={styles.calculatorContainer}>
            <div className={styles.calculatorHeader}>
                <h1 className={styles.title}>Платежи по кредиту</h1>
                <button className={styles.close} onClick={handleClose}>
                    <CloseIcon />
                </button>
            </div>
            <p className={styles.description}>
                Введите сумму кредита и выберите срок, на который вы хотите его
                оформить.
                <br /> Мы автоматически рассчитаем для вас ежемесячный платеж,
                чтобы вы могли лучше спланировать свои финансы.
            </p>
            <MainInput
                title="Ваша сумма кредита"
                value={state.amount}
                onChange={(value) =>
                    dispatch({ type: 'SET_AMOUNT', payload: value })
                }
                errorMessage="Сумма должна быть числом"
                onKeyDown={(event) =>
                    event.key === 'Enter' && handleCalculate()
                }
            />
            <TextButton text="Рассчитать" onClick={handleCalculate} />
            <TagSelector
                title="Количество месяцев?"
                onChange={(value: number) => {
                    dispatch({ type: 'SET_MONTHS', payload: value });
                    handleCalculate();
                }}
                tags={monthsOptions}
                value={state.months}
                style={{ paddingBottom: '18px' }}
            />
            {state.result !== null && (
                <>
                    <TagSelector
                        title="Итого ваш платеж по кредиту:"
                        onChange={(value: string) => {
                            dispatch({ type: 'SET_PERIOD', payload: value });
                            handleCalculate();
                        }}
                        tags={periodOptions}
                        value={state.period}
                        style={{
                            flexDirection: 'column',
                            alignContent: 'flex-start',
                            alignItems: 'flex-start',
                            paddingBottom: '24px',
                        }}
                    />
                    <div className={styles.result}>
                        {formatNumber(state.result)} рублей
                    </div>
                </>
            )}
            <MainButton
                type="secondary"
                text="Добавить"
                disabled={state.result === null}
                onClick={() => {
                    console.log(`Add result: ${state.result}`);
                    setTimeout(handleClose, 0);
                }}
                style={{ width: '100%', marginTop: isMobile ? 'auto' : '' }}
            />
        </div>
    );
};

export default LoanCalculator;
