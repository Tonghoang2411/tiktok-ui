import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss"

const cx = classNames.bind(styles)
function Button({
    to ,
    href ,
    primary = false,
    outline = false, 
    round = false,
    small = false,
    large = false,
    leftIcon,
    rightIcon,
    className,
    text,
    children ,
    onClick,
    ...passProps
}) {
    let Comp = 'button'
    const props = {
        onClick,
        ...passProps
    }
    if(to){
        props.to = to
        Comp = Link
    }else if(href){
        props.href = href
        Comp = 'a'
    }
    const classes = cx('wrapper',{
        [className]:className,
        primary,
        outline,
        small,
        large,
        round,
        text
    })
    return ( 
        <Comp className = {classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to : PropTypes.string,
    href : PropTypes.string,
    primary : PropTypes.bool,
    outline : PropTypes.bool,
    round : PropTypes.bool,
    small : PropTypes.bool,
    large : PropTypes.bool,
    leftIcon : PropTypes.node,
    rightIcon : PropTypes.node,
    className : PropTypes.string,
    text : PropTypes.string,
    children : PropTypes.node.isRequired,
    onClick : PropTypes.func,
}
export default Button;