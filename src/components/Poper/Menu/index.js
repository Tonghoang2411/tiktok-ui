import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import Tippy from '@tippyjs/react/headless';
import {Wrapper as PopperWrapper} from '../index.js'
import MenuItem from './MenuItem.js';

const cx = classNames.bind(styles)

function Menu({children,items = []}) {
    const RenderItem = () => {
        return items.map((item,index) => <MenuItem key = {index} data = {item}/>)
    }
    return ( 
        <Tippy
            interactive
            delay={[0,700]}
            placement = "bottom-end"
            render = {attrs => (
                <div className={cx('menu-list')} tabIndex = "-1" {...attrs}>
                    <PopperWrapper>
                        {RenderItem()}
                    </PopperWrapper>
                </div>
            )}
            >
                {children}
        </Tippy>
     );
}

export default Menu;