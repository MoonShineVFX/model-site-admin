import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FontIcon = ({ icon, ...rest }) => (

    <FontAwesomeIcon
        fixedWidth
        icon={icon}
        {...rest}
    />

);

FontIcon.propTypes = {
    icon: PropTypes.object.isRequired,
};

export default FontIcon;
