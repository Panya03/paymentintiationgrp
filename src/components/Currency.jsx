import React, { createContext, useContext, useMemo, useState } from 'react';

// Base is CNY
const CurrencyCtx = createContext(null);

export function CurrencyProvider({ children }) {
    const [displayCcy, setDisplayCcy] = useState('CNY');

    // Demo static rates: 1 CNY -> X
    const rates = {
        CNY: 1,
        USD: 0.14,
        INR: 11.5
    };

    function convertFromCny(amountCny, to) {
        const r = rates[to] ?? 1;
        const n = Number(amountCny) || 0;
        return n * r;
    }

    const value = useMemo(() => ({
        displayCcy,
        setDisplayCcy,
        convertFromCny,
        rates
    }), [displayCcy]);

    return <CurrencyCtx.Provider value={value}>{children}</CurrencyCtx.Provider>;
}

export function useCurrency() {
    const ctx = useContext(CurrencyCtx);
    if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
    return ctx;
}