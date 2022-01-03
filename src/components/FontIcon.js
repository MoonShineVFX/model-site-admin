import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FontIcon = ({ icon }) => (

    <FontAwesomeIcon
        fixedWidth
        icon={icon}
    />

);

FontIcon.propTypes = {
    icon: PropTypes.object.isRequired,
};

export default FontIcon;
