import { useState } from 'react';

const useContactForm = () => {
    const [sent, setSent] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSent(true);
        event.currentTarget.reset();
    };

    return {
        sent,
        handleSubmit
    };
};

export default useContactForm;
