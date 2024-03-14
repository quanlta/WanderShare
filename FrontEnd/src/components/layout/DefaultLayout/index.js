import classNames from 'classnames/bind';
import Script from 'react-load-script';
import styles from './DefaultLayout.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import images from '../../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpToLine } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const [box, setBox] = useState(false);
    let style = {};
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Sử dụng "smooth" để có hiệu ứng cuộn mượt hơn
        });
    }
    if (box) {
        style = {
            opacity: '1',
            visibility: 'visible',
        };
    }
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>{children}</div>
            <FontAwesomeIcon icon={faArrowsUpToLine} className={cx('navigate')} onClick={scrollToTop}></FontAwesomeIcon>
            <a href="https://www.facebook.com/nhonpk123/">
                <img className={cx('facebook')} src={images.facebook}></img>
            </a>
            <div className={cx('mes-logo')} onClick={() => setBox(!box)}>
                <img src={images.logo}></img>
                <iframe
                    width="350"
                    height="430"
                    allow="microphone;"
                    src="https://console.dialogflow.com/api-client/demo/embedded/76faa69f-514a-4991-a469-7c160d04a57b"
                    className={cx('box-chat')}
                    style={style}
                ></iframe>
            </div>
            <Script url="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1" />
            {/* <df-messenger
                intent="WELCOME"
                chat-title="birdcage_chat"
                agent-id="c7bef4d3-f061-42eb-9f39-c0927404f872"
                language-code="en"
                className={cx('box-chat')}
            ></df-messenger> */}

            <Footer />
        </div>
    );
}

export default DefaultLayout;
