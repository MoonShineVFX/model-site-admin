import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

 const HeadTag = ({ title, children }) => (

    <Head>
        <title>後台{title && `-${title}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {children}
    </Head>

);

HeadTag.propTypes = {
    title: PropTypes.string,
};

export default HeadTag;
