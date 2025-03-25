import React from 'react';
import TagButton from '../../ui-kit/TagButton/TagButton';
import styles from './TagSelector.module.scss';

type TagSelectorProps<T> = {
    title: string;
    tags: T[];
    value: T | T[];
    onChange: (value: T | T[]) => void;
    multiple?: boolean;
    style?: React.CSSProperties;
};

const TagSelector = <T,>({
    title,
    tags,
    value,
    onChange,
    multiple = false,
    style,
}: TagSelectorProps<T>) => {
    const handleTagClick = (tag: T) => {
        if (multiple && Array.isArray(value)) {
            const newValue = value.includes(tag)
                ? value.filter((v) => v !== tag)
                : [...value, tag];

            if (newValue.length > 0) {
                onChange(newValue);
            }
        } else {
            if (tag !== value) {
                onChange(tag);
            }
        }
    };

    return (
        <div style={style} className={`${styles.tagSelector}`}>
            <label className={`${styles.tagSelectorTitle}`}>{title}</label>
            <div className={`${styles.tagContainer}`}>
                {tags.map((tag) => (
                    <TagButton
                        key={String(tag)}
                        text={String(tag)}
                        selected={
                            Array.isArray(value)
                                ? value.includes(tag)
                                : value === tag
                        }
                        onClick={() => handleTagClick(tag)}
                    />
                ))}
            </div>
        </div>
    );
};

export default TagSelector;
