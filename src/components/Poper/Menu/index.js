import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import Tippy from '@tippyjs/react/headless';
import {Wrapper as PopperWrapper} from '../index.js'
import MenuItem from './MenuItem.js';
import Header from './Header';

const cx = classNames.bind(styles)

function Menu({children,items = [],hideOnClick = false, onChange}) {
    const [history,setHistory] = useState([{data:items}])
    const current = history[history.length - 1]

    const RenderItem = () => {
        return current.data.map((item,index) => {
            const isParent = !! item.children
            return  <MenuItem key = {index} data = {item} onClick = {() =>{
                if(isParent){
                    setHistory(prev => [...prev, item.children])
                }else{
                    onChange(item)
                }
        }}/>
    })

    }
    return ( 
        <Tippy
            interactive
            delay={[0,700]}
            offset={[12,8]}
            onHide = {() => setHistory(history.slice(0,1))}
            hideOnClick = {hideOnClick}
            placement = "bottom-end"
            render = {attrs => (
                <div className={cx('menu-list')} tabIndex = "-1" {...attrs}>
                    <PopperWrapper>
                        {history.length > 1 && <Header title={current.title} onBack={() => {
                            setHistory(history.slice(0,history.length - 1))
                        }}/>}
                        <div className = {cx('menu-body')}>{RenderItem()}</div>
                    </PopperWrapper>
                </div>
            )}
            >
                {children}
        </Tippy>
     );
}

Menu.propTypes = {
    children : PropTypes.node.isRequired,
    items : PropTypes.array,
    hideOnClick : PropTypes.func,
    onChange : PropTypes.func,
}
export default Menu;