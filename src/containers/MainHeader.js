import { useContext } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { faUserShield, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import FontIcon from '../components/FontIcon';
import { GlobalContext } from '../context/global.state';

const { Header } = Layout;

//
const HeaderLayout = styled(Header)(({ theme }) => ({
    height: 'auto',
    lineHeight: '1',
    textAlign: 'right',
    backgroundColor: theme.palette.container,
    padding: '16px 20px',
    'svg': {
        fontSize: '1.1em',
    },
    '.account': {
        fontSize: '16px',
        marginLeft: '8px',
    },
    '.logout': {
        marginLeft: '12px',
        padding: '4px',
        cursor: 'pointer',
    },
}));

//
const MainHeader = () => {

    // Context
    const { user } = useContext(GlobalContext);

    const handleLogout = () => {

        console.log('logout');

    };

    return (

        <HeaderLayout>
            <span>
                <FontIcon icon={faUserShield} />
                <span className="account">{user.userName}</span>
            </span>
            {/* <span
                className="logout"
                onClick={handleLogout}
            >
                <FontIcon icon={faSignOutAlt} />
            </span> */}
        </HeaderLayout>

    );

};

export default MainHeader;
