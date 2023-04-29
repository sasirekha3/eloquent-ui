import React from 'react';
import Dictionary from './Dictionary';
import Word from './Word';

function Play() {
    return (
        <div className='my-play'>
            <div className="split left">
                <div className='centered'>
                    <Word />
                </div>
            </div>
            <div className="split right">
                <div className='centered'>
                    <Dictionary />
                </div>
            </div>
        </div>
    );
}

export default Play;

