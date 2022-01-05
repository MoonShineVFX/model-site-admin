import Link from 'next/link';
import PropTypes from 'prop-types';

const Links = ({ url, newPage, className, children, ...rest }) => (

    <Link href={url} as={url} passHref>
        <a
            href={url}
            className={className}
            {...newPage && { target: '_blank'}}
            {...rest}
        >
            {children}
        </a>
    </Link>

);

Links.defaultProps = {
    newPage: false,
};

Links.propTypes = {
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
    newPage: PropTypes.bool,
    children: PropTypes.any,
};

export default Links;
