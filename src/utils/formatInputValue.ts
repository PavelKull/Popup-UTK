export const formatCurrency = (value: string): string => {
    const cleanedValue = value.replace(/\D/g, '');
    return cleanedValue.replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + ' ₽';
};

export const formatNumber = (number: number): string => {
    return number.toLocaleString('ru-RU');
};
