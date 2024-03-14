import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { faCircleXmark, faMagnifyingGlass, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css'; // optional
import TippyHeadLess from '@tippyjs/react/headless'; // different import path!
import { useEffect, useState, useRef } from 'react';
import styles from './Search.module.scss';
import { Link, Route } from 'react-router-dom';

const cx = classNames.bind(styles);
function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [show, setShow] = useState(true);
    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }
        fetch(`http://localhost:8080/api/v1/timeshare/seacrhByName?q=${encodeURIComponent(searchValue)}`)
            .then((res) => res.json())
            .then((timeshare) => {
                setSearchResult(timeshare);
            });
        console.log(searchResult);
    }, [searchValue]);
    const inputRef = useRef();
    function handleShowResult() {
        setShow(false);
    }
    function handleClear() {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    }
    console.log(show);
    return (
        <TippyHeadLess
            interactive
            visible={show && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search_result')} tabIndex="-1" {...attrs}>
                    <h4 className={cx('search_title')}>Timeshares</h4>
                    <div className={cx('search_list_accounts')}>
                        {/* map ra */}
                        {searchResult.map((acc) => {
                            return (
                                <Link
                                    to={`/timeshare/${acc.id}`}
                                    className={cx('search_account')}
                                    key={acc.id}
                                    onClick={handleShowResult}
                                >
                                    <div className={cx('image')}>
                                        <img src={acc.timeshare_image}></img>
                                    </div>
                                    <div className={cx('info')}>
                                        <p className={cx('name')}>
                                            <span>{acc.name}</span>
                                        </p>
                                        <span className={cx('price')}>{acc.price}$</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
            onClickOutside={handleShowResult}
        >
            <div className={cx('search')}>
                <input
                    className={cx('subsearch')}
                    ref={inputRef}
                    value={searchValue}
                    placeholder="search accounts and videos"
                    spellCheck={false}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    onFocus={() => setShow(true)}
                />
                {searchValue && <FontAwesomeIcon icon={faCircleXmark} onClick={handleClear} className={cx('clear')} />}

                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-logo')} />
            </div>
        </TippyHeadLess>
    );
}

export default Search;
