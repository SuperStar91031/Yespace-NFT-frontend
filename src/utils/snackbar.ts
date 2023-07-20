import { store } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

const snackbar = ({
  message,
  content = "",
  color = 'success',
  variant = 'default',
  vertical = 'bottom',
  horizontal = 'left',
  transition = 'SlideRight'
}: {
  message: string;
  content?: string;
  color?: string;
  variant?: string;
  vertical?: string;
  horizontal?: string;
  transition?:string;
}) => {
  store.dispatch(
    openSnackbar({
      open: true,
      message,
      variant,
      transition ,
      content,
      alert: { color },
      anchorOrigin: { vertical, horizontal }
    })
  );
};

export default snackbar;
