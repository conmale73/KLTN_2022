import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

const Spinner = ({ css, size, loading }) => {
    return (
        <div className="absolute transform -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4">
            <ScaleLoader css={css} size={size} color={'#36d7b7'} loading={loading} />
        </div>
    );
};

export default Spinner;
