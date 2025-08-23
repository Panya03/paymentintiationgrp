import React, { createContext, useContext } from 'react';

const AccessCtx = createContext({ role: 'viewer', userId: '' });

export function AccessProvider({ role, userId, children }) {
    return <AccessCtx.Provider value={{ role, userId }}>{children}</AccessCtx.Provider>;
}

export function useAccess() {
    const { role } = useContext(AccessCtx);
    const can = {
        view: true,
        edit: role === 'maker' || role === 'admin',
        delete: role === 'maker' || role === 'admin',
        authorize: role === 'checker' || role === 'admin',
        reject: role === 'checker' || role === 'admin',
        create: role === 'maker' || role === 'admin',
        export: role !== 'viewer'
    };
    return { role, can };
}