import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import 'tippy.js/dist/tippy.css'; // optional
import AccountItem from '../../../AccountItem';
import { Wrapper as PopperWrapper } from '../../../Poper';
import styles from './Search.module.scss';



const cx = classNames.bind(styles)

function Search() {

    const inputRef = useRef()
    const [searchValue,setSearchValue] = useState('')
    const [searchResult,setSearchResult] = useState([])
    const [showResult,setShowResult] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1,2,3])
        },0)
    },[])
    
    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleClickOutside = () => {
        setShowResult(false)
    }
    return ( 
        <HeadlessTippy
            interactive
            visible = {showResult && searchResult.length > 0}
            //offset={[60,8]}
            render = {attrs => (
                <div className={cx('search-result')} tabIndex = "-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        <AccountItem />
                        <AccountItem />
                        <AccountItem />
                    </PopperWrapper>
                </div>
            )}
            onClickOutside = {handleClickOutside}
        >
            <div className={cx('search')}>
                <input 
                    ref={inputRef}
                    value = {searchValue}
                    placeholder="Search acounts and videos" 
                    spellCheck = {false}
                    onChange = {(e) => setSearchValue(e.target.value)}
                    onFocus = {() => setShowResult(true)}
                />
                {!!searchValue && (
                    <FontAwesomeIcon   
                        className={cx('clear')}
                        icon={faCircleXmark}
                        onClick = {handleClear}
                    />
                )}
                
                {/* <FontAwesomeIcon  className={cx('loading')}icon={faSpinner}/> */}
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>
        </HeadlessTippy>
     )
}

export default Search;