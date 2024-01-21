import React, { Fragment } from 'react';
import dynamic from 'next/dynamic';

const HAS_CLIENT = typeof window === 'undefined';

function NonSSR({ children }: { children: React.ReactNode }) {
    if (!HAS_CLIENT) {
        return <Fragment>{children}</Fragment>;
    }

    return null;
}

export default dynamic(() => Promise.resolve(NonSSR), { ssr: false });
