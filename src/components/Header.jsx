import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Button } from './';
export function Header(props) {
  const { theme, setTheme } = props;
  return (
    <div className="header-top">
      <div>
        <div>
          <Button
            className="mode-select"
            onClick={() => {
              if (theme === 'light') {
                setTheme('dark');
              } else {
                setTheme('light');
              }
            }}
          >
            <DarkModeIcon />
          </Button>
        </div>
        <div>Create New Task</div>
      </div>
    </div>
  )
} 