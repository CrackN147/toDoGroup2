import {useState, useContext} from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from './';
import { TasksContext } from '../services/TasksContext';
export function Header(props) {
  const { theme, setTheme } = props;
  const { createTask } = useContext(TasksContext);
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const changeTitle = (e) => {
    setTaskTitle(e.target.value);
  }
  const handleAdd = () => {
    createTask(taskTitle);
    setOpen(false);
    setTaskTitle('');
  }
  const handleClose = () => {
    setOpen(false);
  };
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
        <Button
          onClick={
            () => setOpen(true)
          }
        >
          Create New Task
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ready to create your first Task?"}
        </DialogTitle>
        <DialogContent>
          <label htmlFor="task-title">Task Title</label>
          <input 
            type="text" 
            id="task-title" 
            name="task-title"
            value={taskTitle}
            onChange={changeTitle}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleAdd} autoFocus>
            Create Task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
} 