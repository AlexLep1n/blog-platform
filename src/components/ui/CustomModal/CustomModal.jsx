import { Alert } from 'antd';
import classes from './CustomModal.module.css';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

export default function CustomModal({ onCancel, onYes }) {
  return (
    <div className={classes.modal}>
      <Alert
        type="warning"
        message="Are you sure to delete this article?"
        showIcon
        className={classes.modal__alert}
      />
      <div className={classes.modal__buttons}>
        <button onClick={onCancel} className={classes['modal__no-button']}>
          No
        </button>
        <button onClick={onYes} className={classes['modal__yes-button']}>
          Yes
        </button>
      </div>
    </div>
  );
}
CustomModal.propTypes = {
  onCancel: PropTypes.func,
  onYes: PropTypes.func,
};
