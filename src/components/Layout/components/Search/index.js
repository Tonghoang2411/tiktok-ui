import { faCircleNotch, faCircleXmark, faMagnifyingGlass,} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import 'tippy.js/dist/tippy.css'; // optional

import styles from './Search.module.scss';
import AccountItem from '../../../AccountItem';
import { Wrapper as PopperWrapper } from '../../../Poper';
import useDebounce from '../../../../hooks/useDebounce';
import * as searchService from '../../../../apiServices/searchService';



const cx = classNames.bind(styles)

function Search() {

    const inputRef = useRef()
    const [searchValue,setSearchValue] = useState('')
    const [searchResult,setSearchResult] = useState([])
    const [showResult,setShowResult] = useState(true)
    const [loading,setLoading] = useState(false)

    const debounced = useDebounce(searchValue,500)

    useEffect(() => {
        if(!debounced.trim()){
            setSearchResult([])
            return;
        }
        
        const fetchApi = async () => {
            setLoading(true)
            const result = await searchService.search(debounced)
            setSearchResult(result)
            setLoading(false)
        }

        fetchApi()

    },[debounced])
    
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
                        {searchResult.map((result) => {
                            return <AccountItem key={result.id} data = {result}/>
                        })}
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
                    onChange = {(e) => {
                        if (e.target.value.startsWith(' ')) {
                            return;
                        } else {
                            setSearchValue(e.target.value);
                        }}}
                    onFocus = {() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <FontAwesomeIcon   
                        className={cx('clear')}
                        icon={faCircleXmark}
                        onClick = {handleClear}
                    />
                )}
                
                {loading && <FontAwesomeIcon  className={cx('loading')}icon={faCircleNotch}/>}
                <button className={cx('search-btn')} onMouseDown = {e => e.preventDefault()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>
        </HeadlessTippy>
     )
}

export default Search;