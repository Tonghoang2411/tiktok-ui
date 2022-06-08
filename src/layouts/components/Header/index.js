import { faCircleQuestion, faCoins, faEarthAsia, faEllipsisVertical, faGear, faKeyboard, faPlus, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css'; // optional
import { Link } from 'react-router-dom';


import Search from '../Search';
import styles from './Header.module.scss';
import images from '../../../assets/images';
import Button from '../../../components/Button/Button';
import { Inbox, Message } from '../../../components/Icons';
import Image from '../../../components/Image';
import Menu from '../../../components/Poper/Menu/index.js';
import RoutesConfig from '../../../config/routes.js'



const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon = {faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt'
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'Tiếng Anh'
                },
                {
                    type: 'language',
                    code: 'tr',
                    title: 'Tiếng Trung'
                }
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon = {faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon = {faKeyboard} />,
        title: 'Keyboard Shortcuts',
    }
]


const userMenu = [
    {
        icon: <FontAwesomeIcon icon = {faUser} />,
        title: 'View profile',
        to: '/@hoang'
    },
    {
        icon: <FontAwesomeIcon icon = {faCoins} />,
        title: 'Get coins',
        to: '/coin'
    },
    {
        icon: <FontAwesomeIcon icon = {faGear} />,
        title: 'Settings',
        to: '/setting'
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon = {faSignOut} />,
        title: 'Log out',
        to: '/logout',
        separate: true
    },

]
function Header() {
    
    //Handle logic
    const handleMenuChange = (menuItem) => {
        console.log(menuItem)
    }
    const currentUser = true

    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>
            <Link to={RoutesConfig.home} className={cx('logo-link')}>
                <img src={images.logo} alt = "TikTok"></img>
            </Link>
            <Search />
            <div className={cx('actions')}>
                {
                    currentUser ? (
                        <>
                            <Button className = {cx('button-style')} leftIcon = {<FontAwesomeIcon icon={faPlus}/>}>Upload</Button>
                            <Tippy content = 'Message' placement='bottom' delay={[0, 200]}>
                                <button className={cx('action-btn','action-btn-space')}>
                                    <Message className={cx('icon-message')}/>
                                </button>
                            </Tippy>
                            <Tippy content = 'Inbox' placement='bottom' delay={[0, 200]}>
                                <button className={cx('action-btn')}>
                                    <Inbox />
                                </button>
                            </Tippy>
                        </>
                    ) : (

                        <>
                            <Button className = {cx('button-style')} leftIcon = {<FontAwesomeIcon icon={faPlus}/>}>Upload</Button>
                            <Button primary>Login</Button>
                        </>
                    )
                }
                <Menu  items = {currentUser ? userMenu : MENU_ITEMS} onChange = {handleMenuChange}>
                    {
                        currentUser ? (
                            <Image    
                                    className={cx('user-avatar')} 
                                    src = 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/240452070_1025396538195938_4596701653283501203_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6qMWWziMdikAX92INGD&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT_Zf6WdZZdLBI6YIbEx48pcEUfJW_ujpV6TeYFL9XS-bg&oe=6298A9A2' 
                                    alt='Tống Đức Hoàng'
                            />
                        ) : (
                            <button className={cx('menu-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )
                    }
                </Menu>
            </div>
        </div>
    </header>
}

export default Header;