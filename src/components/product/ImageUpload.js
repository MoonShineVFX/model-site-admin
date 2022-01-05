import { useState } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import UploadFiles from '../UploadFiles';

const ImageUpload = ({ data }) => {

    // State
    const [imageLists, setImageLists] = useState(data?.webImages || []);

    // 上傳圖片
    const handleUploadData = ({ file }, type = 'image') => {

        const isLt10M = file.size / 1024 / 1024 < 10;
        const formData = new FormData();

        if (!isLt10M) {

            message.error('檔案不能超過 2MB，請重新上傳!!!');
            return;

        }

        formData.append('demoPlaceId', data.id);
        formData.append('file', file);

        let resData = {
            id: 84751,
            url: 'https://fakeimg.pl/321x186',
            key: 'thumb',
            name: "321x186",
            size: 20000
        };

        setImageLists([{ ...resData }, ...imageLists]);

        // Service.imageUpload(formData)
        //     .then((resData) => {

        //         if (type === 'image') setImageLists([...imageLists, { ...resData }]);
        //         else setFileLists([...fileLists, { ...resData }]);

        //     });

    };

    return (

        <div className="row">
            <h3>前台圖片顯示區塊</h3>
            <UploadFiles
                fileData={imageLists}
                handleUploadData={handleUploadData}
            />
        </div>

    );

};

ImageUpload.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ImageUpload;
