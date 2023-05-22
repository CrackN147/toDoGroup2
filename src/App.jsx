import { useState } from 'react';
import { Footer, Header, Column, Title, Card, DivWrap } from './components';

export function App() {
  const [theme, setTheme] = useState('light');
  return (
    <div className={`wrapper ${theme}`}>
      <Header theme={theme} setTheme={setTheme} />
      <div className="workflow">
        <Column
          className="workflow-column"
        >
          <Title
            className="workflow-column-header"
            title="Backlog"
            type={3}
          />
          <DivWrap
            className="workflow-column-body"
          >
            <Card
              className="workflow-card"
              title="Task 1"
            />
            <Card
              className="workflow-card"
              title="Task 2"
            />
            <Card
              className="workflow-card"
              title="Task 3"
            />
          </DivWrap>
        </Column>
        <Column
          className="workflow-column"
        >
          <Title
            className="workflow-column-header"
            title="In Progress"
            type={3}
          />
        </Column>
        <Column
          className="workflow-column"
        >
          <Title
            className="workflow-column-header"
            title="Testing"
            type={3}
          />
        </Column>
        <Column
          className="workflow-column"
        >
          <Title
            className="workflow-column-header"
            title="Done"
            type={3}
          />
        </Column>
      </div>
      <div className="summary">
      </div>
      <Footer />
    </div>
  );
}