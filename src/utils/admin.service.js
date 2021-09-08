import util from './admin';

const Service = {
    storeList: (reqData) => util.serviceProxy('/store/storeList', reqData),
    userList: (reqData) => util.serviceProxy('/user/userList', reqData),
    updateAuthority: (reqData) => util.serviceProxy('/user/updateAuthority', reqData),
};

export default Service;
