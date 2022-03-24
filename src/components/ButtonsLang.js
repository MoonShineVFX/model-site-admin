import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu } from 'antd';
import Buttons from './Buttons';
import { GlobalContext } from '../context/global.state';
import utilConst from '../utils/util.const';

const { langs } = utilConst;

// 語系選單
const renderMenu = ({ onClick }) => (

    <Menu>
        {
            Object.keys(langs).map((code) => (

                (code !== 'zh') &&
                    <Menu.Item
                        key={code}
                        onClick={() => onClick(code)}
                    >
                        {code} - {langs[code]}
                    </Menu.Item>

            ))
        }
    </Menu>

);

//
const ButtonsLang = ({ id }) => {

    // Context
    const { globalDispatch, deftagFormDispatch } = useContext(GlobalContext);

    // 新增語系
    const btnLang = (code) => {

        deftagFormDispatch({ type: 'SHOW', curr: 'updateLang' });
        globalDispatch({ type: 'deftag', payload: { code, id } });

    };

    return (

        <Dropdown
            overlay={renderMenu({ onClick: btnLang })}
            trigger={['click']}
            arrow={{ pointAtCenter: true }}
        >
            <Buttons
                type="default"
                text="新增語言"
                className="btn-createLang"
            />
        </Dropdown>

    );

};

Buttons.propTypes = {
    id: PropTypes.number,
};

export default ButtonsLang;
