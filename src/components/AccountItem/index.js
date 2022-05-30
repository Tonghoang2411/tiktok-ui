import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss"

const cx = classNames.bind(styles)
function AccountItem() {
    return <div className={cx('wrapper')}>
        <img className={cx('avatar')} src = "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/ea0854578085ab26effc2c7b8cefa270~c5_100x100.jpeg?x-expires=1653987600&x-signature=rv7aRASooVeA6UMIUmGunXAGLp0%3D" alt = "Hoa"/>
        <div className={cx('info')}>
            <h4 className={cx('name')}>
                <span>Nguyen Van A</span>
                <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
            </h4>
            <span className={cx('username')}>nguyennana</span>
        </div>
    </div>;
}

export default AccountItem;