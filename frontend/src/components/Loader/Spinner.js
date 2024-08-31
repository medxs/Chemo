import React from 'react';

export const Spinner = () => {
    return (
        <div className="d-flex text-info justify-content-center py-5">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};
